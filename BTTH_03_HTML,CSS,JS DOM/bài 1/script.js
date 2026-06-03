const tbody = document.getElementById('student-tbody');
const formModal = document.getElementById('student-modal');
const studentForm = document.getElementById('student-form');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalTitle = document.getElementById('modal-title');
const totalStudentsEl = document.getElementById('total-students');
const averageScoreEl = document.getElementById('average-score');
const btnCalcAverage = document.getElementById('btn-calc-average');

// Đã chuẩn hóa gpa thành kiểu Number thay vì String
const defaultStudents = [
    { studentId: "2451160797", fullname: "Ngọc Khánh", dob: "2006-01-15", className: "66HTTT1", gpa: 8.5, email: "nk06@gmail.com" },
    { studentId: "2451160700", fullname: "Hải Yến", dob: "2006-02-20", className: "66HTTT1", gpa: 7.8, email: "ttb@gmail.com" },
    { studentId: "2451160120", fullname: "Vũ Nga", dob: "2004-03-10", className: "66HTTT1", gpa: 9.0, email: "lvc@gmail.com" },
    { studentId: "2451123444", fullname: "Trần Anh Thư", dob: "2004-04-05", className: "66HTTT1", gpa: 8.5, email: "ptd@gmail.com" },
    { studentId: "2451160478", fullname: "Hứa Quang Hán", dob: "2004-05-25", className: "66HTTT1", gpa: 8.2, email: "hve@gmail.com" }
];

let students = JSON.parse(localStorage.getItem('students'));

if (!students) {
    students = defaultStudents;
    localStorage.setItem('students', JSON.stringify(students));
}

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function renderStudents() {
    tbody.innerHTML = '';
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Chưa có dữ liệu sinh viên.</td></tr>';
        updateStatistics();
        return;
    }

    students.forEach((sv, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.studentId}</td>
            <td>${sv.fullname}</td>
            <td>${sv.dob}</td>
            <td>${sv.className}</td>
            <td>${sv.gpa}</td>
            <td>${sv.email}</td>
            <td>
                <button class="btn btn-warning btn-edit" data-index="${index}">Sửa</button>
                <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    updateStatistics();
}

function updateStatistics() {
    const total = students.length;
    let sumGpa = 0;
    students.forEach(sv => { 
        sumGpa += parseFloat(sv.gpa) || 0; 
    });
    const average = total > 0 ? (sumGpa / total).toFixed(2) : "0.0";

    totalStudentsEl.innerText = total;
    averageScoreEl.innerText = average;
}

function resetForm() {
    studentForm.reset();
    document.getElementById('edit-index').value = "-1";
    modalTitle.innerText = "Thêm sinh viên mới";
}

// Giờ đây nút này hoạt động bình thường vì đã tồn tại trong DOM
if (btnOpenModal) {
    btnOpenModal.addEventListener('click', function() {
        resetForm();
        formModal.classList.remove('hidden');
    });
}

if (btnCalcAverage) {
    btnCalcAverage.addEventListener('click', function() {
        updateStatistics();
        alert(`Điểm trung bình lớp: ${averageScoreEl.innerText}`);
    });
}

btnCloseModal.addEventListener('click', function() {
    formModal.classList.add('hidden');
});

studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const studentId = document.getElementById('student-id').value;
    const fullname = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('class-name').value;
    // Chuyển đổi điểm số về dạng Float trước khi đưa vào mảng
    const gpa = parseFloat(document.getElementById('gpa').value);
    const email = document.getElementById('email').value;

    const newStudent = { studentId, fullname, dob, className, gpa, email };
    const editIndex = parseInt(document.getElementById('edit-index').value);

    if (editIndex === -1) {
        students.push(newStudent);
        alert("Thêm sinh viên thành công!");
    } else {
        students[editIndex] = newStudent;
        alert("Cập nhật sinh viên thành công!");
    }

    saveStudents();
    renderStudents();
    formModal.classList.add('hidden');
});

tbody.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('btn-edit')) {
        const index = target.getAttribute('data-index');
        const sv = students[index];

        document.getElementById('student-id').value = sv.studentId;
        document.getElementById('fullname').value = sv.fullname;
        document.getElementById('dob').value = sv.dob;
        document.getElementById('class-name').value = sv.className;
        document.getElementById('gpa').value = sv.gpa;
        document.getElementById('email').value = sv.email;
        
        document.getElementById('edit-index').value = index;
        modalTitle.innerText = "Cập nhật sinh viên";
        formModal.classList.remove('hidden');
    }

    if (target.classList.contains('btn-delete')) {
        const index = target.getAttribute('data-index');
        const isConfirm = confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[index].fullname} không?`);
        if (isConfirm) {
            students.splice(index, 1);
            saveStudents();
            renderStudents();
        }
    }
});

renderStudents();