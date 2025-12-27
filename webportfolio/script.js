const pages = document.querySelectorAll(".page");
const flipSound = document.getElementById("flipSound");
let currentPage = 0;

function showPage() {
  pages.forEach((p, i) => {
    p.classList.remove("active");
    if (i === currentPage) p.classList.add("active");
  });
}

function flipForward() {
  if (currentPage < pages.length - 1) {
    flipSound.currentTime = 0;
    flipSound.play();
    pages[currentPage].classList.add("turn");

    setTimeout(() => {
      pages[currentPage].classList.remove("turn");
      currentPage++;
      showPage();
    }, 450);
  }
}

function flipBack() {
  if (currentPage > 0) {
    flipSound.currentTime = 0;
    flipSound.play();
    currentPage--;
    showPage();
  }
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("next")) flipForward();
  if (e.target.classList.contains("prev")) flipBack();
});

/* Swipe support */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) flipForward();
  if (endX - startX > 50) flipBack();
});