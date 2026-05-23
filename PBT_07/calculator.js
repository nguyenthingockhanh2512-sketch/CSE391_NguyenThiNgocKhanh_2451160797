
function calculate(num1, operator, num2) {
  // 1. Kiểm tra input không phải số
  // Dùng typeof để loại chuỗi/boolean và isNaN để loại trừ giá trị NaN
  if (typeof num1 !== "number" || typeof num2 !== "number" || isNaN(num1) || isNaN(num2)) {
    return "Lỗi: Input không phải số";
  }

  // 2. Xử lý phép tính và các edge cases còn lại
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      // Kiểm tra chia cho 0
      if (num2 === 0) return "Lỗi: Không thể chia cho 0";
      return num1 / num2;
    case "%":
      // Chia lấy dư cho 0 cũng gây lỗi toán học tương tự
      if (num2 === 0) return "Lỗi: Không thể chia cho 0";
      return num1 % num2;
    case "**":
      return num1 ** num2;
    default:
      // 3. Operator không hợp lệ
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// ================= TEST CASES =================
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // → 1024