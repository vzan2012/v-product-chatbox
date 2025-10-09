export interface ImageFileState {
  id: string;
  file: File;
  previewUrl: string;
  base64Data: string;
}

export type ImageAnalysisStatus = "IDLE" | "ANALYZING" | "DONE" | "ERROR";

export interface ImageAnalysisResult {
  imageId: string;
  imageName: string;
  status: ImageAnalysisStatus;
  responseText: string;
  isSuccessful: boolean;
}

export interface BatchAnalysisResult {
  query: string;
  results: ImageAnalysisResult[];
}

export type MessageType = "USER_QUERY" | "AI_RESPONSE";

export interface Message {
  id: string;
  type: MessageType;
  timestamp: number;
  content: {
    text?: string;
    images?: ImageFileState[];
    analysisResult?: BatchAnalysisResult;
    isProcessing?: boolean;
  };
}

export type ChatHistory = Message[];
