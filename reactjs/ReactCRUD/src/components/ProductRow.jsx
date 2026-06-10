import React from 'react';

function ProductRow({ index, product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  const getStatusBadge = (status) => {
    if (status === 'Còn hàng') {
      return <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill fw-medium border border-success border-opacity-25">Còn hàng</span>;
    }
    return <span className="badge bg-danger bg-opacity-25 text-danger px-3 py-2 rounded-pill fw-medium border border-danger border-opacity-25">Hết hàng</span>;
  };

  return (
    <tr className="align-middle">
      <td className="text-center text-muted">{index + 1}</td>
      <td className="fw-medium" style={{ fontSize: '0.95rem' }}>{product.name}</td>
      <td className="text-muted" style={{ fontSize: '0.9rem' }}>{product.category}</td>
      <td className="fw-medium" style={{ fontSize: '0.95rem' }}>{formatPrice(product.price)}</td>
      <td>{getStatusBadge(product.status)}</td>
    </tr>
  );
}

export default ProductRow;
