import React from "react";
import type { ImageFileState } from "../../types/app";

interface ImageAttachmentsProps {
  images: ImageFileState[];
}

export const ImageAttachments: React.FC<ImageAttachmentsProps> = ({
  images,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.previewUrl}
            alt={image.file.name}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity truncate">
            {image.file.name}
          </div>
        </div>
      ))}
    </div>
  );
};
