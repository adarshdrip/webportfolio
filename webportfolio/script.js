const spreads = document.querySelectorAll(".spread");
const frontCover = document.getElementById("front-cover");
const backCover = document.getElementById("back-cover");
const flipSound = document.getElementById("flipSound");

let current = -1; // -1 = front cover, 0..n-1 = inner spreads, n = back cover

function showCurrent() {
  spreads.forEach(s => s.style.display = "none");
  frontCover.style.display = "none";
  backCover.style.display = "none";

  if(current === -1) frontCover.style.display = "flex";
  else if(current >= 0 && current < spreads.length) spreads[current].style.display = "flex";
  else if(current === spreads.length) backCover.style.display = "flex";
}

// Forward flip
function flipForward() {
  if(current === -1){
    frontCover.classList.remove("turn-back"); frontCover.classList.add("turn");
    flipSound?.play();
    setTimeout(()=>{ current++; showCurrent(); }, 1000);
  } else if(current < spreads.length){
    const right = spreads[current].querySelector(".page.right");
    if(right) { right.classList.remove("turn-back"); right.classList.add("turn"); }
    flipSound?.play();
    setTimeout(()=>{ current++; showCurrent(); }, 1000);
  } else if(current === spreads.length){
    backCover.classList.remove("turn-back"); backCover.classList.add("turn");
    flipSound?.play();
  }
}

// Backward flip (right page rotates clockwise to left)
function flipBack() {
  if(current > 0 && current <= spreads.length){
    const left = spreads[current-1].querySelector(".page.left");
    if(left){
      left.classList.remove("turn-back"); // reset if needed
      left.classList.add("turn-back");    // rotate clockwise over right page
      flipSound?.play();
      setTimeout(()=>{ current--; showCurrent(); }, 1000);
    }
  } else if(current === 0){
    frontCover.classList.remove("turn");
    frontCover.classList.add("turn-back");
    flipSound?.play();
    setTimeout(()=>{ current = -1; showCurrent(); }, 1000);
  } else if(current === spreads.length){
    backCover.classList.remove("turn");
    backCover.classList.add("turn-back");
    flipSound?.play();
    setTimeout(()=>{ current--; showCurrent(); }, 1000);
  }
}

// Arrow click
document.addEventListener("click", e=>{
  if(e.target.classList.contains("next")) flipForward();
  if(e.target.classList.contains("prev")) flipBack();
});

// Background click triggers forward flip
document.querySelector(".book-wrapper").addEventListener("click", e=>{
  if(!e.target.classList.contains("next") && !e.target.classList.contains("prev")){
    flipForward();
  }
});

// Initialize
showCurrent();