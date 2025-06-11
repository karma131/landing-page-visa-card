import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

const handleSubmit = (e) => {
  // Check if form inputs are valid via native HTML5 validation
  const form = e.target.closest("form");
  if (!form.checkValidity()) {
    // Let browser show native tooltip (like "Please include @")
    return;
  }

  e.preventDefault(); // Prevent form reload only when passed native check

  const phoneRegex = /^0\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ\s]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!nameRegex.test(fullName.trim())) {
    toast.error("Họ tên không hợp lệ (chỉ chứa chữ cái và khoảng trắng, tối thiểu 2 ký tự)");
    return;
  }

  if (!emailRegex.test(email)) {
    toast.error("Email không hợp lệ");
    return;
  }

  if (!phoneRegex.test(phone)) {
    toast.error("Số điện thoại không hợp lệ (phải là 10 số và bắt đầu bằng 0)");
    return;
  }

  if (!passwordRegex.test(password)) {
    toast.error("Mật khẩu phải ít nhất 8 ký tự, gồm chữ và số");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Xác nhận mật khẩu không khớp");
    return;
  }

  // Submit request
  fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, phone, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        toast.error("Đăng ký thất bại: " + data.error);
      } else {
        toast.success("Đăng ký thành công!");
        setTimeout(() => navigate("/login"), 1500);
      }
    })
    .catch(() => toast.error("Lỗi kết nối đến server"));
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl text-black font-bold text-center mb-6">Đăng ký</h2>
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border outline-none"
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border outline-none"
            />
            <span
              className="absolute right-4 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border outline-none"
            />
          </div>
{/* 
          {error && (
            <p className="text-red-500 text-sm">⚠ Vui lòng điền đầy đủ và đúng thông tin!</p>
          )} */}

          <div className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" required />
            <span>
              Tôi đồng ý với <span className="text-red-500">Điều khoản sử dụng</span>
            </span>
          </div>

          <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-full font-semibold">
            Đăng ký
          </button>

          <p className="text-center text-sm mt-4">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-red-500 font-medium">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
