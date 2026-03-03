const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const intentInput = document.getElementById("intent");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const sortSelect = document.getElementById("sort");

let tasks = [];

addBtn.addEventListener("click", addTask);
sortSelect.addEventListener("change", renderTasks);

function addTask() {
  if (!titleInput.value.trim()) return;

  tasks.push({
    id: Date.now(),
    title: titleInput.value,
    category: categoryInput.value,
    priority: priorityInput.value,
    intent: intentInput.value,
    completed: false,
    createdAt: new Date()
  });

  titleInput.value = "";
  intentInput.value = "";

  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  let sorted = [...tasks];

  if (sortSelect.value === "priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    sorted.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sortSelect.value === "category") {
    sorted.sort((a, b) => a.category.localeCompare(b.category));
  }

  if (sortSelect.value === "newest") {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  }

  sorted.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${task.priority.toLowerCase()}`;
    if (task.completed) div.classList.add("done");

    div.innerHTML = `
      <h3>${task.title}</h3>
      <div class="meta">${task.category} • ${task.priority}</div>
      ${task.intent ? `<div class="intent">“${task.intent}”</div>` : ""}
    `;

    div.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    taskList.appendChild(div);
  });
}