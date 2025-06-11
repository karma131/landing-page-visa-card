// src/components/SanPhamItemCard.jsx
import React from "react";

export default function SanPhamItemCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >
      {/* Image block */}
      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-br-xl">
            {product.discount}
          </div>
        )}
      </div>

      {/* Content block */}
      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-2">
          {product.logo && (
            <img src={product.logo} alt="logo" className="h-6 w-auto" />
          )}
          <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        </div>
        <ul className="text-gray-600 text-sm list-disc list-inside leading-relaxed mb-4">
          {product.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <p className="text-sm">
            <span className="text-gray-500">Chỉ từ </span>
            <span className="text-blue-700 font-bold">{product.price}</span>
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded-full transition">
            {product.ctaText || "Đăng ký ngay"}
          </button>
        </div>
      </div>
    </div>
  );
}
