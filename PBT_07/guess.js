// guess.js
function startGame() {
    // 1. Máy random 1 số từ 1-100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    const maxAttempts = 7;
    let attempts = 0;
    
    // Mảng lưu lịch sử các số user đã nhập
    let guessedNumbers = [];

    // Vòng lặp game
    while (attempts < maxAttempts) {
        let remaining = maxAttempts - attempts;
        
        // 2. User nhập số
        let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}.\nNhập một số từ 1 đến 100:`);
        
        // Xử lý nếu user bấm Cancel trong cửa sổ prompt
        if (input === null) {
            alert("Bạn đã hủy trò chơi!");
            return; 
        }

        // Chuyển chuỗi nhập vào thành số nguyên
        let guess = parseInt(input, 10);

        // --- Validate input ---
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng chỉ nhập số hợp lệ từ 1 đến 100!");
            continue; // Bỏ qua, không tính là 1 lần đoán
        }

        // --- Kiểm tra số đã đoán chưa ---
        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Hãy thử số khác.");
            continue; // Bỏ qua, không tính là 1 lần đoán
        }

        // Vượt qua validate -> Ghi nhận lượt đoán hợp lệ
        guessedNumbers.push(guess);
        attempts++;

        // --- Kiểm tra kết quả ---
        if (guess === targetNumber) {
            // 4. Đoán đúng
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return; // Kết thúc game
        } else if (guess < targetNumber) {
            // Nếu chưa hết lượt thì mới gợi ý
            if (attempts < maxAttempts) {
                alert("Cao hơn! (Số bí mật lớn hơn số bạn vừa nhập)");
            }
        } else {
            if (attempts < maxAttempts) {
                alert("Thấp hơn! (Số bí mật nhỏ hơn số bạn vừa nhập)");
            }
        }
    }

    // 5. Hết 7 lần mà vẫn chưa return (chưa đoán đúng) -> Thua
    alert(`Bạn đã hết lượt! GAME OVER.\nSố bí mật chính là: ${targetNumber}`);
}