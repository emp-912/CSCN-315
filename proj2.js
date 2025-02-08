// Display a welcome message(only once)
if (!localStorage.getItem("welcomeMessageShown")) {
  alert("Welcome to my portfolio!"); // Show the welcome message
  localStorage.setItem("welcomeMessageShown", true);
}
// Change text color
document
  .querySelector(".interesting-info")
  .addEventListener("mouseover", function () {
    document.querySelector(".interesting-info").style.color = "#ff6347";
  });

// Reset the text color
document
  .querySelector(".interesting-info")
  .addEventListener("mouseout", function () {
    document.querySelector(".interesting-info").style.color = "#B82132";
  });

// Dark Mode Toggle
const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Dark Mode";
document.body.insertBefore(toggleButton, document.body.firstChild);

toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// Form submission handler
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Get form elements
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const colorInput = document.getElementById("color");
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");

    // Reset previous messages
    errorDiv.classList.add("hidden");
    resultsDiv.innerHTML = "";

    // Validate inputs
    if (!nameInput.value.trim() || !ageInput.value.trim()) {
      showError("Please fill in all required fields");
      return;
    }

    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 0 || age > 120) {
      showError("Please enter a valid age (0-120)");
      return;
    }

    // Perform calculations
    const birthYear = calculateBirthYear(age);
    const funMessage = generateFunMessage(
      nameInput.value.trim(),
      colorInput.value.trim()
    );

    // Display results
    resultsDiv.innerHTML = `
        <h2>Hello, ${nameInput.value.trim()}!</h2>
        <p>Age in months: ${age * 12}</p>
        <p>You were probably born in ${birthYear} (±1 year)</p>
        <p>${funMessage}</p>
    `;
    resultsDiv.classList.remove("hidden");

    // Log to console
    console.log("User Input:", {
      name: nameInput.value.trim(),
      age: age,
      favoriteColor: colorInput.value.trim(),
    });
    console.log("Calculations:", { birthYear });
  });

// Calculate birth year based on current year
function calculateBirthYear(age) {
  const currentYear = new Date().getFullYear();
  return currentYear - age;
}

// Generate personalized message
function generateFunMessage(name, color) {
  const messages = [
    `Your favorite color (${color || "unknown"}) looks great on you!`,
    `Have a wonderful day, ${name}!`,
    `${name}, today is your day to shine!`,
    `Keep smiling, ${name}! 😊`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  console.warn("Validation Error:", message);
}
