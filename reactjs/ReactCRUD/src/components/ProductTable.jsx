import React from 'react';
import ProductRow from './ProductRow';

function ProductTable({ products }) {
  return (
    <div className="card shadow-sm border-0 bg-light p-3 h-100 rounded-3">
      <h5 className="fw-bold mb-1">Danh sách sản phẩm</h5>
      <p className="text-muted small mb-4">Danh sách sản phẩm được hiển thị từ cơ sở dữ liệu hệ thống</p>
      
      <div className="table-responsive bg-white rounded-3 p-1">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className="text-uppercase text-secondary" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
              <th className="text-center py-3 border-bottom-0">STT</th>
              <th className="py-3 border-bottom-0">TÊN SẢN PHẨM</th>
              <th className="py-3 border-bottom-0">DANH MỤC</th>
              <th className="py-3 border-bottom-0">GIÁ</th>
              <th className="py-3 border-bottom-0">TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow key={product.id} index={index} product={product} />
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">Chưa có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
