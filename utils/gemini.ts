import { GoogleGenerativeAI } from "@google/generative-ai";

export const createGeminiLlm = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

export const streamGeminiChat = async (
  llm: GoogleGenerativeAI,
  messages: Array<{ role: string; content: string }>,
  model = "gemini-1.5-pro"
) => {
  const geminiMessages = messages.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }));

  const chat = llm.getGenerativeModel({ model }).startChat({
    generationConfig: {
      maxOutputTokens: 2048,
    },
    history: geminiMessages.slice(0, -1)
  });

  const result = await chat.sendMessageStream(geminiMessages[geminiMessages.length - 1].parts[0].text);
  return result;
};
