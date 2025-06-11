import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Thẻ Visa là gì và có những loại nào?",
    answer:
      "Thẻ Visa là thẻ thanh toán quốc tế do ngân hàng phát hành và được chấp nhận toàn cầu. VieCard hiện cung cấp các loại như Visa Sinh Viên, Visa Doanh Nghiệp, Visa Premium, v.v.",
  },
  {
    question: "Tôi cần điều kiện gì để đăng ký thẻ Visa?",
    answer:
      "Bạn cần đủ 18 tuổi, có giấy tờ tùy thân và thu nhập ổn định. Một số thẻ như Visa Sinh Viên có thể yêu cầu đơn giản hơn.",
  },
  {
    question: "Đăng ký thẻ trên VieCard diễn ra như thế nào?",
    answer:
      "Bạn chọn loại thẻ phù hợp, điền thông tin cá nhân và nhận kết quả xét duyệt trực tuyến. VieCard hỗ trợ giao thẻ tận nơi.",
  },
  {
    question: "Tôi mất bao lâu để nhận được thẻ?",
    answer:
      "Thời gian xử lý thông thường là 3–5 ngày làm việc kể từ khi hồ sơ được duyệt.",
  },
  {
    question: "Đăng ký online có cần đến ngân hàng không?",
    answer:
      "Không cần. Tất cả quy trình đều thực hiện trực tuyến. Nhân viên có thể liên hệ nếu cần bổ sung thông tin.",
  },
  {
    question: "Đăng ký thẻ Visa trên VieCard có mất phí không?",
    answer:
      "Việc đăng ký hoàn toàn miễn phí. Một số loại thẻ có thể áp dụng phí thường niên khi sử dụng.",
  },
  {
    question: "Tôi có thể chọn thiết kế thẻ riêng không?",
    answer:
      "Có! Một số loại thẻ hỗ trợ cá nhân hóa ảnh hoặc tên hiển thị trên thẻ.",
  },
  {
    question: "Thẻ Visa có dùng để thanh toán quốc tế không?",
    answer:
      "Có. Bạn có thể dùng thẻ để mua sắm tại website nước ngoài, đi du lịch và giao dịch quốc tế.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Image left */}
        <img
          src="/faq.png" // Thay bằng đường dẫn ảnh bạn upload
          alt="Customer support illustration"
          className="w-full max-w-md mx-auto"
        />

        {/* FAQ right */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = active === index;
              return (
                <div
                  key={index}
                  className={`bg-gray-100 rounded-xl transition-all duration-500 shadow-sm ${
                    isOpen ? "shadow-lg" : "hover:shadow-md"
                }`}
                >
                  <button
                    onClick={() => setActive(isOpen ? null : index)}
                    className="flex justify-between items-center w-full p-4 text-left"
                  >
                    <span className="font-medium text-gray-800">
                      {item.question}
                    </span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={20} />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-gray-600 transition-all duration-300">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
