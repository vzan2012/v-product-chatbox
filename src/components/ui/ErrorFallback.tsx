interface ErrorFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">
          The application encountered an unexpected error.
        </p>
        <details className="text-left mb-4">
          <summary className="cursor-pointer text-sm text-gray-500">
            Error details
          </summary>
          <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
            {message}
          </pre>
        </details>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
