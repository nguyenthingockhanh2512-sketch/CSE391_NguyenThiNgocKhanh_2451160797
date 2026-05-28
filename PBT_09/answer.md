# 📋 PHIẾU BÀI TẬP 09
# **DOM MANIPULATION & EVENTS**

> **Tài liệu tham chiếu:** `tuan_5_javascript_dom_async/19_dom_manipulation.md`
---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

Cho HTML:

```html
<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
```

1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
Document
└── <html>
    └── <body>
        └── <div id="app">
            ├── <header>
            │   ├── <h1> (text: "Todo App")
            │   └── <nav>
            │       ├── <a href="#" class="active"> (text: "All")
            │       ├── <a href="#"> (text: "Active")
            │       └── <a href="#"> (text: "Completed")
            └── <main>
                ├── <form id="todoForm">
                │   ├── <input id="todoInput" type="text">
                │   └── <button type="submit"> (text: "Add")
                └── <ul id="todoList">
                    ├── <li class="todo-item"> (text: "Learn HTML")
                    └── <li class="todo-item completed"> (text: "Learn CSS")
2. Viết **querySelector** cho mỗi yêu cầu:
    Chọn thẻ <h1>: document.querySelector('h1')

    Chọn input trong form: document.querySelector('#todoForm input') hoặc document.querySelector('#todoInput')

    Chọn tất cả .todo-item: document.querySelectorAll('.todo-item')

    Chọn link đang active: document.querySelector('nav a.active')

    Chọn <li> đầu tiên trong #todoList: document.querySelector('#todoList li:first-child')

    Chọn tất cả <a> bên trong <nav>: document.querySelectorAll('nav a')

### Câu A2 (5đ) — innerHTML vs textContent

**Câu hỏi bảo mật:** Tại sao `innerHTML` có thể gây lỗ hổng **XSS**? Viết 1 ví dụ code minh họa:
    innerHTML: Lấy hoặc thiết lập nội dung HTML bên trong một phần tử. Khi gán giá trị, trình duyệt sẽ parse (phân tích) chuỗi đó thành các DOM nodes (các thẻ HTML). Dùng khi bạn thực sự muốn render các thẻ HTML động.

    textContent: Lấy hoặc thiết lập nội dung văn bản thô (raw text). Trình duyệt sẽ xem mọi thứ là văn bản, không render thẻ HTML. Dùng khi cập nhật chữ/số để đảm bảo an toàn và tốc độ.

Bảo mật & XSS:
innerHTML dễ gây lỗi bảo mật Cross-Site Scripting (XSS) vì nếu chuỗi gán vào có chứa các thẻ <script> hoặc các attributes thực thi mã (như onerror), trình duyệt sẽ thực thi chúng.
```javascript

// CÁCH SỬA :
const userInput = document.querySelector("#search").value;
// Thay innerHTML bằng textContent, trình duyệt sẽ in ra nguyên văn đoạn string chứa thẻ <img> thay vì render nó.
document.querySelector("#result").textContent = userInput;
```

### Câu A3 (5đ) — Event Bubbling

Không chạy code, dự đoán thứ tự console.log:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();  ← nếu bỏ comment → output thay đổi thế nào?
});
```

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>


Khi click vào button (mặc định): Trình duyệt sẽ kích hoạt event từ element sâu nhất (target) lên các phần tử cha (bubbling phase).
Output: BUTTON ➞ INNER ➞ OUTER

Khi bỏ comment e.stopPropagation(): Hàm này sẽ ngăn chặn sự kiện sủi bọt lên các phần tử cha.
Output: BUTTON
```
---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

Tìm và sửa **tất cả lỗi** (ít nhất 7 lỗi):

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("onclick", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay = count;
    historyList.innerHTML = null;
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove;
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

### Câu C2 (7đ) — Performance

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?

2. Cho code:
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
Refactor dùng `DocumentFragment` để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 10-15 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "Mini Todo App từ Zero bằng DOM"

**Yêu cầu:** Quay video tạo Todo App cơ bản hoàn chỉnh (Add + Delete + Toggle) từ đầu.

**Trong video, bạn phải:**

1. 🎤 Tạo HTML skeleton: form + input + button + ul (empty)
2. 🎤 Viết JS: `document.querySelector` cho form, input, list — giải thích mỗi selector
3. 🎤 `form.addEventListener("submit", ...)` — giải thích:
   - Tại sao dùng `submit` event thay vì `click` trên button?
   - `e.preventDefault()` — nếu không có thì sao? Demo TRƯỚC khi thêm → trang reload
4. 🎤 `document.createElement("li")` + `appendChild` — giải thích tạo DOM node
5. 🎤 Thêm nút ❌ xóa: Bind event trên nút → `li.remove()` — giải thích
6. 🎤 Toggle completed: Click vào text → `classList.toggle("completed")` — giải thích toggle
7. 🎤 Demo cuối: Thêm 3 todos → Toggle 1 → Xóa 1 → Show kết quả
8. 🎤 Giải thích: Tại sao dùng `createElement` thay vì `innerHTML`? (XSS risk)

**Code mẫu cần thực hiện:**

```javascript
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    const li = document.createElement("li");
    li.textContent = input.value;
    
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
    input.value = "";
    input.focus();
});
```

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ code từng dòng HTML → CSS → JS
- [ ] Demo: preventDefault trước/sau, thêm/xóa/toggle todo
- [ ] Cuối video: Tổng kết DOM Manipulation flow

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C
- [ ] Folder `todo_app/` — Bài B1 (index.html + style.css + app.js)
- [ ] Folder `product_catalog/` — Bài B2
- [ ] Folder `form_validator/` — Bài B3
- [ ] Folder `keyboard_app/` — Bài B4
- [ ] Folder `screenshots/` — mỗi app ít nhất 2 screenshots
- [ ] 🎬 **Video OBS** — `videos/PBT09_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] **Video demo** (khuyến khích): Quay màn hình 30s mỗi app đang hoạt động
- [ ] Ít nhất **5 commits** (1 commit/bài ≠ dồn commit)