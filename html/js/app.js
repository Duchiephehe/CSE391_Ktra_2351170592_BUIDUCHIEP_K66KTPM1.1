/* ===== ĐỒNG HỒ ===== */
function startClock() {
    function tick() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleString('vi-VN', {
            weekday: 'long', year: 'numeric', month: '2-digit',
            day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }
    tick();
    setInterval(tick, 1000);
}

/* ===== FORMAT ===== */
const formatPrice = (v) => new Intl.NumberFormat('vi-VN').format(v) + ' đ';

function getStatusBadge(status) {
    if (status === 'Còn hàng') {
        return `<span class="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill fw-medium border border-success border-opacity-25">Còn hàng</span>`;
    }
    return `<span class="badge bg-danger bg-opacity-25 text-danger px-3 py-2 rounded-pill fw-medium border border-danger border-opacity-25">Hết hàng</span>`;
}

/* ===== RENDER BẢNG ===== */
function renderTable(products) {
    const tbody = document.getElementById('productTbody');
    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Chưa có sản phẩm nào.</td></tr>`;
        return;
    }
    tbody.innerHTML = products.map((p, idx) => `
        <tr class="align-middle">
            <td class="text-center text-muted">${idx + 1}</td>
            <td class="fw-medium" style="font-size:0.95rem">${p.name}</td>
            <td class="text-muted" style="font-size:0.9rem">${p.category}</td>
            <td class="fw-medium" style="font-size:0.95rem">${formatPrice(p.price)}</td>
            <td>${getStatusBadge(p.status)}</td>
        </tr>
    `).join('');
}

/* ===== TOAST ===== */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'flex';
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.style.display = 'none'; }, 350);
    }, 3000);
}

/* ===== VALIDATE GIÁ (chỉ số) ===== */
function setupPriceInput() {
    const input = document.getElementById('productPrice');
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^\d.]/g, '').replace(/^(\d*\.?\d*).*$/, '$1');
    });
}

/* ===== INIT ===== */
function init() {
    const products = window.PRODUCTS ? [...window.PRODUCTS] : [];

    startClock();
    renderTable(products);
    setupPriceInput();

    /* Reset form */
    document.getElementById('btnReset').addEventListener('click', () => {
        document.getElementById('productForm').reset();
    });

    /* Submit form */
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name     = document.getElementById('productName').value.trim();
        const category = document.getElementById('productCategory').value;
        const price    = document.getElementById('productPrice').value.trim();
        const status   = document.getElementById('productStatus').value;

        if (!name || !category || !price) {
            alert('Vui lòng điền đầy đủ Tên, Danh mục và Giá!');
            return;
        }
        if (isNaN(Number(price)) || Number(price) < 0) {
            alert('Giá phải là một số hợp lệ!');
            return;
        }

        const newProduct = {
            id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            category,
            price: Number(price),
            status
        };

        products.push(newProduct);
        renderTable(products);
        document.getElementById('productForm').reset();
        showToast(`Đã thêm "${name}" thành công!`);
    });
}

document.addEventListener('DOMContentLoaded', init);
