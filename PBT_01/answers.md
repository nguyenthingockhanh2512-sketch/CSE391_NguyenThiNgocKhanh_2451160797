**# PHẦN A — KIỂM TRA ĐỌC HIỂU**



**Câu A1 — HTTP \& Browser**

Nguồn tham chiếu: 01\_introduction\_html\_universe.md



&#x20;       **1. 5 bước xảy ra khi gõ https://shopee.vn và nhấn Enter:**

&#x09;1. DNS Lookup (Tra cứu DNS): Trình duyệt gửi yêu cầu đến máy chủ DNS để tìm địa chỉ IP của tên miền `shopee.vn`.

&#x09;2. TCP Handshake: Sau khi có IP, trình duyệt thiết lập kết nối TCP với máy chủ thông qua quy trình bắt tay 3 bước để đảm bảo đường truyền ổn định.

&#x09;3. TLS/SSL Handshake: Vì là giao thức HTTPS, trình duyệt và máy chủ thực hiện trao đổi chứng chỉ bảo mật và khóa mã hóa để bảo vệ dữ liệu.

&#x09;4. HTTP Request: Trình duyệt gửi một yêu cầu HTTP GET đến máy chủ để yêu cầu nội dung trang web (file HTML).

&#x09;5. HTTP Response \& Render:Máy chủ phản hồi bằng cách gửi dữ liệu về.Trình duyệt nhận được,phân tích HTML/CSS/JS và vẽ (render) giao diện lên màn         hình.



&#x09;**2. Chrome DevTools - Tab Network:**

&#x09;- Thông tin tab Network cho thấy: Tất cả các yêu cầu (requests) và phản hồi (responses) giữa trình duyệt và máy chủ, bao gồm file HTML, CSS, hình ảnh, 	script, thời gian tải, dung lượng và trạng thái kết nối.



**Câu A2 - Semantic HTML**

Nguồn tham chiếu: Chương 04



&#x09;**Tại sao trang web bị đánh giá SEO thấp?**

&#x09;Trang web sử dụng quá nhiều thẻ <div> vô nghĩa (div-itis). 

&#x09;Các công cụ tìm kiếm (Google) không hiểu được đâu là phần quan trọng, đâu là tiêu đề hay menu của trang web.



&#x09;**4 lỗi Semantic và cách sửa:**

&#x09;Lỗi 1: Dùng <div class="header"> cho phần đầu trang.

&#x09;Sửa lại: Dùng thẻ <header>.



&#x09;Lỗi 2: Dùng <div class="menu"> cho thanh điều hướng.

&#x09;Sửa lại: Dùng thẻ <nav>.



&#x09;Lỗi 3: Dùng <div class="main"> cho nội dung chính.

&#x09;Sửa lại: Dùng thẻ <main>.



&#x09;Lỗi 4: Dùng <div class="title"> cho tên sản phẩm.

&#x09;Sửa lại: Dùng các thẻ tiêu đề như <h1> đến <h6>.



**Câu A3 - Block vs Inline**

&#x09;Hộp 1

&#x09;Text A Text B

&#x09;Hộp 2

&#x09;Text C Text D

&#x09;Hộp 3



**Câu A4 — Table**

Nguồn tham chiếu: Chương 05



&#x09;**Sự khác nhau giữa <thead>, <tbody>, <tfoot>:**

&#x09;<thead>: Chứa phần đầu của bảng (thường là tên các cột).

&#x09;<tbody>: Chứa phần nội dung dữ liệu chính của bảng.

&#x09;<tfoot>: Chứa phần chân bảng (thường dùng để tóm tắt dữ liệu hoặc tổng kết).



&#x09;**Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (3 lý do):**

&#x09;SEO kém: Công cụ tìm kiếm khó phân tích cấu trúc nội dung trang web khi bị lồng trong các bảng.

&#x09;Khó bảo trì: Code cực kỳ rối rắm khi lồng quá nhiều thẻ <tr>, <td>.

&#x09;Không linh hoạt (Responsive): Rất khó để làm giao diện bảng hiển thị đẹp trên điện thoại di động so với việc dùng Flexbox hay Grid.



**Câu B3 - Debug**

&#x09;Lỗi 1: Dòng 1 — thiếu khai báo trong DOCTYPE — Cách sửa <!DOCTYPE html>

&#x09;Lỗi 2: Dòng 3 - chưa đóng thẻ <title> - Cách sửa <title>Trang web</title>

&#x09;Lỗi 3: Dòng 8 – sai cú pháp đóng thẻ <h1> – Cách sửa <h1>Welcome to ShopTLU</h1>

&#x09;Lỗi 4: Dòng 12 – sai cú pháp đóng thẻ <h1> – Cách sửa <a href="home">Trang chủ</a>

&#x09;Lỗi 5: Dòng 8 - thẻ h1 nên nằm trong thẻ <header> - Cách sửa cho thẻ <header>...<h1>..<\\h1>...<header>

&#x09;Lỗi 6: Dòng 10 - link dẫn đến Home thiếu đuôi - Cách sửa <a href="home.html">Trang chủ</a>

&#x09;Lỗi 7: Dòng 11 - link dẫn đến Products thiếu đuôi - Cách sửa <a href="products.html">Trang chủ</a>

&#x09;Lỗi 8: Dòng 23 - thuộc tính src của ảnh thiếu "" - Cách sửa <img src="iphone.jpg">

&#x09;Lỗi 9: Dòng 25 - đóng thẻ <b> và <p> sai vị trí - Cách sửa <p>Giá: <b>25.990.000đ</b></p>

&#x09;Lỗi 10:Dòng 30->39 - bảng thiếu thẻ tổ chức - Cách sửa 

&#x09;<table>

&#x20;   		<thead>

&#x20;       	<tr>

&#x20;         	<th>Tên sản phẩm</th> <th>Giá bán</th>

&#x20;       	</tr>

&#x20;   	</thead>

&#x20;   	<tbody>

&#x20;       	<tr>

&#x20;           	<td>iPhone 16 Pro</td> <td>25.990.000đ</td>

&#x20;       	</tr>

&#x20;       	<tr>

&#x20;           	<td>Phụ kiện sạc</td>

&#x20;           	<td>500.000đ</td>

&#x20;       	</tr>

&#x20;   	</tbody>

&#x09;</table>

&#x09;Lỗi 11: Dòng 48 - chưa đóng thẻ <p> - Cách sửa <p>Copyright 2026</p>

## Bài B4: Phân tích trang web thegioididong.com

### 1. Phân tích thẻ Semantic
- **3 thẻ dùng đúng Semantic:**
  - Thẻ `<header>`: Dùng để chứa toàn bộ thanh công cụ đầu trang (Logo, thanh tìm kiếm...). Ảnh: `screenshots/header.png`.
  - Thẻ `<footer>`: Dùng ở cuối trang chứa thông tin liên hệ, chính sách. Ảnh: `screenshots/footer.png`.
  - Thẻ `<nav>`: Dùng cho menu điều hướng danh mục sản phẩm. Ảnh: `screenshots/nav.png`.
- **Thẻ dùng KHÔNG đúng Semantic:**
  - Trang web dùng thẻ `<a>` thay vì `<button>` cho nút chuyển banner. Ảnh: `screenshots/bad_semantic.png`.

### 2. Phân tích Table
- **Hình ảnh:** `screenshots/table.png`
- **Nội dung:** Bảng hiển thị thông số kỹ thuật chi tiết của điện thoại.
- **Cấu trúc:** Bảng có sử dụng thẻ `<tbody>` nhưng không sử dụng `<thead>`. (Bạn ghi theo những gì bạn soi được nhé)

### 3. Phân tích Form
- **Hình ảnh:** `screenshots/form.png`
- **Form:** Form thanh tìm kiếm ở đầu trang.
- **Action:** `action="/tim-kiem"` (Bạn ghi chính xác cái bạn thấy).
- **Method:** `GET` (Hoặc POST, tùy trang).
- **Input Types:** Trang dùng `<input type="text">` cho ô nhập từ khóa.

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Thiết kế cấu trúc


```html
<header>
    <nav>
        <ul>...</ul>
    </nav>
</header>

<nav aria-label="breadcrumb">
    <ol>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/dien-thoai">Điện thoại</a></li>
        <li><a href="/dien-thoai/iphone-16">iPhone 16</a></li>
    </ol>
</nav>

<main>
    <section id="product-images">
        <figure>
            <img src="main.jpg" alt="Ảnh chính iPhone 16">
            <ul>
                <li><img src="thumb1.jpg" alt="Ảnh phụ 1"></li>
                <li><img src="thumb2.jpg" alt="Ảnh phụ 2"></li>
            </ul>
        </figure>
    </section>

    <section id="product-info">
        <article>
            <h1>iPhone 16 Pro Max 256GB</h1> <p class="price">25.990.000đ</p> <p class="description">Mô tả ngắn gọn về tính năng...</p>
            <button>Thêm vào giỏ hàng</button> </article>
    </section>

    <section id="product-specs">
        <h2>Bảng thông số kỹ thuật</h2> <table>
            <tbody>
                <tr>
                    <th>Chip xử lý</th> <td>A18 Pro</td> </tr>
            </tbody>
        </table>
    </section>

    <section id="product-reviews">
        <h2>Đánh giá từ người dùng</h2>
        <article>
            <h3>Ngọc Khánh</h3>
            <p>Sản phẩm rất tuyệt vời, giao hàng nhanh!</p>
        </article>
    </section>
</main>

<aside>
    <h2>Sản phẩm tương tự</h2>
    <ul>
        <li><a href="#">iPhone 15 Pro Max</a></li>
    </ul>
</aside>

<footer>
    <p>&copy; 2026 Shop của Khánh</p>
</footer>
Câu C2 (10đ) — So sánh & Tranh luận
Quan điểm "dùng thẻ <div> cho mọi thứ rồi thêm class là được" của đồng nghiệp là một tư duy cũ và đi ngược lại với các tiêu chuẩn web hiện đại. Việc học và sử dụng Semantic HTML5 không hề tốn thời gian vô ích, mà nó mang lại hai lợi ích kỹ thuật cốt lõi:

Thứ nhất là Tối ưu hóa công cụ tìm kiếm (SEO). Các bot của Google (Web Crawler) không hiểu được ý nghĩa của các class như <div class="header"> hay <div class="main-content">. Chúng phụ thuộc vào các thẻ ngữ nghĩa như <header>, <main>, <article>, <h1> để lập chỉ mục và đánh giá mức độ quan trọng của nội dung. Một trang web chỉ toàn thẻ <div> sẽ bị đánh giá thấp và khó lên top tìm kiếm.

Thứ hai là Khả năng tiếp cận. Semantic HTML giúp các phần mềm đọc màn hình (Screen Readers) cho người khiếm thị hiểu được bố cục trang web. Người dùng có thể ra lệnh "nhảy đến phần nội dung chính (main)" hoặc "đọc các danh sách điều hướng (nav)". Thẻ <div> hoàn toàn "câm" trước các phần mềm này.

Ví dụ thực tế: Ở nút "Mua ngay", nếu đồng nghiệp dùng <div class="btn">Mua ngay</div>, người dùng sử dụng bàn phím (không dùng chuột) sẽ không thể dùng phím Tab để di chuyển đến nút đó, cũng không thể nhấn Enter để kích hoạt. Nhưng nếu dùng đúng thẻ <button>, trình duyệt sẽ tự động hỗ trợ toàn bộ các tương tác này mà không cần tốn công viết thêm mã JavaScript phức tạp.

Tuy nhiên, thẻ <div> không hề vô dụng. Thẻ này là lựa chọn hoàn hảo trong trường hợp chúng ta chỉ cần một "chiếc hộp vô nghĩa" để gom nhóm các phần tử lại với nhau nhằm mục đích tạo bố cục (layout) và trang trí bằng CSS (ví dụ: <div class="grid-container"> để bọc các sản phẩm lại thành một lưới hiển thị ngang).

