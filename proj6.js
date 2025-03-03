// proj6.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.registrationForm;
  const errorDivs = document.querySelectorAll(".error");
  const formMessage = document.getElementById("formMessage");

  const clearErrors = () => {
    errorDivs.forEach((div) => (div.textContent = ""));
    formMessage.textContent = "";
  };

  const showError = (element, message) => {
    element.textContent = message;
    console.error("Validation Error:", message);
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return name.trim() !== "" && regex.test(name);
  };

  const validateUsername = (username) => {
    const regex = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return regex.test(password);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
    return regex.test(phone);
  };

  const validateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return age >= 18;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    try {
      const errors = [];
      const elements = form.elements;

      // Full Name Validation
      if (!validateName(elements.fullName.value)) {
        errors.push("Full Name must contain only letters and spaces");
        showError(document.getElementById("nameError"), "Invalid name format");
      }

      // Username Validation
      if (!validateUsername(elements.username.value)) {
        errors.push("Username must be 6-15 characters starting with a letter");
        showError(
          document.getElementById("userError"),
          "Invalid username format"
        );
      }

      // Email Validation
      if (!validateEmail(elements.email.value)) {
        errors.push("Invalid email format");
        showError(
          document.getElementById("emailError"),
          "Invalid email address"
        );
      }

      // Password Validation
      if (!validatePassword(elements.password.value)) {
        errors.push(
          "Password must contain: 8-20 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"
        );
        showError(
          document.getElementById("passError"),
          "Password requirements not met"
        );
      }

      // Confirm Password
      if (elements.password.value !== elements.confirmPassword.value) {
        errors.push("Passwords do not match");
        showError(
          document.getElementById("confirmError"),
          "Passwords must match"
        );
      }

      // Phone Validation
      if (!validatePhone(elements.phone.value)) {
        errors.push("Phone must be in 123-456-7890 format");
        showError(
          document.getElementById("phoneError"),
          "Invalid phone format"
        );
      }

      // Date of Birth Validation
      if (!validateAge(elements.dob.value)) {
        errors.push("You must be at least 18 years old");
        showError(
          document.getElementById("dobError"),
          "Age requirement not met(At least 18 years old)"
        );
      }

      // Terms Agreement
      if (!elements.agree.checked) {
        errors.push("You must agree to the terms");
        showError(
          document.getElementById("agreeError"),
          "Terms must be accepted"
        );
      }

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      // If all validations pass
      formMessage.textContent = "Form submitted successfully!";
      formMessage.classList.add("success");
      console.log("Form validation passed");
      // form.submit(); // Uncomment to enable actual submission
    } catch (error) {
      formMessage.textContent = "Please correct the following errors:";
      formMessage.classList.remove("success");
      console.warn("Form validation failed:", error.message);
    }
  });

  // Real-time validation for better UX
  form.addEventListener("input", (e) => {
    const target = e.target;
    clearErrors();

    try {
      switch (target.name) {
        case "fullName":
          if (!validateName(target.value))
            throw new Error("Invalid name format");
          break;
        case "username":
          if (!validateUsername(target.value))
            throw new Error("Invalid username format");
          break;
        case "email":
          if (!validateEmail(target.value))
            throw new Error("Invalid email format");
          break;
        case "password":
          if (!validatePassword(target.value))
            throw new Error("Password requirements not met");
          break;
        case "phone":
          if (!validatePhone(target.value))
            throw new Error("Invalid phone format");
          break;
      }
    } catch (error) {
      showError(document.getElementById(`${target.name}Error`), error.message);
    }
  });
});
