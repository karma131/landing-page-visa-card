import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SanPham from './components/SanPham';
import UuDai from './components/UuDai';
import ChiTietSanPham from './components/ChiTietSanPham';
import SanPhamChiTiet from './components/SanPhamChiTiet';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './components/SearchResults'; 
// import VisaCategoryPage from './components/VisaCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/san-pham" element={<SanPham />} />
        <Route path="/san-pham/:cardId" element={<ChiTietSanPham />} />
        <Route path="/product/:slug" element={<SanPhamChiTiet />} />
        {/* <Route path="/san-pham" element={<SanPham />} /> */}
        <Route path="/uu-dai" element={<UuDai />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
