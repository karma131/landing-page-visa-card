import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate(); 
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setError(true);
    } else {
      setError(false);
      fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, password })
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            toast.success("Đăng nhập thành công!");
            console.log("Token:", data.token); // Bạn có thể lưu vào localStorage nếu cần
            localStorage.setItem("token", data.token); // lưu token
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.fullName || "");
            localStorage.setItem("userEmail", data.email || "");
            localStorage.setItem("userPhone", data.phone || "");

            navigate("/");
          } else {
            setError(true);
            toast.error(data.message || "Sai số điện thoại hoặc mật khẩu");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi gửi request:", err);
          toast.error("Có lỗi kết nối server.");
        });

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Đăng nhập</h2>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 outline-none border ${error && !phone ? 'border-red-500' : 'border-transparent'}`}
            />
            {error && !phone && (
              <p className="text-red-500 text-sm mt-1">⚠ Vui lòng nhập đủ các thông tin bắt buộc</p>
            )}
          </div>

          <div className="relative text-black">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 outline-none border ${error && !password ? 'border-red-500' : 'border-transparent'}`}
            />
            <span
              className="absolute right-4 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {error && !password && (
              <p className="text-red-500 text-sm mt-1">⚠ Vui lòng nhập đủ các thông tin bắt buộc</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Lưu thông tin đăng nhập
            </label>
            <button type="button" className="text-red-500">Quên mật khẩu</button>
          </div>

          <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-full font-semibold">Đăng nhập</button>

          <p className="text-center text-sm text-red-600 mt-4 cursor-pointer">Đăng nhập bằng mã OTP</p>

          <p className="text-center text-sm mt-4">
            Bạn chưa có tài khoản? <Link to="/register" className="text-red-500 font-medium">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
