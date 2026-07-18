# AdvanceSoftLogic-web-dev-week2

# To-Do List App —(JavaScript Fundamentals & DOM Manipulation)

A fully interactive to-do list built with vanilla JavaScript, on top of the semantic HTML/CSS structure from Week 1. Tasks can be added, completed, edited, deleted, filtered, and are persisted across page refreshes using `localStorage`.

## How to Run

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Right-click `index.html` → **Open with Live Server** (requires the *Live Server* VS Code extension by Ritwick Dey).
4. The app opens in your browser at `http://127.0.0.1:5500` (or similar) and auto-refreshes on save.

No build step, npm install, or backend server is required — this is a pure client-side app. Node/npm are only used for local tooling, not runtime.

---

## Folder Structure

```
week2-webdev-todo/
├── index.html      # Page structure — form, filters, task list, counter
├── style.css        # All styling, including responsive layout
├── app.js            # DOM rendering, event handling, task logic (ES module)
├── storage.js       # localStorage read/write logic (ES module)
└── README.md
```

`app.js` imports from `storage.js` via ES module `import`/`export` — the two are kept separate so persistence logic has no knowledge of the DOM, and DOM logic has no knowledge of *how* tasks are stored.

---

## Features Implemented

### Required
- Add a new task via text input + button, or by pressing **Enter**
- Mark a task complete/incomplete — shown via a custom checkbox and strikethrough text
- Delete a task
- Filter tasks by **All / Active / Completed**
- Live counter showing the number of incomplete tasks
- Tasks persist across page refresh via `localStorage`
- Code split across two ES modules (`app.js`, `storage.js`)
- Validation: empty or whitespace-only tasks are rejected with an inline error message; task text is trimmed before saving
- Friendly empty-state message when there are no tasks
- Fully responsive — usable at both mobile and desktop widths

### Bonus
- **Inline editing** — double-click any task's text to edit it in place. Press **Enter** or click away to save, **Escape** to cancel. An edit that's cleared to nothing falls back to the original text rather than saving an empty task.
- **Clear completed** — a single button removes all completed tasks at once.

---

## Tech Used

- HTML5 (semantic structure carried over from Week 1)
- CSS3 (custom properties, flexbox, media queries, transitions)
- Vanilla JavaScript (ES Modules — no frameworks or libraries)
- Browser `localStorage` API

---

## Known Limitations

- Task IDs are generated with `Date.now()`. This is fine for a single-user, client-only app, but two tasks added within the same millisecond (not realistically possible via manual UI interaction) would collide.
- No due dates or drag-and-drop reordering — these were listed as optional/bonus features and were left out in favor of inline editing and clear-completed.
- Data is stored per-browser via `localStorage`; it is not synced across devices or browsers.
- The Git commit history for the initial task-creation/completion/persistence features was reconstructed after the fact using `git add -p`, rather than committed feature-by-feature in real time during development. Commits from the UI redesign and bonus features onward were made incrementally as each feature was completed.

---

## Author

Saad Zulfiqar — Advance Soft Logics Web Development Internship, Week 2