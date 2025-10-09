import type {
  BatchAnalysisResult,
  ImageFileState,
  Message,
} from "../../types/app";

export const updateMessageById = (
  messages: Message[],
  messageId: string,
  updates: Partial<Message>
): Message[] => {
  return messages.map((msg) =>
    msg.id === messageId ? { ...msg, ...updates } : msg
  );
};

export const createUserMessage = (
  text: string,
  images: ImageFileState[] = []
): Omit<Message, "id" | "timestamp"> => {
  return {
    type: "USER_QUERY",
    content: {
      text: text.trim(),
      images: images.length > 0 ? images : undefined,
    },
  };
};

export const createLoadingMessage = (): Omit<Message, "id" | "timestamp"> => {
  return {
    type: "AI_RESPONSE",
    content: {
      isProcessing: true,
    },
  };
};

export const createAIResponseMessage = (
  analysisResult: BatchAnalysisResult
): Omit<Message, "id" | "timestamp"> => {
  return {
    type: "AI_RESPONSE",
    content: {
      analysisResult,
    },
  };
};

export const createErrorMessage = (
  errorText: string = "Sorry, there was an error processing your request."
): Omit<Message, "id" | "timestamp"> => {
  return {
    type: "AI_RESPONSE",
    content: {
      text: errorText,
    },
  };
};

export const filterMessagesByType = (
  messages: Message[],
  type: Message["type"]
): Message[] => messages.filter((msg) => msg.type === type);

export const findMessageById = (
  messages: Message[],
  messageId: string
): Message | undefined => messages.find((msg) => msg.id === messageId);
