// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Pencil, Save, Banknote } from "lucide-react";
import { toast } from "react-toastify";
import BirthDatePicker from "./BirthDatePicker";



export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [applications, setApplications] = useState([]);

  const [user, setUser] = useState({
    fullName: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
    address: localStorage.getItem("userAddress") || "",
    cccd: "",
    birthDate: "",
  });
  const [financial, setFinancial] = useState({
    occupation: "",
    companyName: "",
    companyAddr: "",
    income: "",
    salaryMethod: "",
    bankName: "",
    bankAccount: "",
    proof: "",
  });

  const fetchApplications = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:3001/api/apply/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) setApplications(data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách thẻ:", err);
    }
  };

  const fetchFinancialInfo = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:3001/api/financial/${userId}`);
      const data = await res.json();
      if (res.ok && data) {
        setFinancial(data);
      }
    } catch (err) {
      console.error("Lỗi khi fetch thông tin tài chính:", err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser((prev) => ({
            ...prev,
            ...data,
            birthDate: data.birthDate
              ? new Date(data.birthDate).toISOString().split("T")[0]
              : "",
          }));
        }
      } catch (err) {
        console.error("Lỗi khi fetch user info:", err);
      }
    };

    fetchUserInfo();
    fetchFinancialInfo();
  }, []);

  useEffect(() => {
    if (activeTab === "orders") fetchApplications();
    else if (activeTab === "financial") fetchFinancialInfo();
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleFinancialChange = (e) => {
    const { name, value } = e.target;
    setFinancial((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return toast.error("Không tìm thấy ID người dùng!");

      if (activeTab === "profile") {
        const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Cập nhật thành công!");
          setIsEditing(false);
          localStorage.setItem("userName", user.fullName);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userPhone", user.phone);
          localStorage.setItem("userAddress", user.address);
        } else {
          toast.error(data.error || "Cập nhật thất bại!");
        }
      } else if (activeTab === "financial") {
        const response = await fetch(`http://localhost:3001/api/financial/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(financial),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Đã lưu thông tin tài chính!");
          setIsEditing(false);
        } else {
          toast.error(data.error || "Lưu thông tin tài chính thất bại!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server!");
    }
  };

  const tabButton = (key, label, icon) => (
    <button
      onClick={() => setActiveTab(key)}
      className={`flex items-center w-full px-4 py-2 rounded-lg mb-2 text-sm font-semibold transition ${
        activeTab === key
          ? "bg-red-50 text-red-600 border border-red-200"
          : "text-gray-700 hover:text-red-600"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 flex">
      <Navbar />
      <div className="w-64 p-6 pt-28">
        {tabButton("profile", "Thông tin cá nhân", "👤")}
        {tabButton("orders", "Danh sách thẻ đăng ký", "📘")}
        {tabButton("financial", "Thông tin tài chính", "💰")}
      </div>

      <div className="flex-1 max-w-4xl px-6 pt-24">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {activeTab === "profile" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
                {isEditing ? (
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 flex items-center gap-2"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" /> Lưu
                  </button>
                ) : (
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 flex items-center gap=4"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-4 h-4" /> Chỉnh sửa
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-medium">Họ tên</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  ) : (
                    <p>{user.fullName || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Số điện thoại</p>
                        <p>{user.phone || "Không có"}</p>

                </div>
                <div>
                  <p className="font-medium">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  ) : (
                    <p>{user.email || "Không có"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  ) : (
                    <p>{user.address || "Không có"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Ngày sinh</p>
                  {isEditing ? (
                    <BirthDatePicker
                      value={user.birthDate}
                      onChange={(val) => setUser((prev) => ({ ...prev, birthDate: val }))}
                    />
                  ) : (
                    <p>{user.birthDate ? new Date(user.birthDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}</p>
                  )}
                </div>

                <div>
                  <p className="font-medium">Số CCCD/CMND</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="cccd"
                      value={user.cccd}
                      onChange={handleChange}
                      placeholder="Chỉ nhập số"
                      className="w-full px-3 py-2 border rounded"
                    />
                  ) : (
                    <p>{user.cccd || "Chưa cập nhật"}</p>
                  )}
                </div>

              </div>
            </>
          )}

            {activeTab === "orders" && (
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh sách thẻ đã đăng ký</h2>
                <div className="space-y-4">
                {applications.map((app) => (
                    <div key={app.id} className="rounded-xl border border-gray-200 p-6 bg-white shadow-md flex items-center gap-6">
                    <div
                        className="w-12 h-12 rounded-full border border-gray-300"
                        style={{ backgroundColor: app.color }}
                        title={app.color}
                    ></div>

                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800">{app.cardName}</h4>
                        <p className="text-sm text-gray-600">Gói: <strong>{app.cardType}</strong></p>
                        <p className="text-sm text-gray-600">Thời hạn: {app.duration} năm</p>
                        <p className="text-sm text-gray-600">Ngày đăng ký: {new Date(app.createdAt).toLocaleDateString("vi-VN")}</p>
                    </div>

                    <div className="text-right">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                        {app.status || "Chờ duyệt"}
                        </span>
                    </div>
                    </div>
                ))}
                </div>

            </div>
            )}

          {activeTab === "financial" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Thông tin tài chính</h2>
                <button
                  className={`${
                    isEditing ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  } text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  {isEditing ? "Lưu" : "Chỉnh sửa"}
                </button>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="font-medium">Nghề nghiệp</p>
                  {isEditing ? (
                    <input type="text" name="occupation" value={financial.occupation} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.occupation || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Tên công ty</p>
                  {isEditing ? (
                    <input type="text" name="companyName" value={financial.companyName} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.companyName || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Địa chỉ công ty</p>
                  {isEditing ? (
                    <input type="text" name="companyAddr" value={financial.companyAddr} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.companyAddr || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Thu nhập</p>
                  {isEditing ? (
                    <input type="text" name="income" value={financial.income} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.income || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Tên ngân hàng</p>
                  {isEditing ? (
                    <input type="text" name="bankName" value={financial.bankName} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.bankName || "Chưa cập nhật"}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium">Tài khoản ngân hàng</p>
                  {isEditing ? (
                    <input type="text" name="bankAccount" value={financial.bankAccount} onChange={handleFinancialChange} className="w-full px-3 py-2 border rounded" />
                  ) : (
                    <p>{financial.bankAccount || "Chưa cập nhật"}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
