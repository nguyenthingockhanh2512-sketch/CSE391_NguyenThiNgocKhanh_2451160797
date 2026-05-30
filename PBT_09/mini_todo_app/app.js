const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    
    const li = document.createElement("li");
    li.textContent = input.value;
    
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
    input.value = "";
    input.focus();
});