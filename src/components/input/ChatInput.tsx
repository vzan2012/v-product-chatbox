import React, { useRef, useState } from "react";
import type { ImageFileState } from "../../types/app";
import { useImageUpload } from "../../hooks/useImageUpload";
import { Button } from "../ui/Button";
import { ImageUploadButton } from "./ImageUploadButton";
import { MessageTextarea } from "./MessageTextarea";

interface ChatInputProps {
  onSendMessage: (text: string, images?: ImageFileState[]) => void;
  isProcessing?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isProcessing = false,
}) => {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    images,
    addImages,
    removeImageById,
    clearAllImages,
    canAddMoreImages,
  } = useImageUpload();

  const handleSend = () => {
    if (!text.trim() && images.length === 0) return;

    onSendMessage(text, images);
    setText("");
    clearAllImages();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFilesSelected = (files: FileList) => addImages(files);

  const canSend = text.trim().length > 0 || images?.length > 0;

  return (
    <div className="chat-input-container border-t border-gray-200 p-4 bg-white">
      {images.length > 0 && (
        <div className="image-preview-container flex gap-2 mb-3 overflow-x-auto">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.previewUrl}
                alt={image.file.name}
                className="w-16 h-16 object-cover rounded"
              />
              <button
                onClick={() => removeImageById(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-2">
        <ImageUploadButton
          onFilesSelected={handleFilesSelected}
          disabled={!canAddMoreImages || isProcessing}
          fileInputRef={fileInputRef}
        />
        <div className="flex-1">
          <MessageTextarea
            value={text}
            onChange={setText}
            onKeyPress={handleKeyPress}
            placeholder="Type your message and upload images..."
            disabled={isProcessing}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!canSend || isProcessing}
          loading={isProcessing}
        >
          {isProcessing ? "Processing..." : "Send"}
        </Button>
      </div>

      <div className="helper-text text-xs text-gray-500 mt-2">
        {images?.length > 0 && (
          <span>
            {images.length} image{images.length > 1 ? "s" : ""} ready for
            analysis
          </span>
        )}
        {!canAddMoreImages && (
          <span>Maximum {images.length} images reached</span>
        )}
      </div>
    </div>
  );
};
