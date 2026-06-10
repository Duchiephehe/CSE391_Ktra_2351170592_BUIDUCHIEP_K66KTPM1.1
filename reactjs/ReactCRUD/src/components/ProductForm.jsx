import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const initialForm = {
    name: '',
    category: '',
    price: '',
    status: 'Còn hàng'
  };
  
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' && value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert("Vui lòng điền đầy đủ Tên, Danh mục và Giá!");
      return;
    }
    if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      alert("Giá phải là một số hợp lệ!");
      return;
    }
    onAddProduct(formData);
    setFormData(initialForm);
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  return (
    <div className="card shadow-sm border-0 bg-light p-3 h-100 rounded-3">
      <h5 className="fw-bold mb-1">Thêm sản phẩm mới</h5>
      <p className="text-muted small mb-4">Nhập đầy đủ thông tin để thêm sản phẩm vào danh sách</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium small text-secondary mb-1">Tên sản phẩm</label>
          <input 
            type="text" 
            name="name" 
            className="form-control form-control-sm py-2" 
            placeholder="Nhập tên sản phẩm" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label fw-medium small text-secondary mb-1">Danh mục</label>
          <select 
            name="category" 
            className="form-select form-select-sm py-2" 
            value={formData.category} 
            onChange={handleChange}
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Điện thoại">Điện thoại</option>
            <option value="Máy tính bảng">Máy tính bảng</option>
            <option value="Laptop">Laptop</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Tai nghe">Tai nghe</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label fw-medium small text-secondary mb-1">Giá</label>
          <input 
            type="text" 
            name="price" 
            className="form-control form-control-sm py-2" 
            placeholder="Nhập giá" 
            value={formData.price} 
            onChange={handleChange} 
            inputMode="decimal"
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-medium small text-secondary mb-1">Trạng thái cửa hàng</label>
          <select 
            name="status" 
            className="form-select form-select-sm py-2" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>
        
        <div className="d-flex gap-2 mt-2">
          <button type="submit" className="btn btn-primary btn-sm flex-grow-1 fw-medium py-2">Thêm sản phẩm</button>
          <button type="button" className="btn btn-outline-secondary btn-sm fw-medium py-2 px-3" onClick={handleReset}>Làm mới form</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
