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
    rightPage.classList.add("turn-forward");
    flipSound?.play();
    setTimeout(() => { current++; showCurrent(); }, 1000);
  }
}

function flipBack() {
  if(current === 0) {
    // Turning back to cover: Show cover, start it at rotated state, then animate to 0
    frontCover.style.display = "flex";
    frontCover.style.transition = "none";
    frontCover.classList.add("turn-forward");
    frontCover.offsetHeight; // force reflow
    frontCover.style.transition = "transform 1s ease";
    frontCover.classList.remove("turn-forward");
    
    flipSound?.play();
    setTimeout(() => { current = -1; showCurrent(); }, 1000);
  } 
  else if(current > 0 && current <= spreads.length) {
    // Backtracking spread: We want the LEFT page of the current spread to swing clockwise
    const currentLeftPage = spreads[current-1].querySelector(".page.left");
    
    // Set left page to be flipped clockwise (180deg) initially
    currentLeftPage.style.transition = "none";
    currentLeftPage.classList.add("turn-backward");
    currentLeftPage.offsetHeight; // force reflow
    
    // Animate it back to 0deg (swinging clockwise onto the right)
    currentLeftPage.style.transition = "transform 1s ease";
    currentLeftPage.classList.remove("turn-backward");
    
    flipSound?.play();
    setTimeout(() => { current--; showCurrent(); }, 1000);
  }
  else if(current === spreads.length) {
    // From back cover
    backCover.classList.add("turn-backward");
    flipSound?.play();
    setTimeout(() => { current--; showCurrent(); }, 1000);
  }
}

document.addEventListener("click", e => {
  if(e.target.classList.contains("next")) flipForward();
  if(e.target.classList.contains("prev")) flipBack();
});

showCurrent();