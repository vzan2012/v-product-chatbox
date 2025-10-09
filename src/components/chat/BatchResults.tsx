import React from "react";
import { type BatchAnalysisResult } from "../../types/app";

interface BatchResultsProps {
  analysisResult: BatchAnalysisResult;
}

export const BatchResults: React.FC<BatchResultsProps> = ({
  analysisResult,
}) => {
  const { query, results } = analysisResult;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Batch Analysis Results</h3>
        <p className="text-sm text-gray-600 mt-1">Query: "{query}"</p>
      </div>

      {/* Results */}
      <div className="divide-y divide-gray-100">
        {results.map((result) => (
          <div
            key={result.imageId}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-3">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {result.status === "DONE" && result.isSuccessful && (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                )}
                {result.status === "ERROR" && (
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm">✗</span>
                  </div>
                )}
                {result.status === "ANALYZING" && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">⟳</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm">
                    {result.imageName}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      result.status === "DONE" && result.isSuccessful
                        ? "bg-green-100 text-green-800"
                        : result.status === "ERROR"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>

                <div className="text-gray-700 text-sm leading-relaxed">
                  {result.responseText}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Analyzed {results.length} image{results.length > 1 ? "s" : ""} •
          {results.filter((r) => r.isSuccessful).length} successful •
          {results.filter((r) => !r.isSuccessful).length} failed
        </div>
      </div>
    </div>
  );
};
