# Hướng dẫn Giải bài tập Tier 4 — useState cơ bản (Quản lý trạng thái đơn giản)

Tài liệu này cung cấp lời giải chi tiết cho các thử thách trong **Tier 4**, giúp bạn nắm vững cách sử dụng Hook `useState` trong React để quản lý các kiểu dữ liệu cơ bản: Số nguyên (Number), Chuỗi (String) và Logic (Boolean).

---

## 📝 Lời giải Bài 4.1 — useState với số (Đếm)

### Yêu cầu thử thách:
1. Thêm nút "Tăng 5" (`count += 5`).
2. Hiển thị "Số dương" hoặc "Số âm" dựa vào `count`.
3. Thay đổi màu: xanh khi > 0, đỏ khi < 0, đen khi = 0.

### Mã nguồn React Component (`NumberStateChallenge.jsx`):
```jsx
import React, { useState } from "react";

function NumberStateChallenge() {
    // Khởi tạo state count với giá trị mặc định là 0
    const [count, setCount] = useState(0);

    // Xác định màu sắc dựa trên giá trị của count
    let color = "black";
    let message = "Số 0";
    if (count > 0) {
        color = "green";
        message = "Số dương";
    } else if (count < 0) {
        color = "red";
        message = "Số âm";
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Bộ đếm nâng cao</h2>
            
            {/* Hiển thị count với màu sắc và thông báo tương ứng */}
            <h1 style={{ color: color, fontSize: "48px", margin: "10px 0" }}>
                {count}
            </h1>
            <p style={{ fontStyle: "italic", color: "#555" }}>({message})</p>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                {/* Thử thách 1: Nút tăng 5 */}
                <button onClick={() => setCount(count + 5)}>Tăng (+5)</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
                <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
            </div>
        </div>
    );
}

export default NumberStateChallenge;
```

---

## 📝 Lời giải Bài 4.2 — useState với chuỗi (Input)

### Yêu cầu thử thách:
1. Đếm số ký tự đã nhập (hiển thị X/100).
2. Hiển thị "Email hợp lệ" nếu có ký tự "@".
3. Tạo ô nhập mật khẩu với nút ẩn/hiện.

### Mã nguồn React Component (`StringStateChallenge.jsx`):
```jsx
import React, { useState } from "react";

function StringStateChallenge() {
    // Quản lý state cho email và password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Quản lý trạng thái ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // Tính toán độ dài ký tự của email
    const textLength = email.length;
    // Kiểm tra tính hợp lệ cơ bản của email
    const isValidEmail = email.includes("@");

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px", margin: "0 auto" }}>
            <h2>Form Đăng Nhập</h2>
            
            {/* Input Email với đếm ký tự và validate */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    maxLength={100}
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "14px" }}>
                    {/* Thử thách 2: Validate Email */}
                    <span style={{ color: email.length === 0 ? "gray" : isValidEmail ? "green" : "red" }}>
                        {email.length === 0 ? "" : isValidEmail ? "✓ Email hợp lệ" : "❌ Thiếu ký tự @"}
                    </span>
                    {/* Thử thách 1: Đếm ký tự */}
                    <span style={{ color: "#777" }}>{textLength}/100</span>
                </div>
            </div>

            {/* Input Password với nút Ẩn/Hiện */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Mật khẩu:</label>
                <div style={{ display: "flex" }}>
                    <input 
                        type={showPassword ? "text" : "password"} // Thử thách 3
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        style={{ flex: 1, padding: "8px" }}
                    />
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ padding: "8px 15px", cursor: "pointer", background: "#eee", border: "1px solid #ccc" }}
                    >
                        {showPassword ? "Ẩn 🙈" : "Hiện 👁️"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StringStateChallenge;
```

---

## 📝 Lời giải Bài 4.3 — useState với boolean (Toggle)

### Yêu cầu thử thách:
1. Tạo nút "Hiện/Ẩn mật khẩu" (Đã làm ở bài 4.2).
2. Tạo accordion (click tiêu đề để mở/đóng nội dung).
3. Tạo nút "Bật/Tắt" với icon bóng đèn 💡.

### Mã nguồn React Component (`BooleanStateChallenge.jsx`):
```jsx
import React, { useState } from "react";

function BooleanStateChallenge() {
    // State cho Accordion
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    // State cho Bóng đèn
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Thử thách Toggle (Boolean)</h2>

            {/* Thử thách 2: Accordion */}
            <div style={{ border: "1px solid #ccc", borderRadius: "5px", marginBottom: "30px" }}>
                <div 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{ 
                        background: "#f1f2f6", 
                        padding: "15px", 
                        cursor: "pointer", 
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>Câu hỏi thường gặp: React là gì?</span>
                    <span>{isAccordionOpen ? "▲" : "▼"}</span>
                </div>
                {/* Ẩn hiện nội dung dựa vào state */}
                {isAccordionOpen && (
                    <div style={{ padding: "15px", borderTop: "1px solid #ccc", background: "#fff" }}>
                        React là một thư viện JavaScript mã nguồn mở được sử dụng để xây dựng giao diện người dùng (UI), đặc biệt là cho các ứng dụng trang đơn (SPA).
                    </div>
                )}
            </div>

            {/* Thử thách 3: Bật/Tắt bóng đèn */}
            <div style={{ textAlign: "center", padding: "20px", background: isLightOn ? "#fff9c4" : "#2c3e50", borderRadius: "10px", transition: "background 0.3s" }}>
                <h3 style={{ color: isLightOn ? "#333" : "#fff" }}>Phòng làm việc</h3>
                
                <div style={{ fontSize: "80px", margin: "20px 0" }}>
                    {isLightOn ? "💡" : "💡"}
                    <span style={{ 
                        position: "absolute", 
                        marginLeft: "-60px", 
                        color: isLightOn ? "transparent" : "rgba(0,0,0,0.7)", 
                        filter: "blur(2px)" 
                    }}>
                        {isLightOn ? "" : "💡"}
                    </span>
                    {/* Cách đơn giản hơn: */}
                    <div style={{ fontSize: "100px", textShadow: isLightOn ? "0 0 50px yellow" : "none", opacity: isLightOn ? 1 : 0.3 }}>
                        💡
                    </div>
                </div>

                <button 
                    onClick={() => setIsLightOn(!isLightOn)}
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        cursor: "pointer",
                        background: isLightOn ? "#e74c3c" : "#2ecc71",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
                </button>
            </div>
        </div>
    );
}

export default BooleanStateChallenge;
```

---

## 📝 Lời giải Bài 4.4 — Kết hợp nhiều useState

### Yêu cầu thử thách:
1. Thêm trường "Email" vào form.
2. Validate: tuổi phải > 0 và < 100.
3. Hiển thị "Xin chào [tên]!" khi nhập xong.

### Mã nguồn React Component (`MultipleStatesChallenge.jsx`):
```jsx
import React, { useState } from "react";

function MultipleStatesChallenge() {
    // Khai báo nhiều state
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Thử thách 1
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function handleSubmit() {
        // Validate cơ bản
        if (name.trim() === "" || email.trim() === "" || age === "") {
            setErrorMsg("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        
        // Thử thách 2: Validate tuổi
        const ageNum = parseInt(age);
        if (ageNum <= 0 || ageNum >= 100) {
            setErrorMsg("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        // Xóa lỗi và đánh dấu đã submit
        setErrorMsg("");
        setSubmitted(true);
    }

    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
        setErrorMsg("");
    }

    return (
        <div style={{ padding: "20px", maxWidth: "400px", fontFamily: "sans-serif" }}>
            <h2>Đăng ký hồ sơ</h2>

            {!submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {errorMsg && <div style={{ color: "red", padding: "10px", background: "#fee", border: "1px solid red" }}>{errorMsg}</div>}
                    
                    <div>
                        <label>Họ và tên:</label><br />
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px" }} />
                    </div>

                    <div>
                        <label>Email:</label><br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px" }} />
                    </div>

                    <div>
                        <label>Tuổi:</label><br />
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", padding: "8px" }} />
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                            {" "}Tôi là sinh viên
                        </label>
                    </div>

                    <button onClick={handleSubmit} style={{ padding: "10px", background: "#3498db", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>
                        Xác nhận Đăng ký
                    </button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "20px", borderRadius: "8px", border: "1px solid #c3e6cb" }}>
                    {/* Thử thách 3: Hiển thị lời chào */}
                    <h3 style={{ color: "#155724", marginTop: 0 }}>🎉 Xin chào {name}!</h3>
                    <p>Hồ sơ của bạn đã được ghi nhận thành công.</p>
                    <ul style={{ paddingLeft: "20px" }}>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Tuổi:</strong> {age}</li>
                        <li><strong>Nghề nghiệp:</strong> {isStudent ? "Sinh viên" : "Khác"}</li>
                    </ul>
                    <button onClick={handleReset} style={{ padding: "8px 15px", background: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Tạo hồ sơ mới
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultipleStatesChallenge;
```
