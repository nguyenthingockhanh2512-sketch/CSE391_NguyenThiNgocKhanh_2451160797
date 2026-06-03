// ==========================================
// Version 1: Classic
// In 1-100. Chia hết 3 → "Fizz", chia hết 5 → "Buzz", chia hết cả 2 → "FizzBuzz"
// ==========================================
function classicFizzBuzz() {
    console.log("--- RUNNING VERSION 1: CLASSIC FIZZBUZZ ---");
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}


// ==========================================
// Version 2: Custom
// Viết hàm customFizzBuzz(n, rules) hoạt động với BẤT KỲ bộ rules nào
// ==========================================
function customFizzBuzz(n, rules) {
    console.log(`\n--- RUNNING VERSION 2: CUSTOM FIZZBUZZ UP TO ${n} ---`);
    
    for (let i = 1; i <= n; i++) {
        let resultWord = "";

        // Duyệt qua từng quy tắc cấu hình trong mảng rules
        rules.forEach(rule => {
            if (i % rule.divisor === 0) {
                resultWord += rule.word; // Ghép chữ tuần tự nếu chia hết
            }
        });

        // Nếu chuỗi rỗng (không chia hết cho số nào), in ra chính số đó
        if (resultWord === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${resultWord}"`);
        }
    }
}


// ==========================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================

// 1. Chạy kiểm thử Version 1
classicFizzBuzz();

// 2. Chạy kiểm thử Version 2 với bộ dữ liệu mẫu từ đề bài
// (Để test được các trường hợp như 35 hay 105, chúng ta truyền n tương ứng)
const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

// Chạy test đến 30 theo yêu cầu gọi hàm mẫu
customFizzBuzz(30, rules);

// Chạy test mở rộng đến 105 để kiểm chứng kết quả ghép chuỗi: "FizzBuzzJazz"
// customFizzBuzz(105, rules);