// proj7.js
const interestsCheckboxes = document.querySelectorAll(
  'input[name="interests"]'
);
const interestsList = document.getElementById("interestsList");

// Function to update the displayed list of selected interests
function updateInterestsList(selectedInterests) {
  interestsList.innerHTML = "";
  selectedInterests.forEach((interest) => {
    const li = document.createElement("li");
    li.textContent = interest;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const checkbox = Array.from(interestsCheckboxes).find(
        (cb) => cb.value === interest
      );
      if (checkbox) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("change"));
      }
    });
    li.appendChild(removeBtn);
    interestsList.appendChild(li);
  });
}

// Add event listeners to checkboxes for real-time updates
interestsCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selectedInterests = Array.from(interestsCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    updateInterestsList(selectedInterests);
  });
});

const fileUpload = document.getElementById("fileUpload");
const fileContent = document.getElementById("fileContent");

// Function to determine if a file is text-based
function isTextFile(file) {
  const textTypes = ["text/", "application/json"];
  const textExtensions = [
    ".txt",
    ".csv",
    ".json",
    ".html",
    ".js",
    ".css",
    ".md",
  ];
  const extension = "." + file.name.split(".").pop().toLowerCase();
  return (
    textTypes.some((type) => file.type.startsWith(type)) ||
    textExtensions.includes(extension)
  );
}

// Add event listener for file selection
fileUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    if (isTextFile(file)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        fileContent.textContent = event.target.result;
      };
      reader.onerror = () => {
        fileContent.textContent = "";
        alert("Error reading the file.");
      };
      reader.readAsText(file);
    } else {
      fileContent.textContent = "";
      alert("Please upload a text-based file (e.g., .txt, .csv, .json).");
    }
  } else {
    fileContent.textContent = "";
  }
});
