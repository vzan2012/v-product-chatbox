import { useCallback, useState } from "react";
import type { ImageFileState } from "../types/app";

export const useImageUpload = () => {
  const MAX_IMAGES = 4;
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const SUPPORTED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const [images, setImages] = useState<ImageFileState[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateFile = (file: File): string | null => {
    if (!SUPPORTED_FILE_TYPES.includes(file.type))
      return `File type ${file.type} is not supported. Please use JPG, PNG, WEBP or GIF`;

    if (file.size > MAX_FILE_SIZE)
      return `File size ${(file.size / 1024 / 1024).toFixed(
        2
      )}MB exceeds maximum ${MAX_FILE_SIZE / 1024 / 1024}MB.`;

    return null;
  };

  const addImages = useCallback(
    async (files: FileList | File[]) => {
      const newImages: ImageFileState[] = [];
      const fileArray = Array.from(files);
      setError(null);

      if (images.length + fileArray.length > MAX_IMAGES) {
        setError(`You can only upload to ${MAX_IMAGES} images.`);
        return;
      }

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        try {
          const previewUrl = URL.createObjectURL(file);
          const base64Data = await fileToBase64(file);

          const imageState: ImageFileState = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            previewUrl,
            base64Data,
          };

          newImages.push(imageState);
        } catch (error) {
          console.error("Error processing file:", error);
          setError(`Failed to process ${file.name}. Please try another image.`);
        }
      }

      if (newImages.length > 0) setImages((prev) => [...prev, ...newImages]);
    },
    [images.length]
  );

  const removeImageById = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((image) => image.id === id);

      if (imageToRemove) URL.revokeObjectURL(imageToRemove.previewUrl);

      return prev.filter((image) => image.id !== id);
    });
  }, []);

  const clearAllImages = useCallback(() => {
    for (const img of images) URL.revokeObjectURL(img.previewUrl);

    setImages([]);
    setError(null);
  }, [images]);

  const canAddMoreImages = images.length < MAX_IMAGES;

  return {
    images,
    error,
    addImages,
    removeImageById,
    clearAllImages,
    canAddMoreImages,
    maxImages: MAX_IMAGES,
    supportedFileTypes: SUPPORTED_FILE_TYPES,
    maxFileSize: MAX_FILE_SIZE,
  };
};
