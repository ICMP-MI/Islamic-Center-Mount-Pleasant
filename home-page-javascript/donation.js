// Not currently loaded by index.html; superseded by accordion.js's handling of .accordion-content headers.
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    parent.classList.toggle("active");
  });
});
