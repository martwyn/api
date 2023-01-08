import express from "express";
import cors from "cors";
import { createServer } from "http";
import { createConnectionSocket } from "./socket";

const port = process.env["PORT"] || 3001;
const app = express();
app.use(cors());
const httpServer = createServer(app);
createConnectionSocket(httpServer);

app.get("/", (req, res) => {
  return res.send("OK");
});

httpServer.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
