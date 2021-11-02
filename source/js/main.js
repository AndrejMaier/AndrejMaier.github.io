const btnMenuOpen = document.querySelector(".burger--open");
const btnMenuClose = document.querySelector(".burger--close");
const menu = document.querySelector(".menu");


btnMenuOpen.addEventListener('click', function(evt) {
  evt.preventDefault();
  menu.classList.add("menu--open");
})

btnMenuClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  menu.classList.remove("menu--open");
})