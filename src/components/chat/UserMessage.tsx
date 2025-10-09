import React from "react";
import type { Message } from "../../types/app";
import { ImageAttachments } from "./ImageAttachments";

interface UserMessageProps {
  message: Message;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3">
        {message.content.text && (
          <div className="mb-2">{message.content.text}</div>
        )}

        {message.content.images && message.content.images.length > 0 && (
          <ImageAttachments images={message.content.images} />
        )}

        <div className="text-xs text-blue-200 text-right mt-1">
          {new Date(message.timestamp).toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
