import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import FAQSection from "./FAQSection";
import VideoBanner from "./VideoBanner";
import {motion} from "framer-motion";
export default function LandingPage() {
    const [message, setMessage] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const benefits = [
      {
        title: "Duyệt hồ sơ siêu tốc",
        desc: "Duyệt hồ sơ trong vòng 24 giờ, nhận kết quả ngay.",
        color: "bg-[#563d82]",
        image: "/img/icons/speed.png",
      },
      {
        title: "Thiết kế thẻ cá nhân hóa",
        desc: "Tùy chỉnh mặt thẻ theo phong cách của bạn.",
        color: "bg-[#2774ae]",
        image: "/img/icons/custom-card.png",
      },
      {
        title: "Gợi ý thẻ phù hợp",
        desc: "Hệ thống gợi ý loại thẻ phù hợp nhất với nhu cầu.",
        color: "bg-[#ee9425]",
        image: "/img/icons/suggestion.png",
      },
      {
        title: "Đăng ký 100% online",
        desc: "Thực hiện mọi thao tác ngay trên nền tảng web.",
        color: "bg-[#BC0000]",
        image: "/img/icons/online.png",
      },
      {
        title: "Bảo mật & xác thực an toàn",
        desc: "Hệ thống bảo vệ thông tin và xác minh 2 lớp.",
        color: "bg-[#563d82]",
        image: "/img/icons/security.png",
      },
    ];
    useEffect(() => {
        fetch("http://localhost:3001/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("Không thể kết nối backend"));
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-gray-900">
            <Navbar />
            {/* Hero Section */}
            <section className="w-full bg-cover bg-center text-white py-20 px-4 sm:px-6 lg:px-8 h-[650px]" 
            style={{ backgroundImage: "url('/background1.png')" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full items-center">
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            <div>Đăng ký thẻ Visa</div>
                            <div>siêu nhanh</div>
                        </h1>
                        <p className="text-base sm:text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Chỉ mất 5 phút - Nhận ưu đãi ngay hôm nay</p>
                        {/* <p className="text-sm italic">{message}</p> */}
                        <Link to="/san-pham">
                            <button
                              className="flex shiny-button bg-[#c4c4c4] text-black px-6 py-3 rounded-full font-semibold transition duration-300 cursor-pointer">
                              Khám phá ngay <ArrowUpRight size={18} />
                            </button>

                            {/* <button className="bg-gray-100 text-black px-6 py-3 rounded-full font semibold
                            hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out shadow-md hover:shadow-lg">Xem các loại thẻ</button> */}
                        </Link>
                    </div>
                </div>
            </section>
      <VideoBanner />
      {/* <VisaSlideshow /> */}
      {/* Lợi ích nổi bật có hiệu ứng trôi vào */}
      
      <section className="py-16 px-6 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-[750] leading-tight text-gray-900">
              Trọn bộ giải pháp tài chính cá nhân,<br />
              tất cả chỉ trong một nơi duy nhất.
            </h3>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              Mở thẻ nhanh chóng, chi tiêu linh hoạt, ưu đãi hấp dẫn — tất cả đều tích hợp trong một chiếc thẻ.
            </p>
          </div>


          {/* Hàng đầu: 2 ô */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {benefits.slice(0, 2).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.3, ease: 'easeOut'}}
                className={`rounded-xl text-white p-6 ${item.color} shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
                <img src={item.image} alt={item.title} className="w-48 h-auto mx-auto mt-4" />
              </motion.div>
            ))}
          </div>

          {/* Hàng dưới: 3 ô */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.slice(2).map((item, idx) => (
              <motion.div
                key={idx + 2}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.3 }}
                className={`rounded-xl text-white p-6 ${item.color} shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
                <img src={item.image} alt={item.title} className="w-40 h-auto mx-auto mt-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection/>
      {/* CTA */}
      <section className="py-16 px-6 lg:px-24 bg-[#BC0000] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Bắt đầu ngay hôm nay</h2>
        <p className="mb-6">Chọn loại thẻ phù hợp và đăng ký chỉ trong vài phút</p>
        <Link to="/san-pham">
          <button className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-100 transition">Xem thẻ Visa</button>
        </Link>
      </section>
    </div>
  );
}
