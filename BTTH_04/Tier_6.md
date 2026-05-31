# Tier 6 — Lists & CRUD (Danh sách và Thêm/Sửa/Xóa)

## 📝 6.1 — Render danh sách

### Yêu cầu thử thách:
1. Hiển thị STT cho mỗi sinh viên.
2. Hiển thị sinh viên tuổi >= 20 bằng màu xanh.
3. Tính và hiển thị tuổi trung bình.

### Mã nguồn React Component (`ListReadChallenge.jsx`):
```jsx
import React, { useState } from "react";

function ListReadChallenge() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    // 3. Tính tuổi trung bình
    const averageAge = (students.reduce((sum, student) => sum + student.age, 0) / students.length).toFixed(1);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Danh sách sinh viên</h2>
            
            {/* 3. Hiển thị tuổi trung bình */}
            <div style={{ marginBottom: "15px", padding: "10px", background: "#e1f5fe", borderRadius: "5px" }}>
                <strong>Tuổi trung bình:</strong> {averageAge} tuổi
            </div>

            {students.map((student, index) => (
                <div key={student.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderLeft: "4px solid #3498db",
                    // 2. Đổi màu text nếu tuổi >= 20
                    color: student.age >= 20 ? "#27ae60" : "#2c3e50",
                    fontWeight: student.age >= 20 ? "bold" : "normal"
                }}>
                    {/* 1. STT dùng index + 1 */}
                    <span>{index + 1}. </span>
                    {student.name} - {student.age} tuổi 
                    {student.age >= 20 && " (>= 20)"}
                </div>
            ))}
        </div>
    );
}

export default ListReadChallenge;
```

---

## 📝 Lời giải Bài 6.2 — Thêm phần tử (CREATE)

### Yêu cầu thử thách:
1. Validate: không cho thêm nếu tên trống.
2. Hiển thị "Đã thêm thành công!" sau khi thêm.
3. Focus lại vào input sau khi thêm (Sử dụng `useRef`).

### Mã nguồn React Component (`CreateItemChallenge.jsx`):
```jsx
import React, { useState, useRef } from "react";

function CreateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Giao diện Header" },
        { id: 2, name: "Chức năng Đăng nhập" }
    ]);
    const [newName, setNewName] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    // 3. Dùng useRef để điều khiển focus của input
    const inputRef = useRef(null);

    function handleAdd() {
        // 1. Validate: Không cho thêm nếu trống
        if (newName.trim() === "") {
            alert("Tên không được để trống!");
            inputRef.current.focus();
            return;
        }
        
        const newItem = { id: Date.now(), name: newName };
        setItems([...items, newItem]);
        
        setNewName("");
        
        // 2. Hiển thị thông báo và tự động ẩn sau 3 giây
        setSuccessMsg("Đã thêm thành công!");
        setTimeout(() => setSuccessMsg(""), 3000);
        
        // 3. Focus lại vào input
        inputRef.current.focus();
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Thêm Task Mới</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    ref={inputRef} // Gắn ref vào thẻ input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Nhập tên task..."
                    style={{ padding: "8px", marginRight: "10px", width: "250px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", cursor: "pointer" }}>
                    ➕ Thêm
                </button>
            </div>

            {/* Thông báo thành công */}
            {successMsg && <div style={{ color: "#27ae60", marginBottom: "10px", fontWeight: "bold" }}>✅ {successMsg}</div>}
            
            <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map(item => (
                    <li key={item.id} style={{ padding: "10px", borderBottom: "1px solid #eee", background: "#fff" }}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreateItemChallenge;
```

---

## 📝 Lời giải Bài 6.3 — Xóa phần tử (DELETE)

### Yêu cầu thử thách:
1. Hiển thị "Đã xóa [tên]" sau khi xóa.
2. Thêm nút "Hoàn tác" trong 5 giây.
3. Chỉ cho xóa khi confirm.

### Mã nguồn React Component (`DeleteItemChallenge.jsx`):
```jsx
import React, { useState, useEffect } from "react";

function DeleteItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Ăn sáng" },
        { id: 2, name: "Đổ xăng" },
        { id: 3, name: "Mua tài liệu" }
    ]);
    
    const [deletedInfo, setDeletedInfo] = useState(null);

    // Tự động dọn dẹp trạng thái hoàn tác sau 5 giây
    useEffect(() => {
        if (deletedInfo) {
            const timer = setTimeout(() => {
                setDeletedInfo(null); // Xóa cơ hội hoàn tác sau 5s
            }, 5000);
            return () => clearTimeout(timer); // Cleanup timer nếu component unmount hoặc render lại
        }
    }, [deletedInfo]);

    function handleDelete(itemToDelete) {
        // 3. Bắt confirm trước khi xóa
        if (!window.confirm(`Bạn có chắc muốn xóa "${itemToDelete.name}" không?`)) {
            return;
        }

        // Xóa khỏi mảng chính
        setItems(items.filter(item => item.id !== itemToDelete.id));
        
        // 1 & 2. Lưu lại thông tin để hiển thị thông báo và cho phép hoàn tác
        setDeletedInfo({
            item: itemToDelete,
            message: `Đã xóa "${itemToDelete.name}"`
        });
    }

    function handleUndo() {
        if (deletedInfo) {
            // Khôi phục item vào mảng
            setItems([...items, deletedInfo.item]);
            // Ẩn thông báo
            setDeletedInfo(null);
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Quản lý danh sách</h2>

            {/* Khu vực thông báo & Hoàn tác */}
            {deletedInfo && (
                <div style={{ 
                    padding: "10px 15px", 
                    background: "#333", 
                    color: "white", 
                    borderRadius: "4px", 
                    display: "flex", 
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    alignItems: "center"
                }}>
                    <span>{deletedInfo.message}</span>
                    <button onClick={handleUndo} style={{ background: "transparent", color: "#f1c40f", border: "1px solid #f1c40f", padding: "4px 8px", cursor: "pointer" }}>
                        ↩ Hoàn tác (5s)
                    </button>
                </div>
            )}

            {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "5px 0", background: "#f9f9f9", border: "1px solid #ddd" }}>
                    <span>{item.name}</span>
                    <button onClick={() => handleDelete(item)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>
                        Xóa
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DeleteItemChallenge;
```

---

## 📝 Lời giải Bài 6.4 — Sửa phần tử (UPDATE)

### Yêu cầu thử thách:
1. Highlight ô input khi đang sửa.
2. Không cho lưu nếu tên trống.
3. Hiển thị "Đã lưu!" sau khi sửa.

### Mã nguồn React Component (`UpdateItemChallenge.jsx`):
```jsx
import React, { useState } from "react";

function UpdateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML & CSS" },
        { id: 2, name: "JavaScript Cơ bản" }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [saveMessage, setSaveMessage] = useState("");

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setSaveMessage(""); // Reset thông báo
    }

    function saveEdit() {
        // 2. Validate: Không cho lưu nếu trống
        if (editName.trim() === "") {
            alert("Tên không được để trống!");
            return;
        }

        setItems(items.map(item => 
            item.id === editingId ? { ...item, name: editName } : item
        ));
        
        setEditingId(null);
        
        // 3. Hiện thông báo Đã lưu
        setSaveMessage("✅ Đã lưu thay đổi!");
        setTimeout(() => setSaveMessage(""), 2000);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h2>Chỉnh sửa dữ liệu</h2>
            
            {saveMessage && <div style={{ color: "#27ae60", marginBottom: "10px", fontWeight: "bold" }}>{saveMessage}</div>}

            {items.map(item => (
                <div key={item.id} style={{ padding: "12px", margin: "8px 0", background: editingId === item.id ? "#fff9c4" : "#f1f2f6", borderRadius: "5px", transition: "background 0.3s" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                autoFocus
                                // 1. Highlight input khi đang sửa
                                style={{ 
                                    flex: 1, 
                                    padding: "8px", 
                                    border: "2px solid #e67e22", 
                                    outline: "none",
                                    borderRadius: "4px"
                                }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "0 15px", cursor: "pointer", borderRadius: "4px" }}>Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#7f8c8d", color: "white", border: "none", padding: "0 15px", cursor: "pointer", borderRadius: "4px" }}>Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "16px" }}>{item.name}</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItemChallenge;
```
