let slideIndex = 0;
const SLIDES = document.querySelectorAll(".slide");
const DOT = document.querySelectorAll(".fa-circle");
const TEST = document.querySelector(".nav-list");
// const BULLETS = DOT.children;
// console.log(TEST);
console.log(DOT[1]);
console.log(SLIDES[0].style);

showSlide(slideIndex);

function moveSlide(x) {
  if ((slideIndex+x) >= DOT.length) {
    slideIndex = 0;
  }else if ((slideIndex+x) < 0) {
    slideIndex = DOT.length - 1;
  }
  else { slideIndex += x;}
  showSlide( slideIndex );
}
function showSlide(n) {
 for (var i = 0; i < DOT.length; i++) {
  DOT[i].classList.remove('fa-solid');
  DOT[i].classList.add('fa-regular');
  SLIDES[i].style.display = 'none';
  SLIDES[i].style.opacity = 0;
 }
 SLIDES[n].style.display = "block";
 SLIDES[n].style.opacity = 1;
 DOT[n].classList.remove('fa-regular');
 DOT[n].classList.add('fa-solid');
}