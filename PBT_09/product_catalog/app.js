// === 1. DỮ LIỆU SẢN PHẨM (Mảng JS) ===
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200?text=S24+Ultra", rating: 4.7, inStock: true },
    { id: 3, name: "Xiaomi 14 Pro", price: 19990000, category: "phone", image: "https://placehold.co/200?text=Xiaomi+14", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200?text=MacBook+M3", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 13", price: 35000000, category: "laptop", image: "https://placehold.co/200?text=Dell+XPS", rating: 4.6, inStock: true },
    { id: 6, name: "Asus ROG Zephyrus", price: 42000000, category: "laptop", image: "https://placehold.co/200?text=Asus+ROG", rating: 4.8, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200?text=iPad+Pro", rating: 4.9, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/200?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200?text=Pad+6", rating: 4.4, inStock: true },
    { id: 10, name: "AirPods Pro 2", price: 6000000, category: "accessory", image: "https://placehold.co/200?text=AirPods", rating: 4.8, inStock: true },
    { id: 11, name: "Logitech MX Master 3S", price: 2500000, category: "accessory", image: "https://placehold.co/200?text=MX+Master", rating: 4.9, inStock: true },
    { id: 12, name: "Sạc Anker 100W", price: 1200000, category: "accessory", image: "https://placehold.co/200?text=Anker", rating: 4.7, inStock: false },
];

// Trạng thái ứng dụng
let currentProducts = [...products]; // Mảng copy để chứa sản phẩm đang lọc
let cartCount = 0;

// === 2. HÀM KHỞI TẠO UI TỪ SỐ 0 (100% Render bằng JS) ===
function initApp() {
    const app = document.getElementById('app');

    // Dùng innerHTML cho khung sườn tổng quan (skeleton) để code gọn gàng.
    // (Các sản phẩm bên trong sẽ render bằng createElement theo chuẩn)
    app.innerHTML = `
        <header>
            <h1>Tech Store</h1>
            <div style="display: flex; gap: 20px; align-items: center;">
                <button id="themeToggle">🌙 Dark Mode</button>
                <div class="cart-wrapper">
                    🛒 <span class="cart-badge" id="cartBadge">0</span>
                </div>
            </div>
        </header>
        
        <div class="controls">
            <input type="text" id="searchInput" placeholder="Tìm kiếm sản phẩm..." autocomplete="off">
            
            <div class="category-filters" id="categoryFilters">
                <button data-cat="all" class="active">Tất cả</button>
                <button data-cat="phone">Điện thoại</button>
                <button data-cat="laptop">Laptop</button>
                <button data-cat="tablet">Tablet</button>
                <button data-cat="accessory">Phụ kiện</button>
            </div>

            <select id="sortSelect">
                <option value="default">Sắp xếp mặc định</option>
                <option value="priceAsc">Giá: Tăng dần</option>
                <option value="priceDesc">Giá: Giảm dần</option>
                <option value="nameAZ">Tên: A-Z</option>
                <option value="ratingDesc">Đánh giá cao nhất</option>
            </select>
        </div>

        <div id="product-grid"></div>
    `;

    // Gắn sự kiện (Event Listeners) sau khi DOM skeleton đã được tạo
    document.getElementById('searchInput').addEventListener('input', searchProducts);
    document.getElementById('categoryFilters').addEventListener('click', filterByCategory);
    document.getElementById('sortSelect').addEventListener('change', sortProducts);
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

    // Gọi hàm render danh sách sản phẩm lần đầu
    renderProducts(currentProducts);
}

// === 3. CÁC HÀM XỬ LÝ CHÍNH (Core Functions) ===

// Render danh sách sản phẩm
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Làm sạch lưới sản phẩm cũ

    const fragment = document.createDocumentFragment();

    items.forEach(product => {
        // Tạo DOM thủ công bằng createElement theo đúng yêu cầu an toàn
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Sự kiện click mở Modal
        card.addEventListener('click', () => openModal(product));

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const title = document.createElement('h3');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `${product.price.toLocaleString()} VNĐ`;

        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.textContent = `${product.rating} ⭐`;

        const btn = document.createElement('button');
        btn.textContent = product.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !product.inStock;
        if(!product.inStock) btn.style.backgroundColor = 'gray';
        
        // Ngăn sự kiện click sủi bọt (bubbling) lên thẻ card để không vô tình mở Modal khi bấm "Thêm giỏ"
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            addToCart();
        });

        // Nối các thành phần con vào thẻ card
        card.append(img, title, price, rating, btn);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

// Tìm kiếm sản phẩm
function searchProducts(e) {
    const keyword = e.target.value.toLowerCase().trim();
    currentProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    
    // Reset lại sort select về mặc định khi search
    document.getElementById('sortSelect').value = 'default';
    renderProducts(currentProducts);
}

// Lọc theo Category
function filterByCategory(e) {
    if (e.target.tagName !== 'BUTTON') return;
    
    // Cập nhật UI nút active
    const buttons = document.querySelectorAll('.category-filters button');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Lọc dữ liệu
    const category = e.target.dataset.cat;
    if (category === 'all') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(p => p.category === category);
    }
    
    document.getElementById('searchInput').value = ''; // Reset thanh search
    document.getElementById('sortSelect').value = 'default'; // Reset sort
    renderProducts(currentProducts);
}

// Sắp xếp sản phẩm
function sortProducts(e) {
    const sortType = e.target.value;
    
    switch(sortType) {
        case 'priceAsc':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'nameAZ':
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'ratingDesc':
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Sắp xếp theo ID (mặc định ban đầu)
            currentProducts.sort((a, b) => a.id - b.id);
    }
    renderProducts(currentProducts);
}

// === 4. CÁC TÍNH NĂNG TƯƠNG TÁC KHÁC ===

// Thêm vào giỏ hàng
function addToCart() {
    cartCount++;
    const badge = document.getElementById('cartBadge');
    badge.textContent = cartCount;
    
    // Thêm animation giật nảy nhỏ cho đẹp
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

// Mở Modal chi tiết sản phẩm
function openModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    content.innerHTML = `
        <button class="close-modal">&times;</button>
        <img src="${product.image}" alt="${product.name}" style="width: 150px; margin-bottom: 15px;">
        <h2>${product.name}</h2>
        <p style="color: gray; margin-bottom: 10px;">Danh mục: ${product.category}</p>
        <p class="price" style="font-size: 20px; color: #e11d48; font-weight: bold;">${product.price.toLocaleString()} VNĐ</p>
        <p style="margin: 15px 0;">Mô tả chi tiết: Đây là sản phẩm tuyệt vời bạn nên mua ngay hôm nay!</p>
        <button style="width: 100%; padding: 10px;" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'Thêm vào giỏ hàng' : 'Đã hết hàng'}
        </button>
    `;

    // Nút đóng modal
    content.querySelector('.close-modal').addEventListener('click', () => overlay.remove());
    // Click ra ngoài (overlay) để đóng
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) overlay.remove();
    });

    overlay.appendChild(content);
    document.body.appendChild(overlay);
}

// Bật/tắt Dark Mode
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('themeToggle');
    btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// BẮT ĐẦU CHẠY ỨNG DỤNG
initApp();