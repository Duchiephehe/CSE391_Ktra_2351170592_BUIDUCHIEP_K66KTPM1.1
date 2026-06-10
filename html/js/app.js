const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const formatPrice = (v) => v.toLocaleString('vi-VN') + '₫';

function renderTable(products) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    products.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
			<td>${idx + 1}</td>
			<td>${p.name}</td>
			<td>${formatPrice(p.price)}</td>
			<td>${p.quantity}</td>
			<td>${p.description}</td>
			<td>
				<button class="btn btn-sm btn-primary me-1">Sửa</button>
				<button class="btn btn-sm btn-danger btn-delete">Xóa</button>
			</td>
		`;
        tr.querySelector('.btn-delete').addEventListener('click', () => {
            const i = products.findIndex(x => x.id === p.id);
            if (i > -1) {
                products.splice(i, 1);
                renderTable(products);
            }
        });
        tbody.appendChild(tr);
    });
}

function init() {
    const products = window.PRODUCTS ? [...window.PRODUCTS] : [];

    renderTable(products);

    const form = document.getElementById('productForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value.trim();
        const price = Number(document.getElementById('productPrice').value) || 0;
        const qty = Number(document.getElementById('productQty').value) || 0;
        const desc = document.getElementById('productDesc').value.trim();

        const newProduct = {
            id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name,
            price,
            quantity: qty,
            description: desc,
            image: ''
        };

        products.push(newProduct);
        renderTable(products);

        const modalEl = document.getElementById('productModal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();

        form.reset();
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) renderTable(products);
        else renderTable(products.filter(p => p.name.toLowerCase().includes(q) || String(p.id) === q));
    });
}

document.addEventListener('DOMContentLoaded', init);

