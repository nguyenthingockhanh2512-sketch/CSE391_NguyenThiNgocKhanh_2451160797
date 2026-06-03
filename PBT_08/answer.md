# 📋 PHIẾU BÀI TẬP 08
# **JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/05_functions.md` + `06_arrays_objects.md`


## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1.  Function Declaration
    function tinhThueBaoHiemDec(luong) {
        const thue = luong > 11000000 ? 0.1 : 0;
        return { thuong: 0, thuc_nhan: luong * (1 - thue) };
    }
2. Function Expression
    const tinhThueBaoHiemExp = function(luong) {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong * (1 - thue) };
};
3. Arrow Function
    const tinhThueBaoHiemArr = (luong) => {
    const thue = luong > 11000000 ? 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong * (1 - thue) };
};
Hàm tính: Thuế = 10% nếu lương > 11 triệu, 0% nếu ≤ 11 triệu. Trả về object `{ thuong, thuc_nhan }`.

**Câu hỏi:** 3 cách này có khác nhau về hoisting không? Giải thích bằng ví dụ code cụ thể.

    Function Declaration được hoisted hoàn toàn. có thể gọi hàm tinhThueBaoHiemDec() ở bất kỳ dòng nào trước khi nó được định nghĩa trong code.

    Function Expression và Arrow Function (sử dụng const hoặc let) được đưa vào Temporal Dead Zone (TDZ). Nghĩa là trình duyệt biết sự tồn tại của biến đó, nhưng nếu bạn cố gọi hàm trước dòng khởi tạo, JavaScript sẽ báo lỗi ReferenceError.
### Câu A2 (5đ) — Scope & Closure

Không chạy code, dự đoán output:

```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 100ms:
// var: 3
// var: 3
// var: 3

// Output sau 200ms:
// let: 0
// let: 1
// let: 2

Giải thích chi tiết: Tại sao `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout?
Giải thích sự khác biệt giữa var và let:

    var i có Function/Global Scope. Vòng lặp chạy rất nhanh và kết thúc ở i = 3. Khi các hàm callback trong setTimeout chạy sau 100ms, chúng đều trỏ đến chung một vùng nhớ của biến i (lúc này đã mang giá trị 3).

    let j có Block Scope. Mỗi lần vòng lặp chạy, một phạm vi (scope) hoàn toàn mới và một biến j mới được tạo ra. Hàm callback trong setTimeout tạo thành một Closure "gói" lại giá trị của j tại chính thời điểm của vòng lặp đó. Do đó, các giá trị 0, 1, 2 được lưu giữ riêng biệt.

### Câu A3 (5đ) — Array Methods

Đọc chương 06. Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

Viết **1 dòng code** cho mỗi yêu cầu (dùng arrow function):

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, n) => acc + n, 0);

// 4. Tìm số đầu tiên > 7
const firstGreaterThan7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const strArray = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse(); // Hoặc nums.slice().reverse()


### Câu A4 (5đ) — Object Destructuring & Spread

Không chạy code, dự đoán output:

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                      // ReferenceError: specs is not defined
// (Bởi vì cú pháp specs: { ram, color } chỉ dùng để phân rã thuộc tính con, biến specs không được tạo ra).

// Spread
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Không bị đổi)

// Spread gotcha
console.log(product.specs.ram);        // 16
// Tại sao? Toán tử spread (...) chỉ copy nông (shallow copy). Nghĩa là nó tạo ra object mới, nhưng thuộc tính lồng nhau (specs) vẫn trỏ về cùng một vùng nhớ tham chiếu (reference) với object gốc. Đổi copy.specs.ram sẽ làm đổi luôn product.specs.ram.
```

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Refactor Code

Code sau hoạt động đúng nhưng viết rất tệ. **Refactor** sử dụng array methods + arrow functions:

```javascript
// TRƯỚC (ugly code):
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Sort by finalTotal descending
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}

Viết lại thành ≤ 10 dòng dùng `filter`, `map`, `sort`, destructuring, arrow functions.

const processOrders = (orders) => orders
    .filter(({ status, total }) => status === 'completed' && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);

### Câu C2 (10đ) — Thiết kế API

const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Callback của map luôn nhận 3 tham số: phần tử hiện tại, index, và mảng gốc
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu hàm callback trả về true, đẩy phần tử đó vào mảng kết quả
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    
    reduce(arr, fn, initialValue) {
        // Nếu có truyền initialValue thì lấy nó, nếu không thì lấy phần tử đầu tiên của mảng
        let accumulator = initialValue !== undefined ? initialValue : arr[0];
        
        // Nếu có initialValue thì lặp từ phần tử 0, nếu không thì lặp từ phần tử 1
        let startIndex = initialValue !== undefined ? 0 : 1;
        
        for (let i = startIndex; i < arr.length; i++) {
            // Callback của reduce nhận: giá trị tích lũy, phần tử hiện tại, index, mảng gốc
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// ==========================
// TEST CASES
// ==========================
console.log(miniArray.map([1, 2, 3], x => x * 2));         // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));     // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10

// Test phải pass:
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```