const pages = document.querySelectorAll(".page");
let current = 0;

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {

    // Flip current page
    pages[current].classList.add("turn");

    // Hide current after animation
    setTimeout(() => {
      pages[current].classList.remove("active");
      current++;

      if (current < pages.length) {
        pages[current].classList.add("active");
      }
    }, 500);
  });
});