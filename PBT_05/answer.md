
## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First
1. **Thẻ viewport chuẩn:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
```
   - `width=device-width`: Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị.
   - `initial-scale=1.0`: Đặt mức độ thu phóng ban đầu là 100% khi trang tải lần đầu.

2. **Nếu THIẾU thẻ này:** Trình duyệt trên mobile sẽ giả định trang web thiết kế cho desktop (rộng ~980px) và tự động thu nhỏ toàn bộ trang lại để nhét vừa màn hình. Chữ và nút bấm sẽ cực kỳ nhỏ, người dùng phải zoom lên mới đọc/bấm được.

3. **Mobile-First vs Desktop-First:**
   - **Mobile-First (Khuyên dùng):** Viết CSS mặc định cho màn hình nhỏ trước, sau đó dùng `@media (min-width)` để nới rộng cho màn hình lớn. Giúp tối ưu hiệu suất tải cho mobile.
   - **Desktop-First:** Viết CSS cho màn hình lớn trước, dùng `@media (max-width)` để bóp nhỏ cho mobile.

   **Ví dụ CSS:**
   ```css
   /* === Mobile-First === */
   .box { width: 100%; } /* Mặc định là mobile */
   @media (min-width: 768px) { 
       .box { width: 50%; } /* Lên tablet/desktop chia đôi */
   }

   /* === Desktop-First === */
   .box { width: 50%; } /* Mặc định là desktop */
   @media (max-width: 767px) { 
       .box { width: 100%; } /* Xuống mobile full màn */
   }
   
```

### Câu A2 — Breakpoints (Chuẩn Bootstrap 5)

| Kích thước | Thiết bị đại diện | Cột hiển thị (Ví dụ) |
|------------|-------------------|----------------------|
| `< 576px`  | iPhone / Mobile dọc | 1 cột |
| `≥ 576px`  | Mobile ngang / Tablet nhỏ | 2 cột |
| `≥ 768px`  | iPad / Tablet | 3 cột |
| `≥ 992px`  | Laptop | 4 cột |
| `≥ 1200px` | PC / Màn hình lớn | 4-6 cột |

**Ví dụ CSS chia cột Grid theo Breakpoints:**
```css
/* Mobile (Mặc định): 1 cột */
.product-grid { display: grid; grid-template-columns: 1fr; }

/* Tablet nhỏ: 2 cột */
@media (min-width: 576px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }

/* Tablet: 3 cột */
@media (min-width: 768px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

/* Desktop: 4 cột */
@media (min-width: 992px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }
```

### Câu A3 — Media Queries

Dựa vào đoạn code CSS được cho, `.container` áp dụng cơ chế **Mobile-First**.

| Chiều rộng màn hình | `.container` width | Giải thích mã code áp dụng |
|---------------------|--------------------|----------------------------|
| 375px (iPhone SE)   | **100%**           | Dùng CSS mặc định ở dòng đầu tiên. |
| 600px               | **540px**          | Khớp `@media (min-width: 576px)`. |
| 800px               | **720px**          | Khớp `@media (min-width: 768px)` (Ghi đè giá trị của 576px). |
| 1000px              | **960px**          | Khớp `@media (min-width: 992px)`. |
| 1400px              | **1140px**         | Khớp `@media (min-width: 1200px)`. |

### Câu A4 — SCSS Basics

**1. Variables (Biến):** Lưu trữ các giá trị tái sử dụng.
```scss
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

**2. Nesting (Lồng nhau):** Cấu trúc CSS lồng theo DOM HTML, giúp code sạch sẽ hơn.
```scss
nav {
  background: #333;
  ul { margin: 0; padding: 0; }
  li { display: inline-block; }
  a {
    color: white;
    &:hover { color: #3498db; } // Dấu & thay thế cho selector cha (a)
  }
}
```

**3. Mixins:** Đóng gói các đoạn code để dùng lại nhiều lần (như function).
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center;
  width: 100px;
}
```

**4. @extend (Kế thừa):** Dùng chung một bộ thuộc tính cho nhiều class khác nhau.
```scss
.btn {
  padding: 10px 20px;
  border: none;
}

.btn-danger {
  @extend .btn; // Lấy toàn bộ thuộc tính của .btn
  background-color: red;
}
```

**Tại sao trình duyệt KHÔNG đọc được `.scss`?**
Trình duyệt chỉ được thiết kế để phân tích cú pháp CSS thuần túy. 
**Bước xử lý:** Cần phải **Compile (Biên dịch)**. Sử dụng Node-sass, Dart-sass, hoặc extension "Live Sass Compiler" trong VS Code để dịch file `.scss` thành file `.css` trước khi nhúng vào thẻ `<link>` trong HTML.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực (Ví dụ: Shopee)
*(Ghi chú: Đã đính kèm hình ảnh screenshot vào thư mục `screenshots/`)*

1. **Phân tích giao diện 3 kích thước:**
   - **Navigation:**
     - Mobile: Menu dạng hamburger, thanh tìm kiếm tối giản chiếm trọn chiều ngang.
     - Desktop: Có thanh menu phụ phía trên, logo to, thanh tìm kiếm lớn ở giữa và giỏ hàng bên phải.
   - **Lưới content (Flash sale / Gợi ý):**
     - Mobile (375px): 2 cột.
     - Tablet (768px): 4 cột.
     - Desktop (1440px): 6 cột.
   - **Elements bị ẩn trên Mobile:** Banner quảng cáo phụ hai bên, text dài trong menu danh mục, các nút chức năng phụ trợ.
   - **Font size:** Trên mobile nhỏ hơn để tiết kiệm không gian, padding các thẻ card cũng được thu gọn lại.

2. **Media Queries (Trích xuất từ DevTools):**
```css
/* Đoạn code Shopee ẩn banner 2 bên khi màn hình nhỏ hơn 1200px */
@media (max-width: 1200px) {
    .full-home-banners { display: none !important; }
}

/* Đoạn code Shopee chia 2 cột sản phẩm trên thiết bị di động */
@media (max-width: 768px) {
    .shopee-search-item-result__item { 
        width: 50%; /* 2 cột */
        padding: 0.125rem;
    }
}
```

### Câu C2 — Thiết kế Responsive Strategy (Trang Đặt Bàn)

**1. Wireframe Logic:**
- **Mobile (< 768px):** 
  - Header: Logo trái, Hamburger menu phải. Số điện thoại bị ẩn vào trong menu.
  - Form đặt bàn: Nằm dọc (1 cột field). Nằm ngay dưới Hero Image.
  - Bản đồ Google Maps: Đặt ở dưới cùng sát Footer.
- **Tablet (768px - 1023px):** 
  - Header: Logo trái, Nút gọi điện nằm ngay trên Header.
  - Grid ảnh món ăn: 2 hoặc 3 cột.
  - Form đặt bàn: Chia 2 cột dọc (ví dụ: Tên và SDT nằm cùng 1 hàng).
- **Desktop (≥ 1024px):** 
  - Header: Menu ngang trải dài.
  - Lưới content: Layout chính chia 2 phần. Cột trái (60%) chứa Form đặt bàn, cột phải (40%) chứa Google Maps để khách tiện xem đường.

**2. CSS Skeleton (Grid + Mobile-First):**
```css
/* === Bố cục mặc định cho Mobile === */
.main-reservation {
    display: grid;
    grid-template-columns: 1fr; /* Form và Map nằm chồng lên nhau */
    gap: 20px;
}
.food-gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 cột ảnh trên mobile */
    gap: 10px;
}
.header-phone { display: none; } /* Ẩn sdt trên mobile header */

/* === Bố cục cho Tablet === */
@media (min-width: 768px) {
    .food-gallery {
        grid-template-columns: repeat(3, 1fr); /* 3 cột ảnh */
    }
    .header-phone { display: block; }
}

/* === Bố cục cho Desktop === */
@media (min-width: 1024px) {
    .main-reservation {
        /* Chia 2 cột: 60% cho Form, 40% cho Map */
        grid-template-columns: 6fr 4fr; 
        align-items: start;
    }
    .food-gallery {
        grid-template-columns: repeat(6, 1fr); /* Đủ 6 ảnh trải dài */
    }
}
```