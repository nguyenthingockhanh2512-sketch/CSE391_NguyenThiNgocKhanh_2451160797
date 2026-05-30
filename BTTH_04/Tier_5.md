# Hướng dẫn Giải bài tập Tier 5 — Events cơ bản (Xử lý sự kiện trong React)

Tài liệu này cung cấp lời giải chi tiết cho các thử thách trong **Tier 5**, hướng dẫn bạn cách bắt và xử lý các sự kiện tương tác của người dùng như Click chuột, Gõ phím, Thay đổi Input và Submit Form.

---

## 📝 Lời giải Bài 5.1 — Click Events

### Yêu cầu thử thách:
1. Tạo nút "Đổi màu ngẫu nhiên" cho một div.
2. Đếm số lần click vào từng nút riêng biệt.
3. Tạo nút "Like" với icon ❤️/🤍 toggle.

### Mã nguồn React Component (`ClickEventsChallenge.jsx`):
```jsx
import React, { useState } from "react";

function ClickEventsChallenge() {
    // 1. State quản lý màu ngẫu nhiên
    const [bgColor, setBgColor] = useState("#f1f2f6");
    
    // 2. State đếm số click cho 2 nút độc lập
    const [clickLeft, setClickLeft] = useState(0);
    const [clickRight, setClickRight] = useState(0);
    
    // 3. State quản lý Like
    const [isLiked, setIsLiked] = useState(false);

    // Hàm tạo màu Hex ngẫu nhiên
    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setBgColor(color);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Thử thách Click Events</h2>

            {/* Thử thách 1: Đổi màu nền div ngẫu nhiên */}
            <div style={{ background: bgColor, padding: "30px", borderRadius: "10px", textAlign: "center", marginBottom: "20px", transition: "background 0.3s" }}>
                <p>Màu nền hiện tại: <strong>{bgColor}</strong></p>
                <button onClick={generateRandomColor} style={{ padding: "10px", cursor: "pointer" }}>
                    🎨 Đổi màu ngẫu nhiên
                </button>
            </div>

            {/* Thử thách 2: Đếm click độc lập */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ flex: 1, padding: "15px", border: "1px dashed #ccc", textAlign: "center" }}>
                    <p>Nút Trái: {clickLeft} lần</p>
                    <button onClick={() => setClickLeft(clickLeft + 1)}>Click Trái</button>
                </div>
                <div style={{ flex: 1, padding: "15px", border: "1px dashed #ccc", textAlign: "center" }}>
                    <p>Nút Phải: {clickRight} lần</p>
                    <button onClick={() => setClickRight(clickRight + 1)}>Click Phải</button>
                </div>
            </div>

            {/* Thử thách 3: Nút Like Toggle */}
            <button 
                onClick={() => setIsLiked(!isLiked)}
                style={{ 
                    padding: "10px 20px", 
                    fontSize: "18px", 
                    cursor: "pointer", 
                    background: isLiked ? "#ff4757" : "#f1f2f6",
                    color: isLiked ? "white" : "black",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}
            >
                {isLiked ? "❤️ Đã Thích" : "🤍 Thích bài viết"}
            </button>
        </div>
    );
}

export default ClickEventsChallenge;
```

---

## 📝 Lời giải Bài 5.2 & 5.3 — Input & Keyboard Events

### Yêu cầu thử thách:
1. Đếm số từ (không phải ký tự).
2. Di chuyển một ô vuông bằng phím mũi tên (↑↓←→).

### Mã nguồn React Component (`InputKeyboardChallenge.jsx`):
```jsx
import React, { useState } from "react";

function InputKeyboardChallenge() {
    // State cho Input (Đếm từ)
    const [text, setText] = useState("");
    
    // State cho Keyboard (Di chuyển ô vuông)
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Hàm đếm số từ
    const countWords = (str) => {
        // Loại bỏ khoảng trắng thừa và split theo dấu cách
        const trimmed = str.trim();
        if (trimmed === "") return 0;
        return trimmed.split(/\s+/).length;
    };

    // Hàm xử lý phím mũi tên để di chuyển ô vuông
    const handleKeyDown = (e) => {
        const step = 20; // Mỗi lần di chuyển 20px
        
        // Tránh hành vi cuộn trang mặc định của phím mũi tên
        if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case "ArrowUp":
                setPosition(prev => ({ ...prev, y: prev.y - step }));
                break;
            case "ArrowDown":
                setPosition(prev => ({ ...prev, y: prev.y + step }));
                break;
            case "ArrowLeft":
                setPosition(prev => ({ ...prev, x: prev.x - step }));
                break;
            case "ArrowRight":
                setPosition(prev => ({ ...prev, x: prev.x + step }));
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Thử thách Input & Keyboard</h2>

            {/* Thử thách Input: Đếm từ */}
            <div style={{ marginBottom: "30px", padding: "15px", background: "#f8f9fa" }}>
                <h3>1. Bộ đếm số từ</h3>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập đoạn văn..."
                    rows={4}
                    style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
                />
                <p>Số từ đã nhập: <strong>{countWords(text)}</strong> từ</p>
                <p>Số ký tự: <strong>{text.length}</strong> ký tự</p>
            </div>

            {/* Thử thách Keyboard: Di chuyển ô vuông */}
            <div style={{ marginBottom: "30px", padding: "15px", background: "#f8f9fa" }}>
                <h3>2. Di chuyển ô vuông (Click vào vùng dưới và dùng phím mũi tên)</h3>
                <div 
                    tabIndex={0} // Rất quan trọng: cho phép div nhận focus để bắt sự kiện phím
                    onKeyDown={handleKeyDown}
                    style={{ 
                        width: "400px", 
                        height: "250px", 
                        border: "2px solid #333", 
                        position: "relative",
                        overflow: "hidden", // Không cho ra ngoài khung
                        background: "#ecf0f1",
                        cursor: "crosshair"
                    }}
                >
                    {/* Ô vuông di chuyển */}
                    <div style={{
                        width: "40px",
                        height: "40px",
                        background: "#e74c3c",
                        position: "absolute",
                        top: `calc(50% + ${position.y}px)`, // Căn giữa làm gốc
                        left: `calc(50% + ${position.x}px)`,
                        transform: "translate(-50%, -50%)", // Đưa tâm ô vuông về đúng tọa độ
                        transition: "all 0.1s ease" // Animation mượt mà
                    }}></div>
                </div>
            </div>
        </div>
    );
}

export default InputKeyboardChallenge;
```

---

## 📝 Lời giải Bài 5.4 — Form Events

### Yêu cầu thử thách:
1. Thêm trường "Xác nhận mật khẩu".
2. Hiển thị lỗi realtime khi nhập sai (mật khẩu không khớp hoặc email thiếu `@`).

### Mã nguồn React Component (`FormEventsChallenge.jsx`):
```jsx
import React, { useState } from "react";

function FormEventsChallenge() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [submitted, setSubmitted] = useState(false);

    // Cập nhật State liên tục khi người dùng gõ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Kiểm tra Validate Realtime
    const isEmailValid = formData.email.length === 0 || formData.email.includes("@");
    const isPasswordMatch = formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;
    const canSubmit = formData.email.includes("@") && formData.password.length >= 6 && formData.password === formData.confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault(); // CHÚ Ý: Luôn gọi hàm này để ngăn trang reload

        if (!canSubmit) {
            alert("Vui lòng kiểm tra lại thông tin!");
            return;
        }

        setSubmitted(true);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}>
            <h2>Đăng ký Tài khoản (Realtime Validation)</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    
                    {/* Input Email */}
                    <div>
                        <label>Email:</label><br />
                        <input 
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", borderColor: !isEmailValid ? "red" : "#ccc" }}
                        />
                        {!isEmailValid && <small style={{ color: "red" }}>Email phải chứa ký tự @</small>}
                    </div>

                    {/* Input Mật khẩu */}
                    <div>
                        <label>Mật khẩu (ít nhất 6 ký tự):</label><br />
                        <input 
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    {/* Input Xác nhận Mật khẩu */}
                    <div>
                        <label>Xác nhận Mật khẩu:</label><br />
                        <input 
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "8px", borderColor: !isPasswordMatch ? "red" : "#ccc" }}
                        />
                        {!isPasswordMatch && <small style={{ color: "red" }}>Mật khẩu xác nhận không khớp!</small>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={!canSubmit} // Disable nút nếu form chưa hợp lệ
                        style={{ 
                            padding: "10px", 
                            background: canSubmit ? "#2ecc71" : "#bdc3c7", 
                            color: "white", 
                            border: "none", 
                            cursor: canSubmit ? "pointer" : "not-allowed" 
                        }}
                    >
                        Đăng Ký
                    </button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                    <h3 style={{ color: "#155724" }}>✅ Đăng ký thành công!</h3>
                    <p>Chào mừng <strong>{formData.email}</strong></p>
                    <button onClick={() => { setSubmitted(false); setFormData({ email: "", password: "", confirmPassword: "" }) }}>
                        Trở lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormEventsChallenge;
```
