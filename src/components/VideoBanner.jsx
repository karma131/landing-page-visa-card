import React from "react";

const VideoBanner = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Video chạy nền */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/ss.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      {/* Nội dung chồng lên video (nếu cần) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-gray-100 text-3xl md:text-5xl font-bold text-center">
          Trải nghiệm thẻ Visa theo cách hoàn toàn mới
        </h2>
      </div>
    </div>
  );
};

export default VideoBanner;
