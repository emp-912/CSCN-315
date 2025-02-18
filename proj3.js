// 1. Define tasks for each weekday using an object
const weekdayTasks = {
  monday: ["Team meeting at 9 AM", "Review project goals"],
  tuesday: ["Develop new features", "Design system architecture"],
  wednesday: ["Fix bugs", "Client call at 4 PM"],
  thursday: ["Research new technologies", "Write documentation"],
  friday: ["Deploy updates", "Plan next meeting"],
  saturday: ["Attend workshop", "Work on personal project"],
  sunday: ["Plan the upcoming week", "Rest and recharge"],
};

// 2. Function to process user input and display tasks for the entered weekday
function displayTasks() {
  const inputField = document.getElementById("weekdayInput");
  const outputDiv = document.getElementById("output");
  let day = inputField.value.trim().toLowerCase();

  // Check if input is empty
  if (day === "") {
    outputDiv.innerHTML = "<p>Please enter a weekday.</p>";
    return;
  }

  //----- Fun added conditions -----
  if (day === "funday") {
    outputDiv.innerHTML =
      "<p>🌞 Every day is Funday when you love your work!</p>";
    return;
  } else if (day === "yesterday") {
    outputDiv.innerHTML =
      "<p>⏳ Yesterday's tasks are already done. Focus on today!</p>";
    return;
  } else if (day === "neverday") {
    outputDiv.innerHTML =
      "<p>🦄 This day exists only in magical unicorn calendars</p>";
    return;
  }
  // ----- End of fun additions -----

  //Original switch statement remains unchanged
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

  // 4. Use a for loop to create a list of tasks for display
  let html = `<h2>Tasks for ${
    day.charAt(0).toUpperCase() + day.slice(1)
  }:</h2><ul>`;
  for (let i = 0; i < tasks.length; i++) {
    html += `<li>${tasks[i]}</li>`;
  }
  html += "</ul>";

  if (day === "friday") {
    html += "<p>🎉 TGIF! Remember to dance like nobody's watching!</p>";
  } else if (day === "monday") {
    html += "<p>☕ Extra coffee power activated!</p>";
  }

  outputDiv.innerHTML = html;
}
