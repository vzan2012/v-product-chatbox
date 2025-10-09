interface MessageTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MessageTextarea: React.FC<MessageTextareaProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder = "Type your message...",
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(e.target.value);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height =
      Math.min(e.currentTarget.scrollHeight, 120) + "px";
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      rows={1}
      onInput={onInput}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
        disabled
          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
          : "bg-white text-gray-900"
      }`}
    ></textarea>
  );
};
