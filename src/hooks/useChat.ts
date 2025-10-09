import { useCallback, useState } from "react";
import type {
  BatchAnalysisResult,
  ImageFileState,
  Message,
} from "../types/app";
import { analyzeBatchImages } from "../lib/api/gemini";
import {
  createAIResponseMessage,
  createLoadingMessage,
  createUserMessage,
  updateMessageById,
} from "../lib/utils/messageUtils";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const addMessage = useCallback(
    (message: Omit<Message, "id" | "timestamp">) => {
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    []
  );

  const sendMessage = useCallback(
    async (text: string, images: ImageFileState[] = []) => {
      try {
        let analysisResult: BatchAnalysisResult;

        if (!text.trim() && images.length === 0) return;

        addMessage(createUserMessage(text, images));

        const loadingMessage = addMessage(createLoadingMessage());

        setIsProcessing(true);

        if (images.length > 0) {
          analysisResult = await analyzeBatchImages(images, text.trim());
        } else {
          analysisResult = {
            query: text.trim(),
            results: [
              {
                imageId: "text-only",
                imageName: "Text Query",
                status: "DONE",
                responseText: `This is a mock response for: "${text.trim()}". Enable LangChain for real AI responses.`,
                isSuccessful: true,
              },
            ],
          };
        }

        setMessages((prev) =>
          updateMessageById(
            prev,
            loadingMessage.id,
            createAIResponseMessage(analysisResult)
          )
        );
      } catch (error) {
        console.error("Error in chat processing: ", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [addMessage]
  );

  const clearChat = useCallback(() => setMessages([]), [messages]);

  const getUserMessages = useCallback(
    () => messages.filter((msg) => msg.type === "USER_QUERY"),
    [messages]
  );

  const getAIMessages = useCallback(
    () => messages.filter((msg) => msg.type === "AI_RESPONSE"),
    [messages]
  );

  return {
    messages,
    isProcessing,

    sendMessage,
    addMessage,
    clearChat,

    getUserMessages,
    getAIMessages,
  };
};
