// objects.js
class Task {
  // Constructor initializes a new task with a title, description, and a default completion status.
  constructor(title, description) {
    this.title = title; // Title of the task
    this.description = description; // Description of the task
    this.completed = false; // By default, a task is not completed
  }

  // Mark the task as completed.
  markCompleted() {
    this.completed = true;
    console.log(`Task "${this.title}" has been marked as completed.`);
  }

  // Update the task details.
  updateTask(newTitle, newDescription) {
    this.title = newTitle;
    this.description = newDescription;
    console.log(`Task updated to: ${this.title} - ${this.description}`);
  }

  // Remove the task (for demonstration).
  removeTask() {
    console.log(`Task "${this.title}" is being removed.`);
  }
}

// Create an instance of the Task class using the new keyword.
let task1 = new Task(
  "Complete ES6 Project",
  "Implement a task management application using ES6 classes."
);

// Log the task object to see its initial state.
console.log(task1);

// Mark the task as completed.
task1.markCompleted();

// Update the task details.
task1.updateTask(
  "Finish ES6 Project",
  "Ensure all functionalities are working as expected."
);

// Call removeTask to indicate task removal.
task1.removeTask();
