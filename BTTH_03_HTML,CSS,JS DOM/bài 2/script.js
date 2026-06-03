// Lấy các phần tử DOM cần thiết
const taskContainer = document.getElementById('task-container');
const formModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCloseModalX = document.getElementById('btn-close-modal-x');
const modalTitle = document.getElementById('modal-title');
const btnSubmitText = document.getElementById('btn-submit-text');
const taskDescTextarea = document.getElementById('task-desc');
const charCurrent = document.getElementById('char-current');

// Bộ đếm thống kê số lượng
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');

// Dữ liệu mẫu (Khớp với hình ảnh mẫu trong file image_ae5d2d.jpg)
const defaultTasks = [
    { title: "Hoàn thành báo cáo tháng", desc: "Tổng hợp dữ liệu và viết báo cáo cho tháng này", deadline: "2026-03-22", priority: "Cao", completed: false },
    { title: "Họp nhóm dự án", desc: "Thảo luận tiến độ và kế hoạch tiếp theo", deadline: "2026-03-18", priority: "Trung bình", completed: false },
    { title: "Đọc sách kỹ năng", desc: "Đọc xong chương 5 của cuốn sách về React", deadline: "2026-03-29", priority: "Thấp", completed: true }
];

// Ép buộc xóa bỏ bộ nhớ đệm cũ bị lỗi nếu có, hoặc đọc dữ liệu mới
let tasks = JSON.parse(localStorage.getItem('grid_tasks'));

if (!tasks || tasks.length === 0) {
    tasks = defaultTasks;
    localStorage.setItem('grid_tasks', JSON.stringify(tasks));
}

function saveTasks() {
    localStorage.setItem('grid_tasks', JSON.stringify(tasks));
}

// Hàm format hiển thị ngày dd/mm/yyyy
function formatDate(dateString) {
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Render dữ liệu dưới dạng cấu trúc CARD
function renderTasks() {
    if (!taskContainer) return;
    taskContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        taskContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #7f8c8d; padding: 30px;">Danh sách trống. Hãy thêm công việc mới!</div>';
        updateStatistics();
        return;
    }

    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        const priorityClass = task.priority === 'Trung bình' ? 'Trung-bình' : task.priority;
        card.className = `task-card priority-${priorityClass} ${task.completed ? 'completed' : ''}`;

        card.innerHTML = `
            <div class="task-card-left">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-desc">${task.desc || ''}</div>
                </div>
                <div class="task-badges">
                    <span class="badge badge-priority-${priorityClass}"><i class="fa-solid fa-flag"></i> ${task.priority}</span>
                    <span class="badge badge-date"><i class="fa-solid fa-calendar-days"></i> ${formatDate(task.deadline)}</span>
                </div>
            </div>
            <div class="task-card-right">
                <button class="action-icon-btn btn-check-toggle ${task.completed ? 'is-done' : ''}" data-index="${index}" title="Đổi trạng thái">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="action-icon-btn btn-edit-icon" data-index="${index}" title="Chỉnh sửa">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="action-icon-btn btn-delete-icon" data-index="${index}" title="Xóa">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        taskContainer.appendChild(card);
    });
    
    updateStatistics();
}

function updateStatistics() {
    const total = tasks.length;
    let completed = 0;
    tasks.forEach(t => { if (t.completed) completed++; });
    
    if (totalTasksEl) totalTasksEl.innerText = total;
    if (completedTasksEl) completedTasksEl.innerText = completed;
    if (pendingTasksEl) pendingTasksEl.innerText = total - completed;
}

function resetForm() {
    if (taskForm) taskForm.reset();
    const editIndexEl = document.getElementById('edit-index');
    if (editIndexEl) editIndexEl.value = "-1";
    if (modalTitle) modalTitle.innerText = "Thêm công việc mới";
    if (btnSubmitText) btnSubmitText.innerHTML = '<i class="fa-solid fa-plus"></i> Thêm';
    if (charCurrent) charCurrent.innerText = "0";
}

// Bắt sự kiện nhập ký tự
if (taskDescTextarea && charCurrent) {
    taskDescTextarea.addEventListener('input', function() {
        charCurrent.innerText = this.value.length;
    });
}

// Sự kiện mở form popup (Kiểm tra an toàn chống lỗi đóng băng)
if (btnOpenModal) {
    btnOpenModal.addEventListener('click', function() {
        resetForm();
        if (formModal) formModal.classList.remove('hidden');
    });
}

function closeModal() {
    if (formModal) formModal.classList.add('hidden');
}

if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
if (btnCloseModalX) btnCloseModalX.addEventListener('click', closeModal);

// Sự kiện submit form
if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const desc = taskDescTextarea ? taskDescTextarea.value : '';
        const deadline = document.getElementById('task-deadline').value;
        const priority = document.getElementById('task-priority').value;
        const editIndex = parseInt(document.getElementById('edit-index').value);

        if (editIndex === -1) {
            tasks.push({ title, desc, deadline, priority, completed: false });
            alert("Thêm công việc thành công!");
        } else {
            tasks[editIndex].title = title;
            tasks[editIndex].desc = desc;
            tasks[editIndex].deadline = deadline;
            tasks[editIndex].priority = priority;
            alert("Cập nhật công việc thành công!");
        }

        saveTasks();
        renderTasks();
        closeModal();
    });
}

// Xử lý sự kiện click trên từng Card công việc
if (taskContainer) {
    taskContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.action-icon-btn');
        if (!button) return;

        const index = button.getAttribute('data-index');

        // 1. Click nút Tích hoàn thành
        if (button.classList.contains('btn-check-toggle')) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        // 2. Click nút Sửa dữ liệu
        if (button.classList.contains('btn-edit-icon')) {
            const task = tasks[index];
            document.getElementById('task-title').value = task.title;
            if (taskDescTextarea) taskDescTextarea.value = task.desc || '';
            document.getElementById('task-deadline').value = task.deadline;
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('edit-index').value = index;
            
            if (charCurrent) charCurrent.innerText = (task.desc || '').length;
            if (modalTitle) modalTitle.innerText = "Chỉnh sửa công việc";
            if (btnSubmitText) btnSubmitText.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu';
            if (formModal) formModal.classList.remove('hidden');
        }

        // 3. Click nút Xóa công việc
        if (button.classList.contains('btn-delete-icon')) {
            const isConfirm = confirm(`Bạn có chắc chắn muốn xóa công việc "${tasks[index].title}"?`);
            if (isConfirm) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        }
    });
}

// Luôn luôn chạy hiển thị dữ liệu khi load trang
renderTasks();