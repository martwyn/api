import { Configuration, OpenAIApi } from "openai";

export const sendMessage = (prompt: string, openAiApiKey: string) => {
  const configuration = new Configuration({
    apiKey: openAiApiKey,
  });
  const openai = new OpenAIApi(configuration);
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.8,
    max_tokens: 712,
    top_p: 1,
    frequency_penalty: 0.7,
    presence_penalty: 0.7,
  });
};
