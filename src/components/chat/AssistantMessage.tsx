import React from "react";
import type { Message } from "../../types/app";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { BatchResults } from "./BatchResults";

interface AssistantMessageProps {
  message: Message;
}

export const AssistantMessage: React.FC<AssistantMessageProps> = ({
  message,
}) => {
  // Loading state
  if (message.content.isProcessing) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            <span className="text-gray-600">Analyzing text / images...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (message.content.text && message.content.text.includes("error")) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 py-3">
          <div className="text-red-800">{message.content.text}</div>
        </div>
      </div>
    );
  }

  // Batch analysis results
  if (message.content.analysisResult) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%]">
          <BatchResults analysisResult={message.content.analysisResult} />

          {/* Timestamp */}
          <div className="text-xs text-gray-500 text-left mt-2">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    );
  }

  // Simple text response
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
        {/* Message text */}
        {message.content.text && (
          <div className="text-gray-800">{message.content.text}</div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-left mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
