const hamburger = document.querySelector(".hamburger");
let clickToggle = 0
hamburger.addEventListener("click", () => {
  // make hamburger-menu display block
  if(clickToggle === 0){
    document.querySelector(".hamburger-menu").style.display = "block";
    clickToggle = 1
  }
  else{
    document.querySelector(".hamburger-menu").style.display = "none";
    clickToggle = 0
  }
});
