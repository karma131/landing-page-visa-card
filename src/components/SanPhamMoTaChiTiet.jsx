import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function SanPhamMoTaChiTiet({ product }) {
  const [selectedPlan, setSelectedPlan] = useState("cơ bản");
  const [duration, setDuration] = useState("1");
  const [selectedColor, setSelectedColor] = useState(null);
  const [step, setStep] = useState("form"); // form, confirm, done
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(1);
  const [cardText, setCardText] = useState("");
  const [documentType, setDocumentType] = useState("CCCD");
  const [documentNumber, setDocumentNumber] = useState("");
  const [address, setAddress] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:3001/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserInfo(data);
          if (data.cccd) setDocumentNumber(data.cccd); // điền sẵn vào trường giấy tờ nếu cần
        } else {
          console.error("Lỗi khi lấy thông tin user");
        }
      } catch (err) {
        console.error("Lỗi kết nối:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleContinue = () => {
    if (!selectedColor) {
      toast.warning("Vui lòng chọn màu thẻ");
      return;
    }
    setShowPopup(true);
    setPopupStep(1);
  };

  const handleApply = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("Bạn cần đăng nhập trước khi đăng ký");

    if (!documentNumber || !address || !agreed) {
      return toast.error("Vui lòng điền đầy đủ thông tin và đồng ý điều khoản");
    }

    try {
      const res = await fetch("http://localhost:3001/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(userId),
          cardType: selectedPlan,
          cardName: product.name,
          cardText: cardText,
          color: selectedColor || "#000000",
          duration: parseInt(duration),
          documentType,
          documentNumber,
          address
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Đăng ký thành công!");
        setStep("done");
        setShowPopup(false);
      } else {
        toast.error(data.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi kết nối đến server!");
    }
  };

  function parsePrice(priceStr){
    if (priceStr.includes("Miễn phí")) return 0;
    const numeric = priceStr.replace(/[^\d]/g, "");
    return parseInt(numeric);
  }

  const yearCount = parseInt(duration);
  const pricePerYear = parsePrice(product.gia);
  let multiplier = 1;
  if (selectedPlan === "tiêu chuẩn") multiplier = 1.125;
  if (selectedPlan === "cao cấp") multiplier = 1.25;
  const totalBeforeDiscount = pricePerYear * yearCount * multiplier;
  const discountPercent = product.discsount ? parseFloat(product.discsount.replace(/[^0-9.]/g, "")) / 100 : 0;
  const finalFee = Math.round(totalBeforeDiscount * (1 - discountPercent));
  const discountAmount = totalBeforeDiscount - finalFee;

  return (
    <div className="relative">
      <div className={`mt-10 bg-white ring ring-gray-50 rounded-2xl p-6 shadow-lg ${showPopup ? 'opacity-20 pointer-events-none' : ''}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base mb-4">{product.benefits?.join(" • ")}</p>

        {product.colors && (
          <div className="mb-6">
            <p className="font-medium text-gray-800 mb-2">Chọn màu thẻ:</p>
            <div className="flex gap-4">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full ring-2 transition ${selectedColor === color ? "ring-green-500" : "ring-transparent"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3 mb-6 border-b pb-2">
          {["cơ bản", "tiêu chuẩn", "cao cấp"].map((plan) => (
            <button
              key={plan}
              className={`px-4 py-2 text-sm font-medium rounded-full ${selectedPlan === plan ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <p className="font-semibold mb-2">Quyền lợi nổi bật:</p>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {product.benefits?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="bg-white shadow-lg ring-1 ring-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin đăng ký</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Gói thẻ</label>
              <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full bg-gray-50 px-4 py-2 rounded-lg">
                <option value="cơ bản">Cơ bản</option>
                <option value="tiêu chuẩn">Tiêu chuẩn</option>
                <option value="cao cấp">Cao cấp</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Thời hạn</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-gray-50 px-4 py-2 rounded-lg">
                <option value="1">1 năm</option>
                <option value="2">2 năm</option>
                <option value="3">3 năm</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Tên thẻ Visa</label>
              <input type="text" value={product.name} disabled className="w-full bg-gray-200 px-4 py-2 rounded-lg" />
            </div>
          </div>
        </div>

        {step === "form" && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <div className="text-sm text-gray-800 space-y-1 mb-4 sm:mb-0">
              <p>Giá gốc ({yearCount} năm): <span className="font-bold">{totalBeforeDiscount.toLocaleString()}đ</span></p>
              {discountAmount > 0 && <p>Ưu đãi {product.discsount}: <span className="font-bold text-yellow-600">-{discountAmount.toLocaleString()}đ</span></p>}
              <p className="text-lg font-semibold text-red-600">Tổng thanh toán: {finalFee.toLocaleString()}đ</p>
            </div>
            <button onClick={handleContinue} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition">
              Tiếp tục
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)]  z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-3xl focus:outline-none font-bold"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <div className="flex justify-center items-center mb-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${popupStep >= 1 ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-400'}`}>1</div>
              <div className="h-1 bg-gray-300 w-12 mx-2"></div>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${popupStep === 2 ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-400'}`}>2</div>
            </div>
            {popupStep === 1 && (
              <div className="space-y-4">
                <div><label className="text-sm">Thẻ:</label><p className="font-medium">{product.name}</p></div>
                <div><label className="text-sm">Gói:</label><p className="font-medium">{selectedPlan}</p></div>
                <div><label className="text-sm">Thời hạn:</label><p className="font-medium">{duration} năm</p></div>
                <div>
                  <label className="text-sm">Màu:</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="text-sm" style={{ color: selectedColor }}>{selectedColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Tên in trên thẻ (viết in hoa, không dấu)</label>
                  <input value={cardText} onChange={(e) => setCardText(e.target.value.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").slice(0, 21))} className="w-full border rounded px-3 py-2" placeholder="TÊN HIỂN THỊ" />
                </div>
                <button onClick={() => setPopupStep(2)} className="w-full bg-red-600 text-white py-2 rounded">Tiếp tục</button>
              </div>
            )}
            {popupStep === 2 && (
              <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Số CCCD</label>
                <input
                  type="text"
                  value={userInfo?.cccd || ""}
                  readOnly
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-gray-700"
                />
              </div>
                <div>
                  <label className="block text-sm font-medium">Địa chỉ nhận thẻ</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  <span className="text-sm">Tôi xác nhận thông tin đã khai là đúng và đồng ý điều khoản</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setPopupStep(1)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded">Quay lại</button>
                  <button onClick={handleApply} className="flex-1 bg-red-600 text-white py-2 rounded">Gửi đăng ký</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="mt-8 p-6 border rounded-xl bg-green-50 text-green-700 text-center">
          🎉 Bạn đã đăng ký thẻ thành công! Vui lòng chờ duyệt trong vòng 1-2 ngày làm việc.
        </div>
      )}
    </div>
  );
}
