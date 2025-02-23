const images = [
  {
    thumb: "images/redDead.jpg",
    full: "images/redDead.jpg",
    caption: "Red Dead Redemption 2: Western Adventure",
  },
  {
    thumb: "images/witcher3.jpg",
    full: "images/witcher3.jpg",
    caption: "The Witcher 3: Wild Hunt",
  },
  {
    thumb: "images/dyingLight.jpg",
    full: "images/dyingLight.jpg",
    caption: "Dying Light 2: Stay Human",
  },
  {
    thumb: "images/tombRaider.jpg",
    full: "images/tombRaider.jpg",
    caption: "Shadow of the Tomb Raider",
  },
];

let currentImageIndex = 0;
const galleryContainer = document.getElementById("gallery-container");

// Create gallery images dynamically
images.forEach((imgObj, index) => {
  const imgElem = document.createElement("img");
  imgElem.src = imgObj.thumb;
  imgElem.alt = `Game ${index + 1}`;
  imgElem.addEventListener("click", () => openOverlay(imgObj.full, index));
  galleryContainer.appendChild(imgElem);
});

// Navigation buttons
document.getElementById("gallery-prev").addEventListener("click", () => {
  galleryContainer.scrollLeft -= 250;
});

document.getElementById("gallery-next").addEventListener("click", () => {
  galleryContainer.scrollLeft += 250;
});

function openOverlay(imageSrc, index) {
  currentImageIndex = index;

  const overlay = document.createElement("div");
  overlay.id = "overlay";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const prevArrow = document.createElement("div");
  prevArrow.className = "nav-arrow prev";
  prevArrow.innerHTML = "&lt;";

  const nextArrow = document.createElement("div");
  nextArrow.className = "nav-arrow next";
  nextArrow.innerHTML = "&gt;";

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.textContent = images[index].caption;

  const position = document.createElement("div");
  position.className = "position-indicator";
  position.textContent = `${index + 1}/${images.length}`;

  // Main image
  const zoomedImg = document.createElement("img");

  // Close button
  const closeBtn = document.createElement("div");
  closeBtn.className = "close-overlay";
  closeBtn.textContent = "✕";
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    color: white;
  `;

  overlay.append(
    spinner,
    prevArrow,
    nextArrow,
    caption,
    position,
    zoomedImg,
    closeBtn
  );
  document.body.appendChild(overlay);

  prevArrow.addEventListener("click", () => navigate(-1));
  nextArrow.addEventListener("click", () => navigate(1));
  closeBtn.addEventListener("click", () => overlay.remove());
  document.addEventListener("keydown", handleKeyPress);

  // Load image
  zoomedImg.onload = () => {
    spinner.remove();
    zoomedImg.style.animation = "fadeIn 0.5s ease";
  };
  zoomedImg.src = imageSrc;
}

function navigate(direction) {
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  const overlay = document.getElementById("overlay");
  if (overlay) {
    const img = overlay.querySelector("img");
    const caption = overlay.querySelector(".caption");
    const position = overlay.querySelector(".position-indicator");

    img.src = images[currentImageIndex].full;
    caption.textContent = images[currentImageIndex].caption;
    position.textContent = `${currentImageIndex + 1}/${images.length}`;
  }
}

// Keyboard controls
function handleKeyPress(e) {
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  switch (e.key) {
    case "ArrowLeft":
      navigate(-1);
      break;
    case "ArrowRight":
      navigate(1);
      break;
    case "Escape":
      overlay.remove();
      break;
  }
}
