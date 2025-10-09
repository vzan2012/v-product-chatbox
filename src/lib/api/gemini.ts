import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { ImageAnalysisResult, ImageFileState } from "../../types/app";
import { HumanMessage } from "@langchain/core/messages";

const callGeminiModel = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    maxOutputTokens: 2048,
    apiKey,
  });
};

const createImageAnalysisPrompt = (
  query: string,
  imageCount: number
): string => {
  return `
You are a AI, a specialized assistant for analyzing product images.

USER QUESTION: "${query}"

IMPORTANT INSTRUCTIONS:
- Analyze each of the ${imageCount} images INDIVIDUALLY
- Provide SPECIFIC insights for each image related to the user's question
- Be concise but thorough in your analysis
- Focus on product quality, defects, consistency, and visual presentation
- If you cannot analyze an image, explain why

FORMAT YOUR RESPONSE AS:
• For each image, provide a clear analysis addressing the user's question
• Use bullet points or numbered lists for clarity
• Keep each image analysis separate and distinct

Now analyze the ${imageCount} images below:

NOTE:
Generate the responses in markdown format
  `.trim();
};

const createTextChatPrompt = (query: string): string => {
  return `
You are BatchQuery AI, a helpful assistant for e-commerce and product analysis.

USER QUESTION: "${query}"

IMPORTANT INSTRUCTIONS:
- Provide helpful, accurate information about products, e-commerce, and image analysis
- If the user asks about image analysis capabilities, explain you can analyze up to 4 images simultaneously
- Be friendly, professional, and concise
- Focus on practical advice for online retailers

Please respond to the user's question:

NOTE:
Generate the responses in markdown format
  `.trim();
};

const parseGeminiResponse = (geminiText: string, images: ImageFileState[]) => {
  return images.map((image): ImageAnalysisResult => {
    return {
      imageId: image.id,
      imageName: image.file.name,
      status: "DONE",
      responseText: geminiText,
      isSuccessful: true,
    };
  });
};

export const analyzeBatchImages = async (
  images: ImageFileState[],
  query: string
) => {
  try {
    const chatModel = callGeminiModel();

    const prompt = createImageAnalysisPrompt(query, images.length);

    const inputMessages = [
      new HumanMessage({
        content: [
          {
            type: "text",
            text: prompt,
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

export const chatWithGemini = async (query: string): Promise<string> => {
  try {
    const chatModel = callGeminiModel();

    const prompt = createTextChatPrompt(query);

    const response = await chatModel.invoke([
      new HumanMessage({
        content: [{ type: "text", text: prompt }],
      }),
    ]);

    return response.content.toString();
  } catch (error) {
    console.error("Gemini text chat error:", error);
    throw new Error("Failed to get response from Gemini");
  }
};
