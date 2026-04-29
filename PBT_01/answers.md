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



