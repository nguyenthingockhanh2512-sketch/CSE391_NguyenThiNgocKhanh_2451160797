// === 1. DỮ LIỆU SẢN PHẨM (Mảng JS) ===
// Khai báo mảng chứa các đối tượng (object) sản phẩm.
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200?text=S24+Ultra", rating: 4.7, inStock: true },
    { id: 3, name: "Xiaomi 14 Pro", price: 19990000, category: "phone", image: "https://placehold.co/200?text=Xiaomi+14", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200?text=MacBook+M3", rating: 4.9, inStock: true },
];

// Trạng thái ứng dụng (State)
// Tạo một mảng copy từ mảng gốc (dùng spread operator [...]) để chứa các sản phẩm đang được hiển thị (sau khi lọc/tìm kiếm).
// Việc này giúp mảng gốc `products` không bao giờ bị thay đổi hay mất dữ liệu.
let currentProducts = [...products]; 
let cartCount = 0; // Biến đếm số lượng sản phẩm trong giỏ hàng

// === 2. HÀM KHỞI TẠO UI TỪ SỐ 0 (100% Render bằng JS) ===
function initApp() {
    // Lấy thẻ div#app trống từ file HTML
    const app = document.getElementById('app');

    // Dùng innerHTML để tạo KHUNG SƯỜN (skeleton) cho ứng dụng.
    // Lưu ý: Chỉ dùng innerHTML cho các thành phần tĩnh, do mình tự viết code, không chứa dữ liệu do user nhập vào để tránh lỗi bảo mật XSS.
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

    // Nối các sự kiện (Event Listeners) vào các thẻ vừa tạo ở trên
    // Sự kiện 'input' bắt nhạy hơn 'change', kích hoạt ngay khi gõ từng chữ
    document.getElementById('searchInput').addEventListener('input', searchProducts);
    // Gắn sự kiện click lên thẻ cha chứa các nút (Event Delegation)
    document.getElementById('categoryFilters').addEventListener('click', filterByCategory);
    document.getElementById('sortSelect').addEventListener('change', sortProducts);
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

    // Gọi hàm render để vẽ danh sách sản phẩm ra màn hình lần đầu tiên
    renderProducts(currentProducts);
}

// === 3. CÁC HÀM XỬ LÝ CHÍNH (Core Functions) ===

// Hàm Render (Vẽ) danh sách sản phẩm
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Làm sạch lưới sản phẩm cũ trước khi vẽ lưới mới

    // TỐI ƯU HIỆU NĂNG: Tạo DocumentFragment.
    // Đây là một dạng "DOM ảo" nằm trong RAM. Ta sẽ nhét tất cả thẻ HTML vào đây trước,
    // sau đó chèn 1 lần duy nhất vào lưới (grid) thật để trình duyệt không bị giật (tránh reflow nhiều lần).
    const fragment = document.createDocumentFragment();

    items.forEach(product => {
        // TẠO DOM THỦ CÔNG: An toàn tuyệt đối, dùng để render dữ liệu động
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Nhấn vào bất kỳ đâu trên thẻ card cũng sẽ mở Modal chi tiết
        card.addEventListener('click', () => openModal(product));

        // Tạo thẻ ảnh
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        // Tạo thẻ tiêu đề
        const title = document.createElement('h3');
        title.textContent = product.name;

        // Tạo thẻ giá
        const price = document.createElement('p');
        price.className = 'price';
        // toLocaleString() giúp hiển thị số tiền có dấu phẩy (vd: 25,990,000)
        price.textContent = `${product.price.toLocaleString()} VNĐ`;

        // Tạo thẻ đánh giá
        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.textContent = `${product.rating} ⭐`;

        // Tạo nút "Thêm vào giỏ"
        const btn = document.createElement('button');
        btn.textContent = product.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !product.inStock; // Vô hiệu hóa nút nếu hết hàng
        if(!product.inStock) btn.style.backgroundColor = 'gray';
        
        // QUAN TRỌNG: Ngăn chặn sủi bọt sự kiện (Event Bubbling).
        // Vì thẻ card đã có sự kiện click để mở Modal. Nếu không có dòng này, 
        // khi ta click "Thêm vào giỏ", Modal cũng sẽ bị bật lên theo.
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Dừng sự kiện lại tại đây, không cho lan lên thẻ cha (card)
            addToCart();
        });

        // Gắn (Append) tất cả các thẻ con vào trong thẻ card cha
        card.append(img, title, price, rating, btn);
        // Gắn thẻ card vào DOM ảo (fragment)
        fragment.appendChild(card);
    });

    // Cuối cùng, gắn toàn bộ DOM ảo vào HTML thật trên giao diện
    grid.appendChild(fragment);
}

// Hàm Tìm kiếm sản phẩm
function searchProducts(e) {
    // Lấy từ khóa người dùng gõ, chuyển thành chữ thường và xóa khoảng trắng thừa ở 2 đầu
    const keyword = e.target.value.toLowerCase().trim();
    
    // Lọc mảng: Giữ lại những sản phẩm mà tên của nó có chứa từ khóa
    currentProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    
    // Reset ô sắp xếp về mặc định để tránh lỗi logic UX
    document.getElementById('sortSelect').value = 'default';
    
    // Vẽ lại giao diện với danh sách mới
    renderProducts(currentProducts);
}

// Hàm Lọc theo Category (Danh mục)
function filterByCategory(e) {
    // Nếu click ra ngoài vùng nút (nhưng vẫn nằm trong div) thì bỏ qua
    if (e.target.tagName !== 'BUTTON') return;
    
    // 1. Cập nhật giao diện của các nút (xóa class 'active' cũ, thêm vào nút mới click)
    const buttons = document.querySelectorAll('.category-filters button');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // 2. Lấy tên danh mục từ thuộc tính data-cat (vd: data-cat="phone" -> lấy chữ 'phone')
    const category = e.target.dataset.cat;
    
    // 3. Tiến hành lọc mảng
    if (category === 'all') {
        currentProducts = [...products]; // Nếu chọn Tất cả thì copy lại mảng gốc
    } else {
        currentProducts = products.filter(p => p.category === category);
    }
    
    // Dọn dẹp các bộ lọc khác
    document.getElementById('searchInput').value = ''; 
    document.getElementById('sortSelect').value = 'default'; 
    
    renderProducts(currentProducts);
}

// Hàm Sắp xếp sản phẩm
function sortProducts(e) {
    const sortType = e.target.value; // Lấy giá trị từ thẻ <select>
    
    // Hàm sort() sẽ làm thay đổi trực tiếp mảng hiện tại.
    // Nó lấy 2 phần tử (a và b) ra so sánh. Nếu kết quả < 0 thì a đứng trước, > 0 thì b đứng trước.
    switch(sortType) {
        case 'priceAsc': // Giá tăng dần
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc': // Giá giảm dần
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'nameAZ': // Tên A-Z
            // localeCompare dùng để so sánh chuỗi chữ cái theo chuẩn ngôn ngữ
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'ratingDesc': // Đánh giá cao nhất xếp trước
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Khôi phục sắp xếp mặc định theo ID
            currentProducts.sort((a, b) => a.id - b.id);
    }
    renderProducts(currentProducts);
}

// === 4. CÁC TÍNH NĂNG TƯƠNG TÁC KHÁC ===

// Thêm vào giỏ hàng
function addToCart() {
    cartCount++;
    const badge = document.getElementById('cartBadge');
    badge.textContent = cartCount; // Cập nhật số
    
    // Tạo hiệu ứng giật nảy nhẹ khi bấm thêm đồ (bằng CSS Inline)
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

// Mở Modal chi tiết sản phẩm
function openModal(product) {
    // 1. Tạo một lớp phủ (overlay) đen mờ bao trùm toàn bộ màn hình
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // 2. Tạo nội dung modal ở giữa
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    // Đổ nội dung vào modal (dùng innerHTML cho nhanh vì đây không phải mảng động)
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

    // 3. Xử lý đóng Modal
    // Nút X (close)
    content.querySelector('.close-modal').addEventListener('click', () => overlay.remove());
    // Nhấp vào nền đen (overlay) bên ngoài cũng sẽ đóng modal
    overlay.addEventListener('click', (e) => {
        // e.target là phần tử bị click. Chỉ xóa khi người dùng click đúng vào nền đen, không phải nội dung bên trong
        if(e.target === overlay) overlay.remove();
    });

    // 4. Nhét nội dung vào lớp phủ, rồi nhét lớp phủ vào body
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}

// Bật/tắt chế độ tối (Dark Mode)
function toggleDarkMode() {
    // classList.toggle sẽ tự kiểm tra: Nếu thẻ body chưa có class 'dark-mode' thì thêm vào, nếu có rồi thì gỡ ra.
    // Nó trả về true (nếu vừa thêm) hoặc false (nếu vừa gỡ).
    const isDark = document.body.classList.toggle('dark-mode');
    
    // Đổi chữ của nút bấm cho phù hợp với chế độ
    const btn = document.getElementById('themeToggle');
    btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// BẮT ĐẦU CHẠY ỨNG DỤNG
initApp();