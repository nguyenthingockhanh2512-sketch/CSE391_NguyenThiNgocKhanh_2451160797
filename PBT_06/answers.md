# GIẢI QUYẾT PHIẾU BÀI TẬP 06 - TRACK A (BOOTSTRAP 5)

## PHẦN A — ĐỌC HIỂU

### Câu A1 — Grid System

**Bảng phân tích Layout:**

| Kích thước màn hình | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|---------------------|------------------|------------------------|-------------------|
| **Số cột hiển thị** | 1 cột            | 2 cột                  | 4 cột             |
| **Box layout**      | Box xếp dọc      | Box xếp thành 2 hàng   | 4 Box nằm ngang   |

**Câu hỏi thêm:**
- `col-md-6` nghĩa là gì? Ở kích thước màn hình Medium (`md`, ≥ 768px), thẻ div này sẽ chiếm 6 phần (tương đương 50% chiều rộng của lưới 12 cột).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap áp dụng triết lý **Mobile-First**. Class `col-12` (mặc định cho màn hình nhỏ nhất) sẽ áp dụng cho toàn bộ các màn hình từ 0px trở lên. Nó chỉ bị ghi đè khi gặp breakpoint lớn hơn (ở đây là `md`). Do đó, màn hình `sm` vẫn tự động kế thừa `col-12` mà không cần viết tường minh.

### Câu A2 — Utilities & Components

1. **Giải thích class `d-none d-md-block`:**
   - `d-none`: Ẩn element (display: none) mặc định trên mọi thiết bị (Mobile-First).
   - `d-md-block`: Bật lại thành block (display: block) khi màn hình đạt kích thước Medium (≥ 768px).
   => **Kết luận:** Element này sẽ bị ẩn trên điện thoại di động và chỉ hiển thị trên máy tính bảng hoặc desktop.

2. **5 Spacing Utilities thường dùng:**
   - `mt-3`: margin-top kích thước mức 3 (thường là 16px).
   - `px-4`: padding-left và padding-right (trục X) mức 4 (thường là 24px).
   - `mb-auto`: margin-bottom được set thành auto (rất hữu ích trong flexbox để đẩy các phần tử xuống đáy).
   - `pt-5`: padding-top mức lớn nhất (mức 5, thường là 48px).
   - `mx-auto`: margin-left và margin-right tự động, dùng để căn giữa block element theo chiều ngang.

3. **Sự khác nhau giữa các loại Container:**
   - `.container`: Có chiều rộng cố định (fixed max-width) thay đổi theo từng breakpoint. Luôn được căn giữa và có khoảng hở 2 bên.
   - `.container-fluid`: Luôn luôn chiếm 100% chiều rộng màn hình bất kể thiết bị nào.
   - `.container-md`: Tràn viền (100%) trên thiết bị di động, nhưng khi đạt đến breakpoint `md` (≥ 768px) thì bắt đầu có chiều rộng cố định và khoảng hở 2 bên.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Tùy biến Bootstrap

1. **Quy trình đổi màu `$primary` thành `#E63946`:**
   - **Công cụ cần thiết:** Bộ biên dịch SASS/SCSS (như Node-sass hoặc Live Sass Compiler).
   - **Quy trình:** 
     1. Tải source code của Bootstrap (phiên bản SASS) về project.
     2. Tạo một file `custom.scss` riêng.
     3. Khai báo đè biến: `$primary: #E63946;` ở ngay ĐẦU file.
     4. Import file Bootstrap gốc ở phía sau: `@import "node_modules/bootstrap/scss/bootstrap";`
     5. Biên dịch file `custom.scss` thành `style.css` để sử dụng.

2. **Tại sao KHÔNG NÊN override `.btn-primary` bằng CSS thuần?**
   - Nếu bạn viết `.btn-primary { background: red; }`, nút bấm sẽ đổi màu, nhưng khi hover, focus, hoặc active, màu cũ của Bootstrap vẫn xuất hiện. Bạn sẽ phải viết đè rất nhiều state.
   - Ngoài ra, màu primary còn được dùng ở các class khác như `text-primary`, `bg-primary`, `border-primary`, v.v. Nếu chỉ sửa bằng CSS thuần, giao diện sẽ thiếu tính đồng bộ. Dùng biến SASS sẽ cập nhật hàng loạt trên toàn bộ hệ thống chỉ với 1 dòng code.

### Câu C2 — So sánh Bootstrap và CSS thuần

| Tiêu chí | CSS Thuần (PBT 05) | Bootstrap 5 |
|----------|--------------------|-------------|
| **Số dòng CSS** | Khoảng 100-150 dòng (phải tự tính breakpoints, flex, hover). | **0 dòng CSS.** Hoàn toàn dùng HTML class. |
| **Thời gian phát triển**| Mất nhiều thời gian để canh chỉnh pixel, test responsive. | Cực nhanh, layout được dựng xong trong vài phút. |
| **Khả năng tùy biến** | Cao tuyệt đối. 100% tự do thiết kế. | Thấp hơn, dễ bị "đụng hàng" giao diện nếu không thạo SASS. |

**Khi nào NÊN dùng Bootstrap?** 
- Khi làm Admin Dashboard, hệ thống quản trị (như dự án SmartBudget), trang web nội bộ, hoặc dự án cần ra mắt cực kỳ nhanh mà không có designer riêng.

**Khi nào KHÔNG NÊN dùng?**
- Khi thiết kế Landing page sáng tạo, cần animation bay bổng, hoặc khi dự án có UI/UX thiết kế theo phong cách cực kỳ đặc thù, khác xa với tư duy dạng "hộp" (box-model) mặc định của Bootstrap.