import React from "react";
import { useParams, Link } from "react-router-dom";
import { Home } from "lucide-react";

const categories = [
  {
    id: 1,
    label: "Visa Hoàn Tiền",
    icon: "/img/visa-hoantien.svg",
    iconBg: "/img/visa-hoantien.svg",
    products: [
      {
        title: "Thẻ Hoàn Tiền Ưu Đãi",
        discount: "-20%",
        description: [
          "Hoàn tiền 5% chi tiêu siêu thị, ăn uống",
          "Miễn phí phát hành thẻ",
        ],
        image: "/img/hoantien-feature.png",
        price: "Miễn phí năm đầu",
      },
    ],
  },
  {
    id: 2,
    label: "Visa Du Lịch",
    icon: "/img/visa-dulich.svg",
    iconBg: "/img/visa-dulich.svg",
    products: [
      {
        title: "Visa Travel Plus",
        discount: "-15%",
        description: [
          "Miễn phí chuyển đổi ngoại tệ",
          "Phòng chờ sân bay toàn cầu",
        ],
        image: "/img/dulich-feature.png",
        price: "Từ 199.000đ",
      },
    ],
  },
  // ... các danh mục khác nếu cần
];

export default function VisaCategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === parseInt(id));

  if (!category) {
    return <div className="p-6 text-center">Không tìm thấy loại thẻ.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <section className="px-6 pt-10 max-w-7xl mx-auto">
        <nav className="flex items-center text-sm text-gray-500 gap-2 mb-2">
          <Link to="/"><Home size={18} /></Link>
          <span>&gt;</span>
          <Link to="/san-pham">Sản phẩm</Link>
          <span>&gt;</span>
          <span className="font-medium">{category.label}</span>
        </nav>
        <h1 className="text-3xl font-bold mb-1">{category.label}</h1>
        <p className="text-gray-600">Các sản phẩm ưu đãi và tiện ích nổi bật dành riêng cho bạn</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>
        {category.products.map((p, i) => (
          <div key={i} className="flex flex-col md:flex-row bg-white rounded-2xl shadow p-4 gap-4 items-center mb-6">
            <div className="relative w-full md:w-1/2">
              <img src={p.image} alt={p.title} className="rounded-xl w-full h-auto object-cover" />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">{p.discount}</div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                {p.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-semibold">{p.price}</span>
                <button className="bg-red-600 text-white rounded-full px-4 py-2 text-sm hover:bg-red-700 transition">Đăng ký</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
