// storage.js

const STORAGE_KEY = "todo-tasks";

/**
 * Load tasks from localStorage.
 */
export function loadTasks() {
  const rawData = localStorage.getItem(STORAGE_KEY);

  if (!rawData) return [];

  try {
    return JSON.parse(rawData);
  } catch (error) {
    console.warn("Saved tasks were corrupted, starting fresh.", error);
    return [];
  }
}

/**
 * Save tasks to localStorage.
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}