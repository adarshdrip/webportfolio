const spreads = document.querySelectorAll(".spread");
const frontCover = document.getElementById("front-cover");
const backCover = document.getElementById("back-cover");
const flipSound = document.getElementById("flipSound");

let current = -1; 

function showCurrent() {
  spreads.forEach(s => s.style.display = "none");
  frontCover.style.display = "none";
  backCover.style.display = "none";

  if(current === -1) frontCover.style.display = "flex";
  else if(current >= 0 && current < spreads.length) spreads[current].style.display = "flex";
  else if(current === spreads.length) backCover.style.display = "flex";
}

function flipForward() {
  if(current === -1) {
    frontCover.classList.add("turn-forward");
    flipSound?.play();
    setTimeout(() => { current++; showCurrent(); }, 1000);
  } else if(current < spreads.length) {
    const rightPage = spreads[current].querySelector(".page.right");
    rightPage.classList.remove("turn-backward"); // clean up
    rightPage.classList.add("turn-forward");
    flipSound?.play();
    setTimeout(() => { current++; showCurrent(); }, 1000);
  }
}

function flipBack() {
  if(current === 0) {
    // Show front cover first so we can animate it back
    frontCover.style.display = "flex";
    frontCover.style.transition = "none";
    frontCover.classList.add("turn-forward");
    frontCover.offsetHeight; // Force reflow
    frontCover.style.transition = "transform 1s ease";
    frontCover.classList.remove("turn-forward");
    
    flipSound?.play();
    setTimeout(() => { current = -1; showCurrent(); }, 1000);
  } 
  else if(current > 0 && current <= spreads.length) {
    // Update index to the previous spread
    current--; 
    showCurrent();
    
    const rightPage = spreads[current].querySelector(".page.right");
    
    // Set to flipped state instantly
    rightPage.style.transition = "none";
    rightPage.classList.add("turn-forward");
    rightPage.offsetHeight; // Force reflow
    
    // Animate clockwise back to original position
    rightPage.style.transition = "transform 1s ease";
    rightPage.classList.remove("turn-forward");
    
    flipSound?.play();
  }
}

document.addEventListener("click", e => {
  if(e.target.classList.contains("next")) flipForward();
  if(e.target.classList.contains("prev")) flipBack();
});

showCurrent();