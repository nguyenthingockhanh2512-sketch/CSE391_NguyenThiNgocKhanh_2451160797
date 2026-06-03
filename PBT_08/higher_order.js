// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("--- TEST PIPE ---");
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log("\n--- TEST MEMOIZE ---");
console.log(expensiveCalc(1000000)); // → In "Đang tính..." rồi ra kết quả
console.log(expensiveCalc(1000000)); // → Không in "Đang tính...", lấy từ cache


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

console.log("\n--- TEST DEBOUNCE ---");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("a");
search("ap");
search("app");
search("appl");
search("apple"); // Chỉ lần gọi cuối này mới thực thi sau 500ms


// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Lỗi ở lần thử ${attempt}...`);
            if (attempt === maxAttempts) {
                throw new Error(`Đã thất bại sau ${maxAttempts} lần thử.`);
            }
        }
    }
}

console.log("\n--- TEST RETRY ---");
let attemptCount = 0;
const unstableFetch = async () => {
    attemptCount++;
    if (attemptCount < 3) throw new Error("Network Error");
    return "Lấy dữ liệu thành công!";
};

(async () => {
    try {
        const result = await retry(unstableFetch, 3);
        console.log("Kết quả cuối:", result);
    } catch (err) {
        console.error(err.message);
    }
})();