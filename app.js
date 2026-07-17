// In-memory state
let tasks = [];

// DOM references
const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskErrorEl = document.getElementById("task-error");
const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");

/**
 * Handles the "add task" form submission.
 */
function handleAddTask(event) {
  event.preventDefault();

  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    taskErrorEl.textContent = "Task can't be empty.";
    return;
  }

  taskErrorEl.textContent = "";

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks = [...tasks, newTask];

  newTaskInput.value = "";

  render();
}

taskForm.addEventListener("submit", handleAddTask);

/**
 * Toggle completion.
 */
function toggleTaskComplete(id) {
  tasks = tasks.map((task) => {
    if (task.id !== id) return task;
    return {
      ...task,
      completed: !task.completed,
    };
  });

  render();
}

/**
 * Delete a task.
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  render();
}

/**
 * Render all tasks.
 */
function render() {
  taskListEl.innerHTML = "";

  const hasNoTasks = tasks.length === 0;

  emptyStateEl.style.display = hasNoTasks ? "block" : "none";
  taskListEl.style.display = hasNoTasks ? "none" : "block";

  tasks.forEach(({ id, text, completed }) => {
    const li = document.createElement("li");

    li.className = `task-item${completed ? " completed" : ""}`;

    li.innerHTML = `
      <input type="checkbox" class="task-toggle" ${completed ? "checked" : ""}>
      <span class="task-text">${text}</span>
      <button type="button" class="task-delete">&times;</button>
    `;

    li.querySelector(".task-toggle").addEventListener("click", () => {
      toggleTaskComplete(id);
    });

    li.querySelector(".task-delete").addEventListener("click", () => {
      deleteTask(id);
    });

    taskListEl.appendChild(li);
  });
}

render();