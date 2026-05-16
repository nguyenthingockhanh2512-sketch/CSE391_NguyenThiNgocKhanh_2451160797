## 📑 PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

#### Bảng so sánh các thuộc tính `position`

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                          | Cuộn theo trang? | Use case điển hình                                                                              |
| `static`   | **Có**                    |Theo luồng tự nhiên của văn bản             | Có               | Element thông thường, không cần chỉnh vị trí đặc biệt.                                          |
| `relative` | **Có**                    |Vị trí ban đầu của chính nó                 | Có               | Làm gốc tọa độ cho phần tử con dùng `absolute`; dịch chuyển nhẹ mà không lỗi layout xung quanh. |
| `absolute` | **Không**                 |Gốc tọa độ gần nhất có position khác static | Có               | Làm Badge (HOT, New), icon close trêpopupdropdown menu.                                         |
| `fixed`    | **Không**                 | **Viewport** (Khung hình trình duyệt)      | Không            | Header dính đỉnh trang, nút "Scroll to top", nút Chat hỗ trợ.                                   |
| `sticky`   | **Có**                    | Luồng tự nhiên + Viewport                  | Có               | Thanh danh mục sản phẩm (Sidebar), tiêu đề bảng (`<th>`) giữ lại khi cuộn.                      |

#### Trả lời câu hỏi mở rộng:
* **Khi nào `absolute` tham chiếu `body`?** 
  Khi tất cả các thẻ cha/tổ tiên bọc ngoài nó đều có `position: static` (mặc định) hoặc không khai báo thuộc tính `position`. Lúc này, nó sẽ tìm ngược lên tận cùng và lấy thẻ `<body>` (hoặc chính xác là *initial containing block*) làm mốc tọa độ.
* **Khi nào `absolute` tham chiếu parent?** 
  Khi thẻ cha trực tiếp (hoặc một thẻ tổ tiên bất kỳ bọc ngoài nó) được cấu hình thuộc tính `position` khác `static` (thường dùng nhất là áp dụng `position: relative` cho thẻ cha).
* **Khái niệm "Nearest positioned ancestor":** 
  Nghĩa là *"Tổ tiên gần nhất có định vị"*. Trình duyệt sẽ duyệt ngược từ phần tử hiện tại lên các thẻ cha bọc ngoài. Thẻ nào **đầu tiên** có thuộc tính `position` mang giá trị khác `static` (`relative`, `absolute`, `fixed`, hoặc `sticky`) sẽ lập tức được chọn làm mốc tọa độ gốc `(top: 0, left: 0)` cho phần tử `absolute` con.

---

### Câu A2 — Flexbox vs Grid (Dự đoán Layout)

#### Trường hợp 1: `flex: 1` cho cả 4 items
* **Dự đoán:** 4 items nằm trên **1 hàng duy nhất**. Do có thuộc tính `flex: 1`, cả 4 items sẽ tự động co giãn và chia đều 100% không gian của container, mỗi item chiếm chính xác **25% chiều rộng**.
* **Sơ đồ bố cục:**
```text
┌───────────────────────────────────────────────────────────────────────┐
│ [ Item 1 (25%) ]  [ Item 2 (25%) ]  [ Item 3 (25%) ]  [ Item 4 (25%) ] │
└───────────────────────────────────────────────────────────────────────┘