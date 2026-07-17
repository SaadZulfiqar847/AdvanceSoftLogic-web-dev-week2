// app.js
import { loadTasks, saveTasks } from "./storage.js";

// In-memory state — the single source of truth while the page is open.
// let, not const, because this array gets reassigned (spread into a new array) often.
let tasks = loadTasks();
let currentFilter = "all"; // "all" | "active" | "completed"

// DOM references (suffixed with El, per the naming convention)
const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskErrorEl = document.getElementById("task-error");
const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");
const tasksRemainingEl = document.getElementById("tasks-remaining");
const filtersEl = document.getElementById("filters");

/**
 * Handles the "add task" form submission.
 * Validates the input, builds a new task object, and re-renders.
 */
function handleAddTask(event) {
  event.preventDefault(); // stop the form from actually navigating/reloading

  const taskText = newTaskInput.value.trim(); // trim per validation rules

  if (taskText === "") {
    taskErrorEl.textContent = "Task can't be empty.";
    return;
  }

  taskErrorEl.textContent = ""; // clear any previous error

  const newTask = {
    id: Date.now(), // cheap unique id, fine for a client-only app
    text: taskText,
    completed: false,
  };

  // Spread: build a new array instead of mutating `tasks` directly.
  tasks = [...tasks, newTask];

  newTaskInput.value = "";
  saveTasks(tasks);
  render();
}

taskForm.addEventListener("submit", handleAddTask);

/**
 * Flips a task's completed state by id, saves, and re-renders.
 * @param {number} id
 */
function toggleTaskComplete(id) {
  tasks = tasks.map((task) => {
    if (task.id !== id) return task;
    const { completed } = task; // destructuring
    return { ...task, completed: !completed }; // spread: copy + override one field
  });
  saveTasks(tasks);
  render();
}

/**
 * Removes a task by id, saves, and re-renders.
 * @param {number} id
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
  render();
}

/**
 * Returns the subset of tasks matching the current filter.
 */
function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.completed);
  if (currentFilter === "completed") return tasks.filter((t) => t.completed);
  return tasks; // "all"
}

/**
 * Updates the "N tasks remaining" counter based on incomplete tasks.
 */
function updateCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;
  tasksRemainingEl.textContent = remaining;
}

filtersEl.addEventListener("click", (event) => {
  const clickedBtn = event.target.closest(".filter-btn");
  if (!clickedBtn) return;

  currentFilter = clickedBtn.dataset.filter;

  // Update active-button styling
  filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn === clickedBtn);
  });

  render();
});

/**
 * Rebuilds the visible task list from current state + filter.
 * Single job: turn `tasks` + `currentFilter` into DOM, nothing else.
 */
function render() {
  const visibleTasks = getFilteredTasks();

  taskListEl.innerHTML = ""; // clear before rebuilding

  const hasNoTasks = tasks.length === 0;
  emptyStateEl.style.display = hasNoTasks ? "block" : "none";
  taskListEl.style.display = hasNoTasks ? "none" : "block";

  visibleTasks.forEach(({ id, text, completed }) => {
    // destructuring straight out of the array item
    const li = document.createElement("li");
    li.className = `task-item${completed ? " completed" : ""}`; // template literal

    li.innerHTML = `
      <input type="checkbox" ${completed ? "checked" : ""} class="task-toggle">
      <span class="task-text">${text}</span>
      <button type="button" class="task-delete" aria-label="Delete task">&times;</button>
    `;

    li.querySelector(".task-toggle").addEventListener("click", () => toggleTaskComplete(id));
    li.querySelector(".task-delete").addEventListener("click", () => deleteTask(id));

    taskListEl.appendChild(li);
  });

  updateCounter();
}

// Initial render on page load — shows any tasks restored from localStorage
render();
