interface ImageUploadButtonProps {
  disabled?: boolean;
  onFilesSelected: (files: FileList) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  disabled = false,
  onFilesSelected,
  fileInputRef,
}) => {
  const handleClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
      e.target.value = "";
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`
          flex items-center justify-center 
          w-10 h-10 rounded-lg border-2 border-dashed 
          transition-all duration-200
          ${
            disabled
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-gray-400 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 cursor-pointer"
          }
        `}
        title={disabled ? "Maximum images reached" : "Upload images"}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={disabled}
      />
    </>
  );
};
