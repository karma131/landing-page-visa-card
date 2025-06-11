// src/components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ message = "Đang xử lý..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-700">
      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
