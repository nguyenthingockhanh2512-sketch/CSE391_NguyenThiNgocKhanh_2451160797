// Mảng lưu trữ danh sách món ăn người dùng chọn trên giao diện
let currentOrderItems = [];

// Thiết lập mặc định ngày hôm nay vào ô input Date cho tiện sử dụng
document.getElementById('order-date').valueAsDate = new Date();

// Hàm thêm món ăn tạm thời vào danh sách order
function addItemToList() {
    const nameInput = document.getElementById('food-name');
    const priceInput = document.getElementById('food-price');
    const qtyInput = document.getElementById('food-qty');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(qtyInput.value);

    // Validate dữ liệu đầu vào đơn giản
    if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
        alert("Vui lòng nhập tên món, giá tiền và số lượng hợp lệ!");
        return;
    }

    // Đẩy vào mảng lưu trữ
    currentOrderItems.push({ name, price, quantity });

    // Cập nhật hiển thị danh sách món tạm thời lên giao diện
    renderTemporaryList();

    // Reset các ô nhập món ăn để tiện nhập món tiếp theo
    nameInput.value = "";
    priceInput.value = "";
    qtyInput.value = "1";
}

// Hàm hiển thị danh sách món ăn đã thêm tạm thời
function renderTemporaryList() {
    const container = document.getElementById('selected-items');
    if (currentOrderItems.length === 0) {
        container.innerHTML = '<div style="color: #95a5a6; text-align: center; margin-top: 20px;">Chưa có món nào được chọn.</div>';
        return;
    }

    container.innerHTML = "";
    currentOrderItems.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
            <span>${index + 1}. ${item.name} (x${item.quantity})</span>
            <strong>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</strong>
        `;
        container.appendChild(row);
    });
}

// Hàm xử lý chính: Tính toán hóa đơn và xuất text dạng hộp vuông chuẩn đét
function processInvoice() {
    const receiptBox = document.getElementById('receipt-box');
    const includeTip = document.getElementById('include-tip').checked;
    const customDateStr = document.getElementById('order-date').value;

    if (currentOrderItems.length === 0) {
        alert("Vui lòng thêm ít nhất 1 món ăn vào danh sách trước khi xuất hóa đơn!");
        return;
    }

    // 1. Tính tổng tiền gốc các món ăn
    let subTotal = 0;
    currentOrderItems.forEach(item => {
        subTotal += item.price * item.quantity;
    });

    // 2. Định mức giảm giá theo tổng số tiền
    let discountPercent = 0;
    if (subTotal > 1000000) {
        discountPercent = 15;
    } else if (subTotal > 500000) {
        discountPercent = 10;
    }

    // 3. Kiểm tra ngày Thứ 4 (Wednesday) để giảm thêm 5%
    // Lưu ý: getDay() của Object Date trả về: 0 = Chủ Nhật, 1 = Thứ 2, 2 = Thứ 3, 3 = Thứ 4 (Wednesday)
    let orderDate = customDateStr ? new Date(customDateStr) : new Date();
    if (orderDate.getDay() === 3) {
        discountPercent += 5;
    }

    // 4. Tính toán chi phí tài chính nâng cao
    let discountAmount = subTotal * (discountPercent / 100);
    let amountAfterDiscount = subTotal - discountAmount;

    let vatAmount = amountAfterDiscount * 0.08; // 8% VAT
    let tipAmount = includeTip ? (amountAfterDiscount * 0.05) : 0; // 5% Tip nếu tích chọn

    let totalPayment = amountAfterDiscount + vatAmount + tipAmount;

    // 5. Khởi tạo hàm bổ trợ định dạng chuỗi hộp chữ cố định chiều rộng
    const formatVND = (num) => num.toLocaleString('vi-VN') + "đ";
    
    // Hàm padding để đồng bộ chiều dọc, đảm bảo độ rộng của hóa đơn luôn là 38 ký tự không dấu
    const padLine = (text, length = 38) => {
        let spaceCount = length - text.replace(/[\u0300-\u036f]/g, "").length; 
        return text + " ".repeat(spaceCount > 0 ? spaceCount : 0);
    };

    // Bắt đầu lắp ráp chuỗi ký tự Hóa Đơn nghệ thuật (ASCII Art)
    let receiptText = "";
    receiptText += "╔══════════════════════════════════════╗\n";
    receiptText += "║        HÓA ĐƠN NHÀ HÀNG              ║\n";
    receiptText += "╠══════════════════════════════════════╣\n";

    // In danh sách các món ăn lặp qua mảng
    currentOrderItems.forEach((item, index) => {
        let priceK = `${item.price / 1000}k`;
        let totalK = `${(item.price * item.quantity) / 1000}k`;
        
        // Cắt bớt tên món nếu tên quá dài gây vỡ khung hộp chữ
        let displayName = item.name.length > 11 ? item.name.substring(0, 9) + ".." : item.name.padEnd(11);
        
        let line = `║ ${index + 1}. ${displayName} x${item.quantity}    @${priceK.padEnd(4)} = ${totalK}`;
        receiptText += padLine(line) + "║\n";
    });

    receiptText += "╠══════════════════════════════════════╣\n";
    
    // In các thông số thành tiền ép khoảng cách về phía bên phải
    receiptText += padLine(`║ Tổng cộng:`).substring(0, 26) + formatVND(subTotal).padStart(12) + " ║\n";
    receiptText += padLine(`║ Giảm giá (${discountPercent}%):`).substring(0, 26) + formatVND(discountAmount).padStart(12) + " ║\n";
    receiptText += padLine(`║ VAT (8%):`).substring(0, 26) + formatVND(vatAmount).padStart(12) + " ║\n";
    receiptText += padLine(`║ Tip (${includeTip ? '5%' : '0%'}):`).substring(0, 26) + formatVND(tipAmount).padStart(12) + " ║\n";
    
    receiptText += "╠══════════════════════════════════════╣\n";
    receiptText += padLine(`║ THANH TOÁN:`).substring(0, 26) + formatVND(totalPayment).padStart(12) + " ║\n";
    receiptText += "╚══════════════════════════════════════╝";

    // Đổ toàn bộ chuỗi ký tự vừa dựng ra màn hình giao diện
    receiptBox.innerText = receiptText;
}