// storage.js
// Handles reading and writing the task list to localStorage.
// Knows nothing about the DOM — its only responsibility is persistence.

const STORAGE_KEY = "todo-tasks"; // UPPER_SNAKE_CASE: constant, never reassigned

/**
 * Reads the saved task list from localStorage.
 * Returns an empty array if nothing has been saved yet, or if the
 * stored value is corrupted (so a bad localStorage entry never crashes the app).
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
 * Persists the given task array to localStorage.
 * @param {Array} tasks - the current in-memory task list
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
