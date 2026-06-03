# 📋 PHIẾU BÀI TẬP 07
# **JAVASCRIPT BASICS — Variables, Data Types, Control Structures**

> **Tài liệu tham chiếu:** `tuan_4_javascript_basics/01_basics_introduction.md` → `04_control_structures.md`


## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const

```javascript
// Đoạn 1
console.log(x);
var x = 5;
In ra undefined. 
Giải thích: Biến khai báo bằng var được hoisted (đưa lên đầu scope) nhưng chỉ phần khai báo, không đưa phần gán giá trị lên.

// Đoạn 2
console.log(y);
let y = 10;
Lỗi ReferenceError. 
Giải thích: Biến let cũng được hoisted nhưng nằm trong vùng "Temporal Dead Zone" (TDZ) cho đến khi dòng khai báo chạy. Ta không thể truy cập nó trước khi khởi tạo.

// Đoạn 3
const z = 15;
z = 20;
console.log(z);
Lỗi TypeError. 
Giải thích: const dùng để khai báo hằng số. Không thể gán lại giá trị cho một biến const sau khi đã khởi tạo.

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
In ra: [1, 2, 3, 4]. 
Giải thích: const với object/array chỉ bảo vệ tham chiếu (reference) đến bộ nhớ, không đóng băng (freeze) nội dung bên trong. Ta vẫn có thể thêm/sửa phần tử.

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
"Trong block: 2", sau đó "Ngoài block: 1". 
Giải thích: let có tính chất block scope (phạm vi khối mã {}). Biến a = 2 chỉ tồn tại bên trong cặp ngoặc nhọn.
```

### Câu A2 (5đ) — Data Types & Coercion

Không chạy code, dự đoán kết quả:

```javascript
console.log(typeof null);              // "object"
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "undefined"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // ""
console.log([] + {});                // "[object Object]"
console.log({} + []);                // 0
```
giải thích:
 "5" + 3 → "53" (Khi có dấu + và một toán hạng là chuỗi, JS sẽ chuyển toán hạng kia thành chuỗi và nối chuỗi).

"5" - 3 → 2 (Dấu - chỉ dùng cho phép toán số học, JS ép kiểu chuỗi "5" thành số 5 rồi trừ).


### Câu A3 (5đ) — So sánh == vs ===

Dự đoán `true` hay `false`:

```javascript
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```

**Quy tắc:** Từ giờ trở đi, luôn luôn dùng === (Strict Equality). Dùng === giúp tránh những lỗi tiềm ẩn do JavaScript tự động ép kiểu (Type Coercion) ngầm định, đảm bảo so sánh cả giá trị và kiểu dữ liệu.

### Câu A4 (5đ) — Truthy & Falsy

```javascript
if ("0") console.log("A");           // → In A ("0" là chuỗi khác rỗng → Truthy).
if ("") console.log("B");            // Không in (Chuỗi rỗng → Falsy).
if ([]) console.log("C");            // In C (Mọi Object/Array, dù rỗng, đều là Truthy).
if ({}) console.log("D");            // In D (Object rỗng → Truthy).
if (null) console.log("E");          // Không in (Falsy).
if (0) console.log("F");             // Không in (Falsy).
if (-1) console.log("G");            // In G (Số khác 0 → Truthy).
if (" ") console.log("H");           // In H (Chuỗi chứa khoảng trắng là chuỗi khác rỗng → Truthy).
```

### Câu A5 (5đ) — Template Literals

```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug JavaScript

Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}
Dòng lỗi: if (giaSauGiam = 0) 
Cách sửa: Đổi thành  ===: if (giaSauGiam === 0).
// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
Dòng lỗi: const gia = tinhGiaGiamGia("100000", 20)
Cách sửa: Truyền vào kiểu số 100000 hoặc dùng Number()

Dòng lỗi: return "Phần trăm giảm không hợp lệ" và return giaSauGiam
Cách sửa: Thêm dấu ; vào cuối tất cả câu lệnh và chuyển đổi toàn bộ var trong hàm thành let hoặc const.

Dòng lỗi: Hàm chỉ kiểm tra phanTramGiam mà bỏ qua giaBan
Cách sửa: Thêm điều kiện xác thực if (giaBan < 0).
```

### Câu C2 (10đ) — Bài toán thực tế

Viết chương trình tính hóa đơn nhà hàng:

```
Input: Danh sách món ăn + giá + số lượng
Quy tắc:
- Tổng > 500k → giảm 10%
- Tổng > 1 triệu → giảm 15%  
- Ngày thứ 3 (Wednesday) → giảm thêm 5%
- VAT 8%
- Tip 5% (optional)

Output: Hóa đơn chi tiết dạng:
╔══════════════════════════════════════╗
║        HÓA ĐƠN NHÀ HÀNG           ║
╠══════════════════════════════════════╣
║ 1. Phở bò      x2    @65k  = 130k  ║
║ 2. Trà đá      x3    @5k   = 15k   ║
║ 3. Bún chả     x1    @55k  = 55k   ║
╠══════════════════════════════════════╣
║ Tổng cộng:              200.000đ    ║
║ Giảm giá (0%):           0đ         ║
║ VAT (8%):                16.000đ    ║
║ Tip (5%):                10.000đ    ║
╠══════════════════════════════════════╣
║ THANH TOÁN:              226.000đ   ║
╚══════════════════════════════════════╝
```

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

> ⏱️ **Thời lượng video:** 7-10 phút
>
> 📖 **Xem quy định chi tiết tại [README.md](./README.md#-quy-định-video-thực-hành-obs)**

### Đề bài Video: Code-along "var/let/const + Type Coercion demo"

**Yêu cầu:** Quay video viết code JS trong browser console + file .js, vừa code vừa giải thích hành vi bất ngờ.

**Trong video, bạn phải:**

1. 🎤 Mở Chrome DevTools Console
2. 🎤 Demo hoisting: `console.log(x); var x = 5;` → giải thích tại sao ra `undefined`
3. 🎤 Demo `let`: `console.log(y); let y = 10;` → giải thích ReferenceError (TDZ)
4. 🎤 Demo `const`: gán lại `const z = 5; z = 10;` → TypeError. Nhưng `const arr = [1,2]; arr.push(3);` → OK. Giải thích tại sao.
5. 🎤 Type Coercion 5 câu:
   - `"5" + 3` → "53" (string concatenation)
   - `"5" - 3` → 2 (numeric coercion)
   - `true + true` → 2
   - `[] + {}` → ???
   - Giải thích quy tắc: `+` là nối chuỗi khi có string, `-` luôn convert số
6. 🎤 Demo `==` vs `===`: `5 == "5"` vs `5 === "5"` — giải thích strict equality
7. 🎤 Viết hàm `calculate(a, op, b)` trong file .js → chạy bằng Node.js → show kết quả

**Checklist video:**
- [ ] Đầu video: Giới thiệu tên + MSSV + lớp
- [ ] Webcam mặt SV ở góc phải dưới
- [ ] Gõ trực tiếp trong Console + file .js
- [ ] Dự đoán kết quả TRƯỚC khi chạy
- [ ] Cuối video: Tổng kết 3 quy tắc quan trọng nhất

---

## ✅ CHECKLIST NỘP BÀI

- [ ] File `answers.md` — Phần A + C1
- [ ] File `var_let_const.js` — Câu A1 kiểm chứng
- [ ] File `calculator.js` — Bài B1
- [ ] File `student_data.js` — Bài B2
- [ ] File `guess_number.html` + `guess.js` — Bài B3
- [ ] File `fizzbuzz.js` — Bài B4
- [ ] File `restaurant_bill.js` — Câu C2
- [ ] Folder `screenshots/` — kết quả chạy console
- [ ] 🎬 **Video OBS** — `videos/PBT07_HoTen_MaSV.mp4` (hoặc link YouTube/Drive)
- [ ] Ít nhất **4 commits**