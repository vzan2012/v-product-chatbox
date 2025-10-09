import React from "react";
import { type Message } from "../../types/app";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          {message.type === "USER_QUERY" ? (
            <UserMessage message={message} />
          ) : (
            <AssistantMessage message={message} />
          )}
        </div>
      ))}

      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">👋</div>
            <p className="text-lg font-medium">
              Welcome to BatchQuery Chatbot!
            </p>
            <p className="text-sm">
              Upload images and ask questions to get started.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
