import { Server as HTTPServer } from "http";
import { personalityPrompt, messagePrompt } from "./prompt";
import { Server } from "socket.io";
import { sendMessage } from "./gpt";

export const createConnectionSocket = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("connection");
    socket.on("authenticate", ({ userId }: SocketAuthenticate) => {
      socket.join(userId);
      console.log(`Authenticated user with Id ${userId}`);
    });

    socket.on("ping", ({ userId }: SocketPing) => {
      socket.send("pong", { to: userId });
    });

    socket.on(
      "chat",
      async ({
        id,
        userId,
        personality,
        openAiApiKey,
        messages,
      }: SocketChat) => {
        const promptStart = personalityPrompt(personality);
        const promptEnd = messagePrompt(messages);
        try {
          const response = await sendMessage(
            `${promptStart}\n${promptEnd}`,
            openAiApiKey
          );

          console.log(`Chat received for user with id: ${userId}`);
          io.to(userId).emit("response", {
            id,
            response: response.data.choices[0].text,
          });
        } catch (e) {
          console.error("Error communicating with OpenAI");
          io.to(userId).emit("error", {
            id,
            error: "Could not communicate with OpenAI",
          });
        }
      }
    );
  });

  return io;
};
