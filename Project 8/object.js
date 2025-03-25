// Task class to manage tasks in a simple task management application
class Task {
  constructor(title, description) {
    if (!title || !description) {
      throw new Error("Title and description are required to create a task.");
    }
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  markCompleted() {
    this.completed = true;
    this.displayTask(`Task "${this.title}" has been marked as completed.`);
  }

  updateTask(newTitle, newDescription) {
    if (!newTitle || !newDescription) {
      throw new Error(
        "Both title and description are required to update the task."
      );
    }
    this.title = newTitle;
    this.description = newDescription;
    this.displayTask(`Task updated to: ${this.title} - ${this.description}`);
  }

  removeTask() {
    const outputDiv = document.getElementById("output");
    const taskElements = outputDiv.querySelectorAll(
      `[data-title="${this.title}"]`
    );
    taskElements.forEach((element) => element.remove());
  }

  displayTask(message) {
    const outputDiv = document.getElementById("output");
    const taskDetails = document.createElement("div");
    taskDetails.setAttribute("data-title", this.title);
    taskDetails.innerHTML = `
      <p><strong>Task:</strong> ${this.title}</p>
      <p><strong>Description:</strong> ${this.description}</p>
      <p><strong>Completed:</strong> ${this.completed ? "Yes" : "No"}</p>
      <p>${message}</p>
      <button onclick="markTaskCompleted('${
        this.title
      }')">Mark Completed</button>
      <button onclick="updateTask('${this.title}')">Update Task</button>
      <button onclick="deleteTask('${this.title}')">Delete Task</button>
      <hr />
    `;
    outputDiv.appendChild(taskDetails);
  }
}

// Global task list
const tasks = [];

// Create a new task
window.createTask = function () {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;

  if (!title || !description) {
    alert("Please provide both a title and a description.");
    return;
  }

  const task = new Task(title, description);
  tasks.push(task);
  task.displayTask("Task created.");
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
};

// Mark a task as completed
window.markTaskCompleted = function (title) {
  const task = tasks.find((t) => t.title === title);
  if (task) {
    task.markCompleted();
  }
};

// Update a task
window.updateTask = function (title) {
  const task = tasks.find((t) => t.title === title);
  if (task) {
    const newTitle = prompt("Enter new title:", task.title);
    const newDescription = prompt("Enter new description:", task.description);
    if (newTitle && newDescription) {
      task.updateTask(newTitle, newDescription);
    }
  }
};

// Delete a task
window.deleteTask = function (title) {
  const taskIndex = tasks.findIndex((t) => t.title === title);
  if (taskIndex !== -1) {
    tasks[taskIndex].removeTask();
    tasks.splice(taskIndex, 1);
  }
};

export default Task;
