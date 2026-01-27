import React from "react";

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
}

export function LoadingOverlay({
  message = "Gerando PDF...",
  isVisible,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
