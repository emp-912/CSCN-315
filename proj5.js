// proj5.js

/* 
  This script builds a horizontal gallery (using a flex container) with navigation buttons on the left and right.
  When an image is clicked, an overlay is created that displays a zoomed-in version.
  Demonstrates usage of createElement and appendChild.
*/

// Array of image objects (each with a thumbnail and full-size image)
const images = [
  { thumb: "redDead.jpg", full: "redDead.jpg" },
  { thumb: "witcher3.jpg", full: "witcher3.jpg" },
  { thumb: "dyingLight.jpg", full: "dyingLight.jpg" },
  { thumb: "tombRaider.jpg", full: "tombRaider.jpg" },
];

// Reference to the gallery container
const galleryContainer = document.getElementById("gallery-container");

// Dynamically add images to the gallery container
images.forEach((imgObj, index) => {
  const imgElem = document.createElement("img");
  imgElem.src = imgObj.thumb;
  imgElem.alt = `Image ${index + 1}`;
  // When an image is clicked, open the zoom overlay
  imgElem.addEventListener("click", function () {
    openOverlay(imgObj.full);
  });
  galleryContainer.appendChild(imgElem);
});

// Navigation buttons for scrolling the gallery horizontally
const prevBtn = document.getElementById("gallery-prev");
const nextBtn = document.getElementById("gallery-next");

prevBtn.addEventListener("click", function () {
  galleryContainer.scrollLeft -= 200; // Adjust scroll amount as needed
});

nextBtn.addEventListener("click", function () {
  galleryContainer.scrollLeft += 200;
});

// Function to open an overlay displaying the zoomed image
function openOverlay(imageSrc) {
  // Create overlay div
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  // Create a close button for the overlay
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-overlay";
  closeBtn.textContent = "X";
  closeBtn.addEventListener("click", function () {
    document.body.removeChild(overlay);
  });
  overlay.appendChild(closeBtn);

  // Create the image element for the zoomed version
  const zoomedImg = document.createElement("img");
  zoomedImg.alt = "Zoomed Image";

  // Attach load event listener before setting src to ensure it fires even if cached
  zoomedImg.addEventListener("load", function () {
    console.log(
      "Image loaded. Natural dimensions:",
      zoomedImg.naturalWidth,
      zoomedImg.naturalHeight
    );
    fixZoomImageSize(zoomedImg);
  });

  // Now set the src attribute
  zoomedImg.src = imageSrc;
  overlay.appendChild(zoomedImg);

  // Append the overlay to the document body
  document.body.appendChild(overlay);
}

/* 
      Single function to fix all the zoomed image sizes.
      It scales the image uniformly so that it fits within 90% of the viewport's width and height.
  */
function fixZoomImageSize(img) {
  const maxWidth = window.innerWidth * 0.9;
  const maxHeight = window.innerHeight * 0.9;
  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;

  // Calculate scale without restricting scale > 1
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  img.style.width = naturalWidth * scale + "px";
  img.style.height = naturalHeight * scale + "px";
}
