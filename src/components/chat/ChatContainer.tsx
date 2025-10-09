import React from "react";
import { useChat } from "../../hooks/useChat";
import { MessageList } from "./MessageList";
import { ChatInput } from "../input/ChatInput";

export const ChatContainer: React.FC = () => {
  const { messages, isProcessing, sendMessage, clearChat } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              BatchQuery Chatbot
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              AI-powered image analysis • Upload up to 4 images
            </p>
          </div>

          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0">
        <ChatInput onSendMessage={sendMessage} isProcessing={isProcessing} />
      </div>
    </div>
  );
};
