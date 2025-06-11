import React from 'react';
import { useState, useEffect, useRef } from "react";

import Navbar from "./Navbar";
import { Home } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';

const cardTypes = [
  {
    id: 1,
    label: "Visa Hoàn Tiền",
    icon: "/img/visa-hoantien.svg",
    iconBg: "/img/visa-hoantien.svg",
    activeColor: "border-red-500",
  },
  {
    id: 2,
    label: "Visa Du Lịch",
    icon: "/img/visa-dulich.svg",
    iconBg: "/img/visa-dulich.svg",
    activeColor: "border-blue-500",
  },
  {
    id: 3,
    label: "Visa Doanh Nghiệp",
    icon: "/img/visa-biz.svg",
    iconBg: "/img/visa-biz.svg",
    activeColor: "border-green-500",
  },
  {
    id: 4,
    label: "Visa Sinh Viên",
    icon: "/img/visa-student.svg",
    iconBg: "/img/visa-student.svg",
    activeColor: "border-yellow-500",
  },
  {
    id: 5,
    label: "Visa Premium",
    icon: "/img/visa-premium.svg",
    iconBg: "/img/visa-premium.svg",
    activeColor: "border-purple-500",
  },
];

// const cardList = [
//   {
//     name: "Visa Hoàn Tiền",
//     target: "Người tiêu dùng cá nhân",
//     benefit: "Hoàn tiền cho chi tiêu hàng ngày (ăn uống, mua sắm)",
//     color: "from-green-400 to-green-600",
//   },
//   {
//     name: "Visa Doanh Nghiệp",
//     target: "Chủ doanh nghiệp nhỏ",
//     benefit: "Quản lý chi tiêu công ty, cấp thẻ phụ",
//     color: "from-blue-500 to-blue-700",
//   },
//   {
//     name: "Visa Du Lịch",
//     target: "Người đi du lịch / công tác",
//     benefit: "Không phí chuyển đổi ngoại tệ, ưu đãi phòng chờ sân bay",
//     color: "from-purple-500 to-purple-700",
//   },
//   {
//     name: "Visa Sinh Viên",
//     target: "Sinh viên đại học",
//     benefit: "Hạn mức thấp, dễ duyệt, ưu đãi học tập",
//     color: "from-yellow-400 to-yellow-600",
//   },
//   {
//     name: "Visa Premium",
//     target: "Khách hàng thu nhập cao",
//     benefit: "Ưu đãi đặc biệt, tích điểm, concierge",
//     color: "from-red-500 to-red-700",
//   },
// ];

export default function SanPham() {
  const navigate = useNavigate();
  // const [selected, setSelected] = useState(0);
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      {/* Breadcrumb + tiêu đề */}
      <section className="px-6 pt-8 mt-12 max-w-7xl mx-auto">
        <nav className="flex items-center text-lg text-black space-x-2 mb-2">
          <Home size={24} className="text-black" /> <span>&gt;</span> <Link to="/san-pham" className="text-black hover:underline">Sản phẩm</Link>
          <span>&gt;</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách thẻ Visa</h1>
        <p className="text-gray-600">Chọn loại thẻ phù hợp với nhu cầu và phong cách của bạn</p>
      </section>
        <Navbar />
      <h1 className="text-3xl font-bold mb-8 text-center text-black"></h1>
     <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-10 px-6 max-w-7xl mx-auto ">
        {cardTypes.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(`/san-pham/${card.id}`)}
            className="relative bg-white shadow-md rounded-xl p-4 cursor-pointer transition border-2 hover:shadow-md border-transparent"
            
          >
            {/* Icon đậm */}
            <img src={card.icon} alt={card.label} className="w-12 h-12 z-10 relative" />

            {/* Icon mờ nền */}
            <img
              src={card.iconBg}
              alt="bg"
              className="absolute right-3 bottom-2 w-20 h-20 opacity-10"
            />

            {/* Text */}
            <div className="mt-4 font-medium text-sm">
              <span className="text-gray-500 block">Thẻ Visa</span>
              <span className="text-gray-800 text-lg font-bold">{card.label.replace("Visa ", "")}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Danh sách thẻ Visa */}
      {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-4 px-6 pb-16">
        {cardList.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition bg-gradient-to-br ${card.color}`}
          >
            <h2 className="text-xl font-bold mb-2">{card.name}</h2>
            <p className="text-sm mb-1">
              <span className="font-semibold">Đối tượng:</span> {card.target}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Lợi ích:</span> {card.benefit}
            </p>
            <button className="mt-4 bg-white text-red-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
              Đăng ký ngay
            </button>
          </div>
        ))}
      </section> */}
    </div>
 );
}