import React, { useState, useEffect } from 'react';

function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = now.toLocaleString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="bg-primary text-white p-4 rounded-3 mb-4 mt-4 shadow-sm" style={{ backgroundColor: '#0d6efd' }}>
      <h2 className="fw-bold mb-1 fs-3">Quản lý danh sách sản phẩm</h2>
      <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>
        Giao diện nhập liệu và hiển thị danh sách sản phẩm một cách trực quan, rõ ràng
      </p>
      <p className="mb-0 mt-2 text-white-50" style={{ fontSize: '0.85rem' }}>
        🕐 {formatted}
      </p>
    </div>
  );
}

export default Header;
