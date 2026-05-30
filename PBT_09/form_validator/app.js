// === 1. LẤY CÁC PHẦN TỬ DOM ===
const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');

const nameInput = document.getElementById('name');
const nameIcon = document.getElementById('nameIcon');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

const pwdInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const confirmPwd = document.getElementById('confirmPwd');
const confirmError = document.getElementById('confirmError');

const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');

// === 2. QUẢN LÝ TRẠNG THÁI FORM ===
// Object này theo dõi xem từng ô nhập liệu đã hợp lệ hay chưa
const formState = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// Hàm kiểm tra tổng thể: Nếu tất cả đều true thì mở khóa nút Submit
function checkOverallValidity() {
    // Object.values(formState) tạo ra mảng [false, false, false, false, false]
    // .every(val => val) kiểm tra xem TẤT CẢ các phần tử trong mảng có bằng true không
    const isFormValid = Object.values(formState).every(val => val === true);
    
    // Nếu isFormValid là true thì disabled = false (tức là mở khóa)
    submitBtn.disabled = !isFormValid;
}

// === 3. XỬ LÝ VALIDATION REAL-TIME ===

// 3.1. Validate Tên (2 - 50 ký tự)
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    
    if (val.length === 0) {
        nameIcon.textContent = '';
        formState.name = false;
    } else if (val.length >= 2 && val.length <= 50) {
        nameIcon.textContent = '✅';
        formState.name = true;
    } else {
        nameIcon.textContent = '❌';
        formState.name = false;
    }
    checkOverallValidity();
});

// 3.2. Validate Email (Dùng Biểu thức chính quy - Regex)
emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    // Chuỗi Regex kiểm tra định dạng email cơ bản (có @ và dấu chấm)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (val.length === 0) {
        emailError.textContent = '';
        formState.email = false;
    } else if (!emailRegex.test(val)) {
        emailError.textContent = 'Email không đúng định dạng';
        formState.email = false;
    } else {
        emailError.textContent = '';
        formState.email = true;
    }
    checkOverallValidity();
});

// 3.3. Đo độ mạnh Mật khẩu
pwdInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0; // 0: Trống, 1: Yếu, 2: Trung bình, 3: Mạnh

    // Kiểm tra các điều kiện bằng Regex
    const hasLettersAndNumbers = /[a-zA-Z]/.test(val) && /[0-9]/.test(val);
    const isStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(val);

    if (val.length >= 8) {
        if (isStrong) {
            strength = 3; // Mạnh (Có chữ hoa, chữ thường, số, ký tự đặc biệt)
        } else if (hasLettersAndNumbers) {
            strength = 2; // Trung bình (Có chữ và số)
        } else {
            strength = 1; // Yếu (Chỉ cần dài hơn 8 ký tự)
        }
    }

    // Cập nhật giao diện thanh Strength Bar
    if (strength === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        formState.password = false; // Phải ít nhất 8 ký tự mới hợp lệ
    } else if (strength === 1) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = '#ef4444'; // Màu Đỏ
        strengthText.textContent = 'Yếu';
        strengthText.style.color = '#ef4444';
        formState.password = true; // Yếu nhưng vẫn cho qua
    } else if (strength === 2) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = '#eab308'; // Màu Vàng
        strengthText.textContent = 'Trung bình';
        strengthText.style.color = '#eab308';
        formState.password = true;
    } else if (strength === 3) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#22c55e'; // Màu Xanh
        strengthText.textContent = 'Mạnh';
        strengthText.style.color = '#22c55e';
        formState.password = true;
    }

    // QUAN TRỌNG: Khi mật khẩu thay đổi, phải kiểm tra lại ô Xác nhận mật khẩu ngay lập tức
    validateConfirmPassword();
    checkOverallValidity();
});

// 3.4. Xác nhận mật khẩu (Hàm được tách riêng để gọi lại khi ô Password thay đổi)
function validateConfirmPassword() {
    const pwdVal = pwdInput.value;
    const confirmVal = confirmPwd.value;

    if (confirmVal.length === 0) {
        confirmError.textContent = '';
        formState.confirm = false;
    } else if (confirmVal !== pwdVal) {
        confirmError.textContent = 'Mật khẩu không khớp';
        formState.confirm = false;
    } else {
        confirmError.textContent = '';
        formState.confirm = true;
    }
}

// Bắt sự kiện gõ trên ô Xác nhận mật khẩu
confirmPwd.addEventListener('input', () => {
    validateConfirmPassword();
    checkOverallValidity();
});

// 3.5. Format Số điện thoại (Tự động thêm gạch nối: 0901-234-567)
phoneInput.addEventListener('input', (e) => {
    // Xóa tất cả các ký tự không phải là số (Dùng Regex \D)
    let val = e.target.value.replace(/\D/g, '');
    
    // Thêm dấu gạch nối dựa trên độ dài chuỗi số
    if (val.length > 4) val = val.slice(0, 4) + '-' + val.slice(4);
    if (val.length > 8) val = val.slice(0, 8) + '-' + val.slice(8, 11);
    
    // Cập nhật lại giá trị hiển thị trên input
    e.target.value = val;

    // Số điện thoại hợp lệ khi có đúng định dạng XXXX-XXX-XXX (tổng cộng 12 ký tự)
    if (val.length === 12) {
        phoneError.textContent = '';
        formState.phone = true;
    } else if (val.length > 0) {
        phoneError.textContent = 'Vui lòng nhập đủ 10 số';
        formState.phone = false;
    } else {
        phoneError.textContent = '';
        formState.phone = false;
    }
    
    checkOverallValidity();
});

// === 4. XỬ LÝ SUBMIT VÀ MODAL ===
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn trang tải lại
    
    // Đổ dữ liệu vào Modal
    const modalData = document.getElementById('modalData');
    modalData.innerHTML = `
        <p><strong>Tên:</strong> ${nameInput.value.trim()}</p>
        <p><strong>Email:</strong> ${emailInput.value.trim()}</p>
        <p><strong>Số ĐT:</strong> ${phoneInput.value}</p>
    `;
    
    // Hiển thị Modal bằng cách bỏ class 'hidden'
    document.getElementById('successModal').classList.remove('hidden');
});

// Đóng Modal và làm mới form
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.add('hidden');
    form.reset(); // Xóa sạch dữ liệu đã nhập
    
    // Phải reset luôn thanh bar và icon
    nameIcon.textContent = '';
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    
    // Reset lại Object trạng thái và khóa nút Submit
    for (let key in formState) formState[key] = false;
    checkOverallValidity();
});