import { useParams, Link } from "react-router-dom";
import { CARD_MAP } from "./visaCardData";
import SanPhamMoTaChiTiet from "./SanPhamMoTaChiTiet";
import Navbar from './Navbar';
import { Home } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SanPhamChiTiet() {
  const { slug } = useParams();

  let product = null;
  let cardTitle = "";
  for (const key in CARD_MAP) {
    const found = CARD_MAP[key].products.find(p => p.slug === slug);
    if (found) {
      cardTitle = CARD_MAP[key].title;
      product = found;
      break;
    }
  }

  if (!product) return <p className="text-center mt-10">Không tìm thấy sản phẩm.</p>;


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
          <span className="font-semibold">{cardTitle}</span>
          <span>&gt;</span>
          <span className="font-semibold text-gray-800">{product.name}</span>
        </nav>
        {/* Slideshow sản phẩm */}
        {product.slides && (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="mb-8 rounded-xl overflow-hidden"
          >
            {product.slides.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[32rem] rounded-xl overflow-hidden bg-gray-100">
                  {/* Nền mờ tràn full */}
                  <img
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                    aria-hidden
                  />
                  {/* Ảnh chính */}
                  <img
                    src={src}
                    alt={`Slide ${idx + 1}`}
                    className="relative z-10 w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}


        {/* Nội dung mô tả chi tiết + form */}
        <SanPhamMoTaChiTiet product={product} />
      </div>
    </div>
  );
}