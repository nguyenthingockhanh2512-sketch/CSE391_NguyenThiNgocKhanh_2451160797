# Tier 0 — Component đầu tiên (Làm quen cú pháp React)

---

## 📝 Bài 0.1 — Chạy React đầu tiên (5 phút)


### Bước 2: Xem file `src/App.jsx`
```jsx
// Đây là một React Component
function App() {
    return (
        <div>
            <h1>Xin chào React!</h1>
            <p>Đây là component đầu tiên của bạn</p>
        </div>
    );
}

export default App;
```

### Bước 3: Thử sửa nội dung
```jsx
function App() {
    return (
        <div>
            <h1>Xin chào, Ngọc Khánh</h1>
            <p>Tóm tắt thu chi tháng này:</p>
            <ul>
                <li>Tiền ăn uống</li>
                <li>Tiền đi lại</li>
                <li>Tiền nhà trọ</li>
                <li>Quỹ tiết kiệm</li>
            </ul>
        </div>
    );
}

export default App;
```

### Câu hỏi
1. File `.jsx` khác gì file `.js`?
    .js là file chứa mã JavaScript tiêu chuẩn. Trình duyệt có thể đọc hiểu trực tiếp.

    .jsx (JavaScript XML) là một phần mở rộng cú pháp do React tạo ra. Nó cho phép lập trình viên viết thẳng các thẻ HTML (<div>, <h1>...) ngay bên trong hàm JavaScript. Đuôi .jsx là tín hiệu để các công cụ build (như Vite) biết và dịch đoạn mã lai đó về dạng JavaScript thuần trước khi chạy trên trình duyệt.  
2. Tại sao phải `export default App`?
    Theo quy tắc Module trong JavaScript hiện đại, mọi hàm, biến hay component viết trong một file đều là private (kín) theo mặc định.

    Lệnh export default App có nghĩa là: "Hãy công khai hàm App này ra ngoài, và biến nó thành món hàng chính (default) của file này". Nhờ đó, file khởi chạy gốc (thường là main.jsx) mới có thể import component App vào và gắn nó lên giao diện.
3. Thử xóa `export default` → chuyện gì xảy ra?
    Hiện tượng: Ứng dụng sẽ bị "sập" (crash) ngay lập tức. Giao diện có thể trắng xóa hoặc hiện ra một màn hình thông báo lỗi đỏ chót từ Vite.

    Bản chất: Ở file main.jsx, hệ thống đang có dòng lệnh import App from './App.jsx'. Nếu bạn xóa export default ở file App, file main sẽ ngơ ngác vì không tìm thấy component nào để import cả. Terminal sẽ báo lỗi dạng: The requested module '/src/App.jsx' does not provide an export named 'default'.
---

## 📝 Bài 0.2 — JSX là HTML "xịn hơn" (10 phút)

### So sánh trực tiếp

```jsx
// ===== Bài tập: Viết lại HTML thành JSX =====

// HTML thuần (copy từ bài cũ):
/*
<div class="card">
    <img src="avatar.jpg" alt="Avatar">
    <h2>Nguyễn Văn Minh</h2>
    <p>Sinh viên năm 3</p>
    <label for="email">Email:</label>
    <input type="email" id="email">
</div>
*/

// JSX (viết lại):
function StudentCard() {
    return (
        <div className="card">         {/* class → className */}
            <img src="avatar.jpg" alt="Avatar" />  {/* Đóng thẻ */}
            <h2>Nguyễn Văn Minh</h2>
            <p>Sinh viên năm 3</p>
            <label htmlFor="email">Email:</label>   {/* for → htmlFor */}
            <input type="email" id="email" />       {/* Đóng thẻ */}
        </div>
    );
}

export default StudentCard;
```

### Bài tập: Viết lại HTML thành JSX

**Bài 1:** Viết component `UserProfile`
```html
<!-- HTML gốc -->
<div class="profile">
    <h1>Hồ sơ cá nhân</h1>
    <img src="photo.jpg" alt="Ảnh đại diện">
    <table>
        <tr>
            <td>Họ tên:</td>
            <td>Minh</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
        </tr>
    </table>
</div>
```
```js
import React from 'react';

function UserProfile() {
  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>
      <img src="photo.jpg" alt="Ảnh đại diện" />
      <table>
        <tbody>
          <tr>
            <td>Họ tên:</td>
            <td>Minh</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
```
**Bài 2:** Viết component `ProductInfo`
```html
<!-- HTML gốc -->
<div class="product">
    <h2>iPhone 15</h2>
    <p class="price">25.000.000đ</p>
    <ul>
        <li>Màn hình: 6.1 inch</li>
        <li>Camera: 48MP</li>
        <li>Pin: 3349 mAh</li>
    </ul>
    <button>Mua ngay</button>
</div>
```
```js
import React from 'react';

function ProductInfo() {
  return (
    <div className="product">
      <h2>iPhone 15</h2>
      <p className="price">25.000.000đ</p>
      <ul>
        <li>Màn hình: 6.1 inch</li>
        <li>Camera: 48MP</li>
        <li>Pin: 3349 mAh</li>
      </ul>
      <button>Mua ngay</button>
    </div>
  );
}

export default ProductInfo;
```