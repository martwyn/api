interface SocketPing {
  userId: string;
}

interface SocketAuthenticate {
  userId: string;
}

interface SocketChat {
  id: string;
  userId: string;
  personality: string;
  openAiApiKey: string;
  messages: Message[];
}
