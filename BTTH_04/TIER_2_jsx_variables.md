# Tier 2 — Biến trong JSX (Đưa dữ liệu vào giao diện)

## 📝 Bài 2.1 — Hiển thị biến đơn giản (8 phút)

```jsx
import React from 'react';

function Challenge2_1() {
    // 1. Biến thông tin cá nhân
    const ten = "Ngọc Khánh Nguyễn Thị";
    const tuoi = 25;
    const queQuan = "Việt Nam";
    
    // 2. Xử lý logic lời chào dựa vào giờ hiện tại
    const gioHienTai = new Date().getHours();
    let loiChao = "";
    
    if (gioHienTai < 12) {
        loiChao = "Chào buổi sáng ☀️";
    } else if (gioHienTai < 18) {
        loiChao = "Chào buổi chiều 🌤️";
    } else {
        loiChao = "Chào buổi tối 🌙";
    }

    // 3. Biến và tính toán chỉ số BMI (Cân nặng / Chiều cao²)
    const canNang = 48; // kg
    const chieuCao = 1.58; // mét
    // Sử dụng toFixed(2) để làm tròn đến 2 chữ số thập phân
    const bmi = (canNang / (chieuCao * chieuCao)).toFixed(2);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Kết quả Bài 2.1</h2>
            
            {/* --- Thử thách 1 --- */}
            <div style={{ background: "#f0f8ff", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
                <h3>1. Thông tin cá nhân</h3>
                <p><strong>Họ và tên:</strong> {ten}</p>
                <p><strong>Tuổi:</strong> {tuoi}</p>
                <p><strong>Quê quán:</strong> {queQuan}</p>
            </div>

            {/* --- Thử thách 2 --- */}
            <div style={{ background: "#fffacd", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
                <h3>2. Lời chào theo thời gian</h3>
                <p style={{ fontSize: "18px", fontWeight: "bold", color: "#d35400" }}>
                    {loiChao} (Hiện tại là {gioHienTai} giờ)
                </p>
            </div>

            {/* --- Thử thách 3 --- */}
            <div style={{ background: "#e8f5e9", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
                <h3>3. Chỉ số BMI</h3>
                <p>Cân nặng: {canNang} kg | Chiều cao: {chieuCao} m</p>
                <p style={{ fontSize: "18px", color: "#2e7d32", fontWeight: "bold" }}>
                    👉 Chỉ số BMI của bạn là: {bmi}
                </p>
            </div>
        </div>
    );
}

export default Challenge2_1;
```

## 📝 Bài 2.2 — Conditional Rendering (Hiển thị có điều kiện) (10 phút)

### Cách 1: Toán tử 3 ngôi (Ternary)

```jsx
import React from 'react';

function ConditionalRenderingChallenge() {
    // Giả định dữ liệu test thay đổi trạng thái
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#2c3e50", borderBottom: "2px solid #e67e22", paddingBottom: "5px" }}>
                Bài 2.2 — Kết quả Thử thách
            </h2>

            {/* Thử thách 1: Dùng Toán tử 3 ngôi (Ternary Operator) */}
            <div style={{ marginBottom: "20px" }}>
                <h3>1. Trạng thái người dùng:</h3>
                <p style={{ fontSize: "16px" }}>
                    Hệ thống: {isOnline ? <span>🟢 Đang hoạt động (Online)</span> : <span>🔴 Ngoại tuyến (Offline)</span>}
                </p>
            </div>

            {/* Thử thách 2: Dùng && hoặc Ternary để ẩn/hiện cấu trúc Menu phức tạp */}
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px dashed #ccc" }}>
                <h3>2. Thanh điều hướng ứng dụng:</h3>
                {isLoggedIn ? (
                    <nav style={{ background: "#2c3e50", padding: "10px", borderRadius: "4px" }}>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "15px" }}>
                            <li><a href="#home" style={{ color: "white", textDecoration: "none" }}>Trang chủ</a></li>
                            <li><a href="#dashboard" style={{ color: "white", textDecoration: "none" }}>Bảng điều khiển</a></li>
                            <li><a href="#logout" style={{ color: "#e74c3c", textDecoration: "none", fontWeight: "bold" }}>Đăng xuất</a></li>
                        </ul>
                    </nav>
                ) : (
                    <div style={{ color: "#7f8c8d", fontStyle: "italic" }}>
                        🔒 Vui lòng đăng nhập để sử dụng các tính năng của hệ thống.
                    </div>
                )}
            </div>

            {/* Thử thách 3: Kết hợp && để hiển thị cảnh báo khi hết hàng cực nhanh */}
            <div style={{ padding: "15px", background: "#fdf2f2", borderRadius: "5px" }}>
                <h3>3. Kiểm tra kho hàng sản phẩm:</h3>
                <p>Số lượng hiện có trong kho: <strong>{stock}</strong> sản phẩm</p>
                {stock === 0 && (
                    <div style={{ color: "#c0392b", backgroundColor: "#f9dade", padding: "8px 12px", borderRadius: "4px", display: "inline-block", fontWeight: "bold" }}>
                        ⚠️ Rất tiếc, sản phẩm này đã HẾT HÀNG!
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConditionalRenderingChallenge;
```

## 📝 Bài 2.3 — Render danh sách (List Rendering) (10 phút)

### Code mẫu
```jsx
import React from 'react';

function ListRenderingChallenge() {
    // 1. Khởi tạo danh sách mảng 5 sản phẩm cố định
    const danhSachSanPham = [
        { id: 101, name: "Chuột Gaming Không Dây", price: 450000 },
        { id: 102, name: "Bàn Phím Cơ Custom Pro", price: 1850000 },
        { id: 103, name: "Lót Chuột Cỡ Lớn (Sơn Thủy)", price: 120000 },
        { id: 104, name: "Tai Nghe Chống Ồn Chủ Động", price: 2300000 },
        { id: 105, name: "Cáp Sạc Nhanh Type-C 100W", price: 95000 }
    ];

    // 3. Sử dụng hàm .reduce() của JS để tính tổng tiền tự động cực kỳ gọn gàng
    const tongGiaTri = danhSachSanPham.reduce((accumulator, item) => accumulator + item.price, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#2c3e50", borderBottom: "2px solid #27ae60", paddingBottom: "5px" }}>
                Bài 2.3 — Kết quả Thử thách
            </h2>
            
            <h3>Danh mục sản phẩm công nghệ:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#27ae60", color: "white" }}>
                        <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Mã SP</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Tên Sản Phẩm</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "right" }}>Giá Thành (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Duyệt mảng bằng hàm .map() kèm thuộc tính key duy nhất bắt buộc */}
                    {danhSachSanPham.map((sanPham) => {
                        // Thử thách 2: Kiểm tra điều kiện giá để gán màu sắc trực quan bằng Inline-Style
                        const laGiaCao = sanPham.price > 1000000;
                        
                        return (
                            <tr key={sanPham.id} style={{ backgroundColor: laGiaCao ? "#fff5f5" : "white" }}>
                                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{sanPham.id}</td>
                                <td style={{ border: "1px solid #ddd", padding: "10px", fontWeight: laGiaCao ? "bold" : "normal", color: laGiaCao ? "#e74c3c" : "#2c3e50" }}>
                                    {sanPham.name} {laGiaCao && "🔥 (Hot)"}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "right", fontWeight: "bold", color: laGiaCao ? "#e74c3c" : "#2c3e50" }}>
                                    {sanPham.price.toLocaleString('vi-VN')} đ
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Thử thách 3: Render tổng giá tiền đã tính toán */}
            <div style={{ marginTop: "15px", padding: "15px", background: "#f1f2f6", borderRadius: "5px", textAlign: "right" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Tổng chi phí đơn hàng:{" "}
                    <span style={{ color: "#27ae60", fontSize: "22px" }}>
                        {tongGiaTri.toLocaleString('vi-VN')} VND
                    </span>
                </span>
            </div>
        </div>
    );
}

export default ListRenderingChallenge;
```
