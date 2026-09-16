// flyer-lightbox.js
// Opens/closes a full-size view of the donation flyer when its thumbnail is clicked.
// Uses the same show/hide overlay pattern as the announcement popup and hamburger
// menu elsewhere on the site, so this introduces no new interaction pattern or dependency.

const flyerOpenBtn = document.getElementById("flyer-open-btn");
const flyerLightbox = document.getElementById("flyer-lightbox");
const flyerCloseBtn = document.getElementById("flyer-close-btn");

flyerOpenBtn.addEventListener("click", () => {
  flyerLightbox.style.display = "flex";
});

flyerCloseBtn.addEventListener("click", () => {
  flyerLightbox.style.display = "none";
});

// Also close when clicking the dark backdrop itself, not just the close button.
flyerLightbox.addEventListener("click", (e) => {
  if (e.target === flyerLightbox) {
    flyerLightbox.style.display = "none";
  }
});
