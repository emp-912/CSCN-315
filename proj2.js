document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let nameError = document.getElementById("nameError");
    let ageError = document.getElementById("ageError");
    let resultDiv = document.getElementById("result");

    // Clear previous errors
    nameError.textContent = "";
    ageError.textContent = "";
    resultDiv.textContent = "";

    let valid = true;

    // Validate name
    if (name === "") {
      nameError.textContent = "Name cannot be empty";
      valid = false;
    }

    // Validate age
    if (age === "" || isNaN(age) || age <= 0) {
      ageError.textContent = "Please enter a valid age";
      valid = false;
    }

    if (!valid) {
      console.error("Invalid input: Name or age is missing/incorrect.");
      return;
    }

    // Calculate birth year and age in months
    let birthYear = new Date().getFullYear() - age;
    let ageInMonths = age * 12;

    // Fun message
    let message = `Hello, ${name}! You were born in ${birthYear}. That means you've lived for about ${ageInMonths} months. Keep going strong!`;

    // Display results dynamically
    resultDiv.textContent = message;

    // Log user data and calculations
    console.log(
      `User: ${name}, Age: ${age}, Birth Year: ${birthYear}, Age in Months: ${ageInMonths}`
    );
  });
