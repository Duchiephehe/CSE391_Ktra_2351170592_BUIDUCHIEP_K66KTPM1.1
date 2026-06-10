import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import Toast from './components/Toast';
import { products as initialData } from './data/data';

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('my_products');
    if (saved) return JSON.parse(saved);
    return initialData;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('my_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    const item = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price)
    };
    setProducts([...products, item]);
    setToast({ message: `Đã thêm "${newProduct.name}" thành công!`, type: 'success' });
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1200px', paddingBottom: '50px' }}>
        <Header />

        <div className="row g-4">
          <div className="col-md-4">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>

          <div className="col-md-8">
            <ProductTable products={products} />
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default App;
