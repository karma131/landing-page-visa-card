import { useParams, useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from './Navbar';
import React, { useState } from "react";

// const [selectedProduct, setSelectedProduct] = useState(null);
import { CARD_MAP } from "./visaCardData"; // đường dẫn phù hợp với project của bạn

export default function ChiTietSanPham() {
  const { cardId } = useParams();
  const card = CARD_MAP[parseInt(cardId)];
  const navigate = useNavigate();
  if (!card) return <p>Không tìm thấy loại thẻ.</p>;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
        <Navbar />
      <div className="max-w-7xl mt-12 mx-auto px-6 pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-lg text-black space-x-2 mb-2">
          <Home size={24} />
          <span>&gt;</span>
          <Link to="/san-pham" className="text-black hover:underline">Sản phẩm</Link>
          <span>&gt;</span>
          <span className="font-semibold">{card.title}</span>
        </nav>

        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{card.title}</h1>
        <p className="text-gray-600 mb-6">{card.description}</p>

        {/* Danh sách sản phẩm */}
        <div className="space-y-8">
          {card.products.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/product/${item.slug}`)}
              className="flex flex-col md:flex-row items-stretch bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Hình ảnh bên trái */}
              <div className="relative w-full md:w-2/5 h-56 md:h-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="text-2xl object-cover w-full h-full"
                />
                {item.discount && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-br-xl">
                    {item.discount}
                  </div>
                )}
              </div>

              {/* Nội dung bên phải */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <ul className="text-base text-gray-600 mb-4 list-disc list-inside leading-relaxed">
                    {item.benefits.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <p className="text-sm">
                    <span className="text-xl text-gray-500">Giá chỉ từ: </span>
                    <span className="text-xl text-red-600 font-bold">{item.gia}</span>
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded-full transition">
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* {selectedProduct && (
            <SanPhamMoTaChiTiet product={selectedProduct} />
          )} */}
        </div>
      </div>
    </div>
  );
}
