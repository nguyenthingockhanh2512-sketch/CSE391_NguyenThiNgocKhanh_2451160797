Câu A1 (5đ) — Input Types
1. type="email" → Ô nhập text → Tự động kiểm tra chuỗi có chứa ký tự @ và định dạng tên miền hợp lệ không → Dùng cho form đăng ký tài khoản hoặc nhập email nhận bản tin khuyến mãi.

2. type="password" → Ô nhập text bị che khuất bằng dấu chấm hoặc sao → Không có validation tự động về độ phức tạp → Dùng để nhập mật khẩu khi khách hàng đăng nhập/đăng ký.

3. type="number" → Ô nhập số có nút tăng/giảm nhỏ bên cạnh → Chỉ cho phép nhập số, tự động validate theo các thuộc tính min, max, step → Dùng trong giỏ hàng để khách hàng điều chỉnh số lượng sản phẩm.

4. type="tel" → Ô nhập text (trên di động sẽ hiển thị bàn phím số) → Không có validation tự động chuẩn xác (cần kết hợp pattern) → Dùng để khách hàng nhập số điện thoại liên hệ khi điền thông tin giao hàng.

5. type="url" → Ô nhập text → Tự động kiểm tra định dạng phải là một URL hợp lệ (thường có http:// hoặc https://) → Dùng để nhà bán hàng (seller) đăng ký link website cá nhân hoặc link video review.

6. type="date" → Hiển thị ô nhập kèm theo công cụ chọn lịch (Date picker) → Chỉ cho phép nhập hoặc chọn ngày tháng hợp lệ → Dùng để khách hàng điền ngày sinh nhằm nhận mã giảm giá dịp sinh nhật.

7. type="search" → Ô nhập text có thêm nút 'x' nhỏ ở góc để xóa nhanh nội dung → Không có validation đặc biệt tự động → Dùng làm thanh tìm kiếm sản phẩm (Search bar) trên Header của trang web.

8. type="color" → Hiển thị bảng chọn màu (Color picker) của hệ điều hành → Đảm bảo giá trị trả về luôn là mã màu Hex hợp lệ (VD: #35ee19) → Dùng trong trang tùy chỉnh để khách hàng tự chọn màu sắc in lên áo thun thiết kế.

9. type="file" → Nút bấm mở hộp thoại chọn file trên thiết bị kèm tên file đã chọn → Không tự động validate nội dung file (phải dùng thuộc tính accept để giới hạn đuôi file) → Dùng để khách hàng tải lên hình ảnh hoặc video thực tế khi viết review sản phẩm.

10. type="radio" → Nút chọn hình tròn, cho phép chọn 1 đáp án duy nhất trong một nhóm → Không có validation tự động (ngoại trừ bắt buộc chọn nếu có required) → Dùng ở bước thanh toán để khách hàng chọn phương thức thanh toán (VD: "COD" hoặc "Chuyển khoản").

Câu A2 (5đ) — Validation Attribute
<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->
Dự đoán: Trình duyệt sẽ chặn form không cho submit và hiển thị một thông báo lỗi 
Giải thích: Thuộc tính required quy định đây là trường dữ liệu bắt buộc. 

<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->
Dự đoán: Trình duyệt sẽ chặn form submit và hiển thị cảnh báo yêu cầu nhập đúng định dạng email.
Giải thích: Việc khai báo type="email" kích hoạt bộ quy tắc xác thực (validation) cơ bản cho email . Chuỗi "abc" không chứa ký tự @ và tên miền nên bị đánh giá là sai định dạng.
<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->
Dự đoán: Trình duyệt sẽ chặn form submit và hiển thị cảnh báo giá trị nhập vào đã vượt quá giới hạn cho phép. 
Giải thích: Input này có kiểu dữ liệu là số (type="number") và bị ràng buộc giới hạn giá trị lớn nhất là 10 thông qua thuộc tính max="10".
<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->
Dự đoán: Trình duyệt sẽ chặn form submit và hiển thị thông báo lỗi dữ liệu không khớp với định dạng yêu cầu.
Giải thích: Thuộc tính pattern="[0-9]{10}" sử dụng Biểu thức chính quy (Regular Expression) yêu cầu người dùng phải nhập chính xác một chuỗi gồm 10 chữ số (từ 0 đến 9). Chuỗi "abc123" chứa chữ cái và chỉ có độ dài là 6 nên hoàn toàn vi phạm quy tắc này.
<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
Dự đoán: Trình duyệt sẽ chặn form submit và hiển thị thông báo độ dài văn bản quá ngắn.
Giải thích: Thuộc tính minlength="8" thiết lập độ dài tối thiểu của chuỗi ký tự phải là 8. Chuỗi "123" người dùng nhập vào chỉ có 3 ký tự (3 < 8) nên vi phạm ràng buộc validation.

Câu A3 (5đ) — Accessibility

1. Tại sao <label for="email"> quan trọng cho người dùng screen reader?
Thuộc tính for liên kết chặt chẽ thẻ <label> với một <input> thông qua thuộc tính id. Khi người dùng di chuyển (focus) đến ô input, phần mềm sẽ tự động đọc to nội dung của <label> đó để họ biết cần phải nhập gì. Ngoài ra, nó giúp tăng diện tích click (hit area) — người dùng click vào phần chữ của label thì con trỏ cũng tự động focus vào ô input.

2. Khi nào dùng <fieldset> + <legend>? Cho ví dụ cụ thể.

Khi nào dùng: Dùng để nhóm các trường dữ liệu (form controls) có liên quan về mặt logic lại với nhau thành một khối rõ ràng. <legend> đóng vai trò là tiêu đề mô tả cho toàn bộ khối <fieldset> đó.

Ví dụ cụ thể: Nhóm các thông tin giao hàng trong form thanh toán.
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="city">Thành phố:</label>
    <input type="text" id="city" name="city">
    <label for="address">Địa chỉ chi tiết:</label>
    <input type="text" id="address" name="address">
</fieldset>

3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có <label>?

Dùng khi một thành phần tương tác (như nút bấm, ô tìm kiếm) không có văn bản hiển thị trực quan đi kèm. Ví dụ: Một nút bấm tìm kiếm chỉ có icon hình kính lúp, ta thêm aria-label="Tìm kiếm" để Screen Reader đọc được chức năng của nút.

Tại sao KHÔNG nên dùng khi đã có <label>: Nếu một input đã có <label> hiển thị rõ ràng trên màn hình và được liên kết đúng bằng for, việc thêm aria-label là dư thừa. Screen Reader có thể ưu tiên đọc aria-label và bỏ qua <label>, hoặc tệ hơn là đọc lặp lại cả hai gây nhiễu thông tin cho người dùng.

Câu A4 (5đ) — Media
1. Giải thích thuộc tính loading="lazy" trên thẻ <img>. Nó cải thiện gì? Khi nào KHÔNG nên dùng?

Giải thích & Cải thiện: Thuộc tính này chỉ thị cho trình duyệt trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của bức ảnh đó. Điều này giúp giảm lượng dữ liệu tải thừa, tiết kiệm băng thông mạng và tăng tốc độ tải trang ban đầu (Initial Page Load).

Khi KHÔNG nên dùng: Không dùng cho các hình ảnh "above-the-fold" (những ảnh hiển thị ngay trên màn hình đầu tiên khi vừa vào trang web, ví dụ: banner lớn, logo chính). Việc lazy load các ảnh quan trọng này sẽ làm chậm thời gian hiển thị nội dung chính (ảnh hưởng xấu đến chỉ số LCP trong đo lường hiệu năng).

2. Tại sao nên cung cấp nhiều <source> trong thẻ <video>? Liệt kê ít nhất 3 format video web phổ biến.

Tại sao: Mỗi trình duyệt (Chrome, Safari, Firefox,...) hỗ trợ giải mã các chuẩn nén video (codecs) khác nhau. Cung cấp nhiều <source> hoạt động như một cơ chế dự phòng (fallback). Trình duyệt sẽ đọc từ trên xuống dưới và phát định dạng đầu tiên mà nó hỗ trợ.

3 format phổ biến: MP4, WebM, Ogg.

3. Thuộc tính alt trên <img> dùng để làm gì? Viết alt tốt cho 3 trường hợp:

Dùng để làm gì: Cung cấp văn bản thay thế hiển thị khi ảnh bị lỗi (không tải được), giúp trình đọc màn hình đọc cho người khiếm thị hiểu nội dung ảnh, và cung cấp ngữ cảnh quan trọng cho các công cụ tìm kiếm (tốt cho SEO).

Ảnh sản phẩm iPhone 16:
    alt="Điện thoại iPhone 16 Pro Max 256GB màu Titan"

Ảnh trang trí (decorative):
    alt="".

Ảnh biểu đồ doanh thu Q1/2026:
    alt="Biểu đồ cột thể hiện doanh thu Quý 1/2026".

Câu A5 (5đ) — So sánh <figure> vs <img>
Cách 1: Sử dụng thẻ <img> độc lập

Dùng cho các hình ảnh mang tính chất nội tuyến (inline), trang trí, hoặc là một phần gắn liền với luồng văn bản thông thường mà không cần có chú thích giải thích riêng. Những hình ảnh này thường phục vụ cho ngữ cảnh tại chính vị trí đó, nếu tách chúng ra đứng một mình thì không có ý nghĩa rõ rệt.

2 ví dụ thực tế:

Ảnh đại diện (Avatar): Hình ảnh profile của người dùng hiển thị ở góc thanh điều hướng (navbar) hoặc kế bên một bình luận.

Icon hoặc Logo: Icon giỏ hàng đặt cạnh chữ "Thanh toán", hoặc logo của website nằm ở trên cùng của trang web.

Cách 2: Sử dụng thẻ <figure> kết hợp <figcaption>

Dùng cho các khối nội dung trực quan độc lập (self-contained content) mang tính chất minh họa, tham khảo. Điểm khác biệt cốt lõi là nó có kèm theo <figcaption> để chú thích rõ ràng cho nội dung đó. Nếu bạn bốc toàn bộ khối <figure> này dời đi chỗ khác (ví dụ đẩy xuống cuối bài báo cáo), thì luồng đọc và ý nghĩa của đoạn văn bản chính vẫn không hề bị gãy vụn hay ảnh hưởng.

2 ví dụ thực tế:

Thẻ sản phẩm (Product Card) trong E-commerce: Giống như ví dụ của đề bài, ảnh sản phẩm luôn cần đi kèm với tên và giá bán tạo thành một khối thông tin thống nhất để người dùng dễ dàng lướt xem.

Biểu đồ phân tích dữ liệu: Khi bạn trình bày một biểu đồ (ví dụ: Biểu đồ thống kê quản lý chi tiêu thông minh hàng tháng) trong một bài viết, bạn sẽ cần chú thích bên dưới như "Hình 1: Tỉ lệ chi tiêu tháng 10/2026" để người đọc hiểu biểu đồ đó đang thể hiện điều gì.
