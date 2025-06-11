// src/components/UuDai.jsx
import Navbar from "./Navbar";

export default function UuDai() {
  return (
    <div className="bg-white min-h-screen font-sans bg-gradient-to-r from-white to-gray-100 text-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 mt-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Ưu đãi thẻ Visa</h1>
        <ul className="space-y-6">
          <li className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-red-500">✨ Hoàn tiền đến 10%</h2>
            <p className="mt-2 text-gray-700">Khi chi tiêu tại các siêu thị, nhà hàng và ứng dụng đặt xe.</p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-red-500">🎁 Quà tặng khi đăng ký</h2>
            <p className="mt-2 text-gray-700">Đăng ký thẻ trong tháng này để nhận voucher lên đến 500.000đ.</p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-red-500">🌏 Ưu đãi du lịch</h2>
            <p className="mt-2 text-gray-700">Miễn phí phí chuyển đổi ngoại tệ, tích lũy dặm bay khi thanh toán quốc tế.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
