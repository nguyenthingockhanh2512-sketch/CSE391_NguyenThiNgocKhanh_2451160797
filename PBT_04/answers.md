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

Trường hợp 2: flex-wrap: wrap với width: 45%; margin: 2.5% (6 items)
Dự đoán: Bố cục chia thành 3 hàng, mỗi hàng có 2 cột. Mỗi item chiếm 45% width + (2 * 2.5% margin) = 50% không gian chiều ngang. Do đó, một hàng vừa vặn chứa 2 items (tổng 100%). Nhờ flex-wrap: wrap, các item thứ 3, 4, 5, 6 tự động rớt xuống hàng mới.

Sơ đồ bố cục:
┌───────────────────────────────────────────────────────────┐
│    [ Item 1 (45%) ]             [ Item 2 (45%) ]          │
│    [ Item 3 (45%) ]             [ Item 4 (45%) ]          │
│    [ Item 5 (45%) ]             [ Item 6 (45%) ]          │
└───────────────────────────────────────────────────────────┘
Trường hợp 3: justify-content: space-between; align-items: center (3 items)
Dự đoán: 3 items nằm trên 1 hàng ngang và được căn giữa theo chiều dọc (nhờ align-items: center). Về chiều ngang, Item 1 bám sát lề trái, Item 3 bám sát lề phải, Item 2 nằm chính giữa vùng không gian trống (nhờ justify-content: space-between).

Sơ đồ bố cục:
┌───────────────────────────────────────────────────────────┐
│ [Item 1]               [Item 2]                  [Item 3] │
└───────────────────────────────────────────────────────────┘
Trường hợp 4: grid-template-columns: 200px 1fr 200px (3 items)
Dự đoán: Cấu trúc lưới gồm 1 hàng, 3 cột. Cột trái cố định 200px, cột phải cố định 200px. Cột giữa (1fr) sẽ tự động co giãn linh hoạt để chiếm toàn bộ phần diện tích còn dư lại của container (sau khi đã trừ đi 400px của 2 cột bên và khoảng cách gap).

Sơ đồ bố cục:

Plaintext
┌───────────────────────────────────────────────────────────┐
│ [Item 1 (200px)]   [Item 2 (1fr - Co giãn)]   [Item 3 (200px)]│
└───────────────────────────────────────────────────────────┘
Trường hợp 5: grid-template-columns: repeat(3, 1fr) (7 items)
Dự đoán: Lưới được chia thành 3 cột bằng nhau. 7 items sẽ được xếp tự động từ trái qua phải, từ trên xuống dưới, tạo thành 3 hàng. Hàng 1 và 2 đầy đủ (mỗi hàng 3 items). Hàng thứ 3 chỉ có 1 item (Item 7) nằm ở góc dưới cùng bên trái, 2 ô còn lại bị bỏ trống.

Sơ đồ bố cục:

Plaintext
┌───────────────────────────────────────────────────────────┐
│ [ Item 1 ]          [ Item 2 ]          [ Item 3 ]        │
│ [ Item 4 ]          [ Item 5 ]          [ Item 6 ]        │
│ [ Item 7 ]          [ Trống  ]          [ Trống  ]        │
└───────────────────────────────────────────────────────────┘


 PHẦN C — SUY LUẬN (20 điểm)
Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?
Navigation bar ngang (logo + menu + buttons)

Nên dùng: Flexbox

Giải thích: Đây là bố cục 1 chiều (chỉ chạy dọc theo trục ngang). Flexbox rất mạnh trong việc phân bổ không gian (justify-content) và căn dọc các phần tử có text/icon khác chiều cao (align-items: center).

Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

Nên dùng: Grid

Giải thích: Đây là bố cục 2 chiều đòi hỏi sự đồng bộ chặt chẽ giữa các hàng và cột. grid-template-columns: repeat(3, 1fr) đảm bảo lưới luôn cố định 3 cột đều nhau, ảnh mới được thêm vào sẽ tự động rớt dòng xếp ô rất hoàn hảo.

Layout blog: main content + sidebar

Nên dùng: Grid (cho khung layout tổng thể - Macro layout)

Giải thích: Việc chia bố cục vĩ mô của trang web cực kỳ dễ dàng khi gán cột tĩnh cho sidebar và cột động cho phần nội dung (VD: grid-template-columns: 1fr 300px). Quản lý responsive cũng gọn gàng hơn.

Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)

Nên dùng: Grid (Flexbox vẫn làm được nhưng Grid ưu việt hơn)

Giải thích: Chỉ cần khai báo grid-template-columns: repeat(4, 1fr) là chia 4 cột đều tăm tắp, không cần phải set width: 25% thủ công cho từng cột như khi dùng Flexbox.

Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

Nên dùng: Flexbox (kết hợp flex-direction: column)

Giải thích: Dùng để xử lý bố cục 1 chiều theo trục dọc bên trong thẻ card. Flexbox cho phép dễ dàng ép nút bấm dính chặt xuống đáy card bằng cách khai báo margin-top: auto cho nút đó.

Câu C2 (10đ) — Debug Flexbox
Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
Nguyên nhân: Các card nằm cùng một hàng có thể cao bằng nhau nhờ cơ chế của flex, nhưng vì độ dài text tiêu đề bên trong khác nhau nên khối tĩnh bên trong chiếm chỗ làm nút bị lệch.

Cách sửa: Biến chính phần tử .card thành một Flex container theo chiều dọc, sau đó dùng margin-top: auto để đẩy nút xuống bám đáy.

Code sửa:

CSS
.card-container { display: flex; flex-wrap: wrap; }
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex; /* Kích hoạt Flexbox nội bộ */
    flex-direction: column; /* Đổi thành trục dọc */
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto; /* Lực đẩy nút xuống sát đáy */
}
Lỗi 2: Muốn items nằm giữa ngang lẫn dọc trong 100vh, nhưng vẫn dính góc
Nguyên nhân: Thuộc tính text-align: center chỉ có tác dụng căn giữa văn bản (inline) theo trục ngang. Container mẹ .hero đã bật display: flex nhưng lại thiếu các thuộc tính điều hướng căn chỉnh flex item.

Cách sửa: Khai báo cụ thể hướng căn giữa cho cả 2 trục trên thẻ cha .hero.

Code sửa:

CSS
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; /* Căn giữa theo trục ngang */
    align-items: center;     /* Căn giữa theo trục dọc */
}
.hero-content {
    text-align: center;      /* Giữ lại để text bên trong không bị lệch trái */
}
Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân: Flexbox có một thuộc tính ngầm định là flex-shrink: 1, cho phép các phần tử tự co bóp lại khi không gian container bị chật. Khi .content có quá nhiều dữ liệu phình to ra, trình duyệt sẽ tự động bóp nhỏ .sidebar lại để bù trừ.

Cách sửa: Khóa kích thước của sidebar, cấm trình duyệt co bóp nó trong mọi tình huống.

Code sửa:

CSS
.layout { display: flex; }
.sidebar { 
    width: 250px; 
    flex-shrink: 0; /* Ngăn chặn trình duyệt bóp méo sidebar */
}
.content { flex: 1; }