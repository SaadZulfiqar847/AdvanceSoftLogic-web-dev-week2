// In-memory state
let tasks = [];

// DOM references
const taskForm = document.getElementById("task-form");
const newTaskInput = document.getElementById("new-task");
const taskErrorEl = document.getElementById("task-error");

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

  // Temporary so we can verify tasks are being created.
  console.log(tasks);
}

taskForm.addEventListener("submit", handleAddTask);