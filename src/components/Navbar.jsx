import React, { useState, useEffect, useRef } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    setIsLoggedIn(!!token);
    if (token && name) setUserName(name);
  }, [location.pathname]);
  
  // Click ra ngoài sẽ đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = (path) =>
    `text-lg font-semibold transition-colors ${
      location.pathname === path
        ? "text-red-600 underline underline-offset-4"
        : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 z-50 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
            <div className="ml-3">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-black via-red-900 to-[#BC0000]">
                VieCard
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-lg font-semibold text-black-500 border-b-3 border-black-600"
                  : "text-lg font-semibold text-gray-500 hover:text-red-600"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/san-pham"
              className={({ isActive }) =>
                isActive
                  ? "text-lg font-semibold text-black-600 border-b-3 border-black-600"
                  : "text-lg font-semibold text-gray-500 hover:text-red-600"
              }
            >
              Sản phẩm
            </NavLink>
            <NavLink
              to="/uu-dai"
              className={({ isActive }) =>
                isActive
                  ? "text-lg font-semibold text-black-600 border-b-3 border-black-600"
                  : "text-lg font-semibold text-gray-500 hover:text-red-600"
              }
            >
              Ưu đãi
            </NavLink>
          </div>

          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/register">
                  <button className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80 transition">
                    Đăng ký
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-[#BC0000] text-white px-4 py-2 rounded-full hover:opacity-80 transition">
                    Đăng nhập
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center cursor-pointer space-x-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <User className="w-5 h-5 text-gray-700 hover:text-red-500" />
                  <span className="text-sm font-medium text-gray-800 hidden lg:block">
                    {userName || "Tài khoản"}
                  </span>
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-4">
          <Link to="/" className={linkClass("/")}>
            Trang chủ
          </Link>
          <Link to="/san-pham" className={linkClass("/san-pham")}>
            Sản phẩm
          </Link>
          <Link to="/uu-dai" className={linkClass("/uu-dai")}>
            Ưu đãi
          </Link>
        </div>
      )}
    </nav>
  );
}
