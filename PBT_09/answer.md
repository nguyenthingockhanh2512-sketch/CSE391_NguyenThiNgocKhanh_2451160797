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
```html
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
```
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

document.querySelector("#incrementBtn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count; // Dùng textContent tốt và an toàn hơn innerHTML
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    
    // Sửa 7: Dùng arrow function và gọi trực tiếp hàm remove trên element
    li.addEventListener("click", () => {
        li.remove();
    });
    historyList.append(li);
});

// Sửa 1: "onclick" -> "click"
document.querySelector("#decrementBtn").addEventListener("click", () => {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // Sửa 2: Cập nhật textContent thay vì gán đè biến DOM
    countDisplay.textContent = count;
    // Sửa 6: Gán chuỗi rỗng thay vì null
    historyList.innerHTML = ''; 
});

// Đã có method .remove() tích hợp sẵn trong DOM nên hàm này thực ra không cần thiết nữa
/* function deleteHistory(element) {
    element.parentNode.removeChild(element);
} 
*/

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        // Sửa 3: Thêm ngoặc đơn () để gọi hàm
        item.remove();
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // Sửa 4: Ép kiểu dữ liệu về số (Number)
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // Sửa 5: Phục hồi lại dữ liệu cho History List
    historyList.innerHTML = localStorage.getItem("history") || '';
    
    // Lưu ý phụ: Vì innerHTML chỉ tạo lại HTML tĩnh, các thẻ li được tải lên từ localStorage 
    // sẽ bị mất event listener "click" (không thể click để xóa được nữa). 
    // Giải pháp hoàn hảo cho vấn đề này là sử dụng Event Delegation (gắn 1 event duy nhất lên historyList).
});
```

### Câu C2 (7đ) — Performance

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?
    Tiêu tốn bộ nhớ (Memory Leak): Khi bạn dùng addEventListener lên 1000 phần tử, trình duyệt phải tạo ra và lưu trữ 1000 hàm (objects) xử lý sự kiện riêng biệt trong bộ nhớ RAM. Điều này làm trang web nặng nề và dễ bị giật lag.

    Giảm hiệu suất khởi tạo (Performance): Vòng lặp gắn 1000 sự kiện lúc trang vừa tải sẽ tốn thời gian xử lý của CPU (Main Thread), làm chậm quá trình hiển thị giao diện ban đầu của người dùng.

Event Delegation giải quyết thế nào?
    Event Delegation (Ủy quyền sự kiện) giải quyết bằng cách áp dụng cơ chế Event Bubbling (Sự kiện sủi bọt).

    Cách hoạt động: Thay vì gắn 1000 sự kiện cho 1000 phần tử con, bạn chỉ gắn 1 sự kiện duy nhất cho phần tử cha chứa chúng. Khi người dùng click vào phần tử con, sự kiện đó sẽ "sủi bọt" (chạy ngược lên) phần tử cha.

    Tại phần tử cha, ta dùng event.target để xác định chính xác phần tử con nào vừa bị click và xử lý.

    Lợi ích: Chỉ có 1 event listener trong RAM. Các phần tử con được thêm vào sau này (dynamic) vẫn tự động nhận được sự kiện mà không cần bind lại.
    2. Cho code:
```javascript

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Nối phần tử vào fragment thay vì nối thẳng vào document.body
    fragment.appendChild(div); 
}
// Chèn toàn bộ fragment vào body duy nhất 1 lần
document.body.appendChild(fragment);
```
---

