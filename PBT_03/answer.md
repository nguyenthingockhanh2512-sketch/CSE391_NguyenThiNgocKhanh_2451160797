CÂU 1: 3 CÁCH NHÚNG CSS

Tài liệu tham chiếu: chương 08
**Cách 1: Inline CSS**
    ví dụ: <p style="color: red;">Đoạn văn này màu đỏ</p>
    ưu điểm: nhanh chóng
    nhược điểm: Khó quản lý, không tái sử dụng được
    khi nào nên dùng:khi muốn test nhanh hoặc áp dụng 1 style duy nhất cho 1 phần tử

**Cách 2: Internal CSS**
    ví dụ: 
    <head>
        <style>
            p { color: red; }
        </style>
    </head>
    ưu điểm: quản lý style của trang web ở 1 trang duy nhất, không cần tạo file riêng
    nhược điểm: chỉ có tác dụng trong trang đó, nếu web có nhiều trang thì phải copy nhiều lần
    khi nào nên dùng: dùng khi làm web chỉ có 1 trang

**Cách 3: Exteernal CSS**
    ví dụ:
    <head>
        <link rel="stylesheet" href="styles.css">
    </head> 
    ưu điểm: dễ dàng quản lý toàn bộ, tách phần CSS và HTML riêng biệt
    nhược điểm: trình duyệt cần thêm 1 yêu cầu tải file từ CSS về
    khi nào nên dùng: đây là tiêu chuẩn cho mọi dự án thực tế.

**Cách nào thắng?**
    Nếu cùng một phần tử chịu tác động của cả 3 cách trên, kết quả như sau:

    1.  **Vị trí quán quân:** **Inline CSS** sẽ "thắng" (được áp dụng).
    2.  **Vị trí tiếp theo:** **Internal** và **External** CSS. Giữa hai loại này, cái nào **được viết sau** trong mã nguồn (gần thẻ đóng `</head>` hơn) sẽ thắng.

**Giải thích:**
    Trình duyệt ưu tiên dựa trên quy tắc Độ cụ thể (Specificity) và Thứ tự xuất hiện (Cascading):
    *   **Inline CSS** có độ cụ thể cao nhất vì nó gắn chặt vào phần tử.
    *   **Internal và External** được coi là ngang hàng về cấp độ. Do đó, trình duyệt sẽ đọc từ trên xuống dưới; thuộc tính nào được khai báo sau cùng sẽ ghi đè lên các thuộc tính đã khai báo trước đó.

CÂU A2:CSS SELECTORS - DỰ ĐOÁN KẾT QUẢ
    
    1. h1                           → Chọn: Shop TLU
    2. .price                       → Chọn: 25.990.000đ và 45.990.000đ
    3. #app header                  → Chọn: Cả khối nội dung bên trong thẻ <header> (bao gồm ShopTLU, Home, Products, About).
    4. nav a:first-child            → Chọn: Home
    5. .product.featured h2         → Chọn: MacBook Pro
    6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
    7. a[href="/"]                  → Chọn: Home
    8. .top-bar.dark h1             → Chọn: Shop TLU

CÂU A3: BOX MODEL - TÍNH TOÁN KÍCH THƯỚC
Tài liệu tham chiếu: chương 11(Box Model)

    /* Trường hợp 1: content-box (mặc định) */
    .box-1 {
        width: 400px;
        padding: 20px;
        border: 5px solid black;
        margin: 10px;
    }
    → Chiều rộng hiển thị = 400+ 20x2 + 5x2 = 450px
    → Không gian chiếm trên trang = 450 + 10x2 = 470px

    /* Trường hợp 2: border-box */
    .box-2 {
        box-sizing: border-box;
        width: 400px;
        padding: 20px;
        border: 5px solid black;
        margin: 10px;
    }
    → Chiều rộng hiển thị = 400px
    → Kích thước content thực tế = 400px - 40px - 10px = 350px
    → Không gian chiếm trên trang = 400 + 10x2 = 420px

    /* Trường hợp 3: Margin collapse */
    .box-a { margin-bottom: 25px; }
    .box-b { margin-top: 40px; }
    → Khoảng cách giữa box-a và box-b = 40px
    → Giải thích tại sao KHÔNG PHẢI 65px: Theo qtac collapse, khi 2 margin chạm nhau->lấy cái lớn hơn

**Nâng cao**: khi .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = 40 +(-10) = 30px

CÂU 4: SPECIFICITY (ĐỘ ƯU TIÊN)

p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */

1.
    Rule    Selector    ID      Class      Element      Score
    RuleA       p       0        0           1          (0, 0, 1)
    Rule B  .price      0        1           0          (0, 1, 0)
    Rule C  #main-price 1        0           0          (1, 0, 0)
    Rule D  p.price     0        1           1          (0, 1, 1)

2. Element sẽ có màu gì? Giải thích
    Kết quả: Element sẽ có màu Đỏ (red).

    Giải thích: Trình duyệt sẽ so sánh điểm specificity từ trái sang phải.

    Rule C có 1 điểm ở cột ID, trong khi tất cả các rule khác đều có 0 điểm ở cột này.

    Vì (1, 0, 0) > (0, 1, 1) > (0, 1, 0) > (0, 0, 1)--> nên Rule C thắng .

3. Nếu thêm Inline Style, element có màu gì?
    Kết quả: Element sẽ có màu Cam (orange).

    Giải thích: Inline Style (viết trực tiếp trong thuộc tính style của thẻ HTML) có độ ưu tiên cao hơn tất cả các selector trong file CSS bên ngoài hoặc thẻ <style>. Nó có thể được coi là có điểm số (1, 0, 0, 0) trong hệ thống 4 chữ số.

4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
    Kết quả: Element sẽ có màu Đen (black).

    Giải thích: Từ khóa !important không nằm trong thang điểm Specificity thông thường. Nó là một "lệnh ghi đè khẩn cấp". Khi một thuộc tính được đánh dấu !important, nó sẽ phá vỡ mọi quy tắc về ID hay Inline Style để trở thành thuộc tính có độ ưu tiên cao nhất.

CÂU 1B: 
1. Universal Selector (Selector tổng thể)
    Ký hiệu: *

    Vị trí trong code: Dòng đầu tiên.

    Mục đích: Chọn tất cả các phần tử trên trang để thiết lập box-sizing: border-box và xóa bỏ margin, padding mặc định của trình duyệt.

2. Element Selector (Selector thẻ)
    Ký hiệu: body, header, main, img, table, footer...

    Vị trí trong code: Xuất hiện xuyên suốt bài.

    Mục đích: Định dạng trực tiếp vào các thẻ HTML cơ bản (ví dụ: thẻ main được đặt màu nền trắng và căn giữa).

3. ID Selector (Selector định danh)
    Ký hiệu: #contact

    Vị trí trong code: dòng 67.

    Mục đích: Định dạng riêng biệt cho khối liên hệ.

4. Descendant Selector (Selector hậu duệ)
    Ký hiệu: nav ul, nav ul li, nav ul li a, table th

    Vị trí trong code: Phần NAVIGATION và TABLE.

    Mục đích: Chỉ định chính xác các phần tử con nằm trong phần tử cha (ví dụ: nav ul li a chỉ chọn các liên kết nằm trong menu điều hướng chứ không chọn các liên kết khác ngoài trang).

5. Pseudo-class Selector (Selector giả lập trạng thái)
    Ký hiệu: :hover và :nth-child(even)

    Vị trí trong code: Phần navigation và định dạng hàng của bảng.

    Mục đích: * :hover: Tạo hiệu ứng đổi màu khi di chuột vào liên kết hoặc bảng.

                :nth-child(even): Tự động chọn các hàng chẵn trong bảng để tô màu nền khác đi

BÀI 2B: BOX MODEL LAB
    Hộp 1 (content-box): chiều rộng thực tế = 350 px (đo từ DevTools)
    Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)

Giải thích sự khác biệt:

    Với content-box (mặc định), thuộc tính width chỉ áp dụng cho phần nội dung bên trong. Padding và Border được cộng thêm vào ngoài, làm hộp to ra so với dự kiến ban đầu.

    Với border-box, thuộc tính width là kích thước tổng thể cuối cùng của hộp. Trình duyệt tự động trừ đi phần padding và border để tính ra không gian còn lại cho nội dung. Cách này giúp lập trình viên kiểm soát layout chính xác hơn.