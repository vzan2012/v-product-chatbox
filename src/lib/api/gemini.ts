import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { ImageAnalysisResult, ImageFileState } from "../../types/app";
import { HumanMessage } from "@langchain/core/messages";

const parseGeminiResponse = (geminiText: string, images: ImageFileState[]) => {
  return images.map((image): ImageAnalysisResult => {
    return {
      imageId: image.id,
      imageName: image.file.name,
      status: "DONE",
      responseText: `**${image.file.name}**: ${geminiText}`,
      isSuccessful: true,
    };
  });
};

export const analyzeBatchImages = async (
  images: ImageFileState[],
  query: string
) => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const chatModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      maxOutputTokens: 2048,
      apiKey,
    });

    const inputMessages = [
      new HumanMessage({
        content: [
          {
            type: "text",
            text: query,
          },
          ...images.map((image) => ({
            type: "image_url" as const,
            image_url: image.base64Data,
          })),
        ],
      }),
    ];

    const response = await chatModel.invoke(inputMessages);
    const responseText = response.content.toString();

    const results = parseGeminiResponse(responseText, images);

    return { query, results };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze images with Gemini. Please try again.");
  }
};
