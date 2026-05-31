#  Tier 7 — Mini Project: Todo App


## 🏗️ 1. Component Chính: `App.jsx` (Nâng cấp LocalStorage & Thống kê)

```jsx
import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // Đọc dữ liệu ban đầu từ LocalStorage (nếu có)
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("my_todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    // ===== Lưu vào LocalStorage mỗi khi todos thay đổi =====
    useEffect(() => {
        localStorage.setItem("my_todos", JSON.stringify(todos));
    }, [todos]);

    // ===== Thêm todo (Thêm ngày tạo) =====
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            done: false,
            createdAt: new Date().toLocaleDateString("vi-VN") // Level 1: Ngày tạo
        };
        
        setTodos([...todos, newTodo]);
        setInputValue("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") addTodo();
    }

    // ===== Các hàm CRUD cơ bản =====
    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    // ===== Cập nhật Todo (Level 2: Sửa Inline) =====
    function updateTodo(id, newText) {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    }

    // ===== Lọc todos =====
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });

    // ===== Thống kê =====
    const totalCount = todos.length;
    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = totalCount - activeCount;

    // Placeholder thay đổi theo filter (Level 1)
    const inputPlaceholder = filter === "completed" 
        ? "Không thể thêm việc đã hoàn thành..." 
        : "Nhập công việc mới...";

    return (
        <div style={{ maxWidth: "550px", margin: "40px auto", padding: "30px", fontFamily: "Arial, sans-serif", background: "#fdfdfd", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📋 Todo List</h1>
            
            {/* Input */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={inputPlaceholder}
                    disabled={filter === "completed"} // Khóa input nếu đang ở tab Hoàn thành
                    style={{ flex: 1, padding: "12px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "6px 0 0 6px", outline: "none" }}
                />
                <button 
                    onClick={addTodo}
                    disabled={filter === "completed"}
                    style={{ padding: "12px 25px", fontSize: "16px", background: filter === "completed" ? "#95a5a6" : "#3498db", color: "white", border: "none", borderRadius: "0 6px 6px 0", cursor: filter === "completed" ? "not-allowed" : "pointer" }}
                >
                    Thêm
                </button>
            </div>
            
            {/* Filter */}
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {/* Danh sách */}
            <div style={{ minHeight: "200px" }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "#999", fontStyle: "italic" }}>
                        {todos.length === 0 ? "📝 Chưa có công việc nào. Hãy thêm mới!" : "🔍 Không có công việc phù hợp với bộ lọc."}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onUpdate={updateTodo} // Truyền hàm update xuống component con
                        />
                    ))
                )}
            </div>
            
            {/* Footer Thống kê (Level 1) */}
            {totalCount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee", fontSize: "14px", color: "#7f8c8d" }}>
                    <span><strong>Tổng:</strong> {totalCount} việc</span>
                    <span><strong>Chưa xong:</strong> {activeCount}</span>
                    <span><strong>Hoàn thành:</strong> {completedCount}</span>
                </div>
            )}
        </div>
    );
}

export default App;
```

---

## 📝 2. Component Con: `components/TodoItem.jsx` (Nâng cấp Sửa Inline)

```jsx
import React, { useState, useRef, useEffect } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
    // Quản lý trạng thái đang sửa
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef(null);

    // Focus vào input khi bật chế độ sửa
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editText.trim() === "") {
            setEditText(todo.text); // Khôi phục text cũ nếu để trống
        } else {
            onUpdate(todo.id, editText); // Gọi hàm update từ App truyền xuống
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <div 
            onDoubleClick={() => !todo.done && setIsEditing(true)} // Double-click để sửa (Level 2)
            style={{ 
                display: "flex",
                alignItems: "center",
                padding: "15px",
                margin: "8px 0",
                background: todo.done ? "#f9f9f9" : "#fff",
                border: "1px solid #eee",
                borderLeft: todo.done ? "4px solid #bdc3c7" : "4px solid #3498db",
                borderRadius: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
        >
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "15px", width: "18px", height: "18px", cursor: "pointer" }}
            />
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {isEditing ? (
                    <input 
                        ref={inputRef}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave} // Bấm ra ngoài là tự lưu
                        onKeyDown={handleKeyDown}
                        style={{ padding: "6px", fontSize: "16px", border: "1px solid #3498db", borderRadius: "4px", outline: "none" }}
                    />
                ) : (
                    <span style={{ 
                        fontSize: "16px",
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#95a5a6" : "#2c3e50"
                    }}>
                        {todo.text}
                    </span>
                )}
                
                {/* Level 1: Hiển thị ngày tạo nhỏ ở dưới */}
                <span style={{ fontSize: "12px", color: "#bdc3c7", marginTop: "4px" }}>
                    Tạo ngày: {todo.createdAt}
                </span>
            </div>

            {/* Nút hành động */}
            <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
                {!todo.done && !isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        style={{ background: "#f1c40f", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}
                    >
                        ✏️
                    </button>
                )}
                <button 
                    onClick={() => onDelete(todo.id)}
                    style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}
                >
                    🗑
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
```

---

## 💡 Điểm sáng kiến trúc rút ra sau Mini Project

1. **Local Storage:** Hàm `useState` có thể nhận vào một `callback function`. React sẽ chỉ chạy hàm đó 1 lần duy nhất lúc khởi tạo để đọc dữ liệu từ `localStorage`, giúp tối ưu hiệu suất. Khi data thay đổi, `useEffect` sẽ tự động đồng bộ xuống máy người dùng.
2. **Luồng dữ liệu một chiều (One-way Data Binding):** Component `App` chứa dữ liệu gốc (State). Nó truyền dữ liệu đó xuống `TodoItem` qua **Props** (`todo={todo}`). Nếu `TodoItem` muốn sửa dữ liệu, nó không thể tự sửa, mà phải gọi hàm (`onUpdate`, `onToggle`) do `App` cung cấp.
