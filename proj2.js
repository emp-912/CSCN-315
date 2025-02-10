//Welcome message
if (!localStorage.getItem("welcomeMessageShown")) {
  alert("Welcome to my portfolio!");
  localStorage.setItem("welcomeMessageShown", true);
}

//Dark Mode Toggle
const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Dark Mode";
toggleButton.style.margin = "10px";
document.body.insertBefore(toggleButton, document.querySelector(".topnav"));

toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

//Form Handling
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const colorInput = document.getElementById("color");
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");
    errorDiv.classList.add("hidden");
    resultsDiv.innerHTML = "";

    try {
      if (!nameInput.value.trim() || !ageInput.value.trim()) {
        throw new Error("Please fill in all required fields");
      }

      const age = parseInt(ageInput.value);
      if (isNaN(age) || age < 0 || age > 120) {
        throw new Error("Please enter a valid age (0-120)");
      }

      const birthYear = new Date().getFullYear() - age;
      const funMessage = generateFunMessage(
        nameInput.value.trim(),
        colorInput.value.trim()
      );

      resultsDiv.innerHTML = `
            <div class="result-card">
                <h2>Hello, ${nameInput.value.trim()}!</h2>
                <p>📅 Age in months: ${age * 12}</p>
                <p>🎂 Estimated birth year: ${birthYear}</p>
                <div class="fun-message">${funMessage}</div>
            </div>
        `;

      console.log("User Input:", {
        name: nameInput.value.trim(),
        age: age,
        favoriteColor: colorInput.value.trim(),
      });
      console.log("Calculations:", { birthYear });
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
      console.warn("Validation Error:", error.message);
    }
  });

function generateFunMessage(name, color) {
  const colorFacts = {
    red: "🔴 Red is the first color babies see!",
    blue: "🔵 Blue spaces reduce stress!",
    green: "🟢 Green boosts creativity!",
    yellow: "🟡 Most visible in daylight!",
    purple: "🟣 Ancient purple dye from snails!",
    default: "✨ The human eye sees 10 million colors!",
  };

  const messages = [
    `${name}, your ${color || "favorite"} color is awesome! 😎`,
    `🚀 ${color} is NASA's secret rocket color!`,
    `🎨 Mix ${color} with pizza = ${color} pizza!`,
    `🌈 ${color} represents creativity globally!`,
  ];

  const fact = colorFacts[color?.toLowerCase()] || colorFacts.default;
  return `${messages[Math.floor(Math.random() * messages.length)]}\n\n${fact}`;
}
