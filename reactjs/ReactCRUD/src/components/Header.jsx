import React from 'react';

function Header() {
  return (
    <div className="bg-primary text-white p-4 rounded-3 mb-4 mt-4 shadow-sm" style={{ backgroundColor: '#0d6efd' }}>
      <h2 className="fw-bold mb-1 fs-3">Quản lý danh sách sản phẩm</h2>
      <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>Giao diện nhập liệu và hiển thị danh sách sản phẩm một cách trực quan, rõ ràng</p>
    </div>
  );
}

export default Header;
