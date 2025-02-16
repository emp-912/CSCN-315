// -------------------------------
// 1. Define tasks for each weekday using an object
// -------------------------------
const weekdayTasks = {
  monday: ["Team meeting at 9 AM", "Review project goals"],
  tuesday: ["Develop new features", "Design system architecture"],
  wednesday: ["Fix bugs", "Client call at 4 PM"],
  thursday: ["Research new technologies", "Write documentation"],
  friday: ["Deploy updates", "Plan next sprint"],
  saturday: ["Attend workshop", "Work on personal project"],
  sunday: ["Plan the upcoming week", "Rest and recharge"],
};

// -------------------------------
// 2. Function to process user input and display tasks for the entered weekday
// -------------------------------
function displayTasks() {
  // Get the user's input and trim whitespace, converting to lowercase for consistency
  const inputField = document.getElementById("weekdayInput");
  const outputDiv = document.getElementById("output");
  let day = inputField.value.trim().toLowerCase();

  // Check if input is empty
  if (day === "") {
    outputDiv.innerHTML = "<p>Please enter a weekday.</p>";
    return;
  }

  // -------------------------------
  // 3. Use a switch statement to determine tasks based on the weekday
  // -------------------------------
  let tasks = [];
  switch (day) {
    case "monday":
      tasks = weekdayTasks.monday;
      break;
    case "tuesday":
      tasks = weekdayTasks.tuesday;
      break;
    case "wednesday":
      tasks = weekdayTasks.wednesday;
      break;
    case "thursday":
      tasks = weekdayTasks.thursday;
      break;
    case "friday":
      tasks = weekdayTasks.friday;
      break;
    case "saturday":
      tasks = weekdayTasks.saturday;
      break;
    case "sunday":
      tasks = weekdayTasks.sunday;
      break;
    default:
      outputDiv.innerHTML =
        "<p>Invalid weekday. Please enter a valid day (e.g., Monday, Tuesday, etc.).</p>";
      return;
  }

  // -------------------------------
  // 4. Use a for loop to create a list of tasks for display
  // -------------------------------
  let html = `<h2>Tasks for ${
    day.charAt(0).toUpperCase() + day.slice(1)
  }:</h2><ul>`;
  for (let i = 0; i < tasks.length; i++) {
    html += `<li>${tasks[i]}</li>`;
  }
  html += "</ul>";

  // Output the final content in the designated output div
  outputDiv.innerHTML = html;
}
