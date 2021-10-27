var link = document.querySelector(".btn-contacts");
var popup = document.querySelector(".modal-feedback");
var close = popup.querySelector(".modal-close");
var login = popup.querySelector("[name=sender-name]");
var form = popup.querySelector("form");
var email = popup.querySelector("[name=sender-email]");
var feedbackMessage = popup.querySelector("[name=sender-message]");

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  login.focus();
  });

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
  });

form.addEventListener("submit", function (evt) {
    if (!login.value || !email.value || !feedbackMessage.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("login", login.value);
      }
    }
  });

var mapLink = document.querySelector(".contacts-map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal-show");
  });

  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("modal-show");
  });

// Табы
let tabs = document.querySelectorAll(".btn-service");
let tabsContent = document.querySelectorAll(".service-item");
let tabsIndex = document.querySelectorAll("dt");

for (let i = 0; i < tabs.length; i++) {
  let tab = tabs[i];
  let tabIndex = tabsIndex[i];
  let tabContent = tabsContent[i];
  tab.addEventListener("click", function (evt) {
    evt.preventDefault();
    let tabsActive = document.querySelector(".btn-active");
    let tabsContentActive = document.querySelector(".service-item-active");
    let tabsIndexActive = document.querySelector(".service-list__active");
    tabsIndexActive.classList.remove("service-list__active");
    tabIndex.classList.add("service-list__active");
    tabsContentActive.classList.remove("service-item-active");
    tabContent.classList.add("service-item-active");
    tabsActive.classList.remove("btn-active");
    tabsActive.classList.add("btn");
    tab.classList.remove("btn");
    tab.classList.add("btn-active");
  })
}

// Слайдеры

let sliderSwitches = document.querySelectorAll(".slider-switch");
let sliderItems = document.querySelectorAll(".item");

let sliderPlayer = function(i) {
  let sliderSwitchActive = document.querySelector(".active");
  let sliderItemActive = document.querySelector(".item-active");
  sliderSwitchActive.classList.remove("active");
  sliderItemActive.classList.remove("item-active");
  sliderSwitches[i].classList.add("active");
  sliderItems[i].classList.add("item-active");
}



// решить вопрос
let timer = setInterval(function() {
  for (let i = 0; i < sliderSwitches.length; i++) {
    if (i === sliderSwitches.length) {
      return i = 0;
    } else {
      return i;
    }
  };
  sliderPlayer(i);
}, 3000)
//



for (let i = 0; i < sliderSwitches.length; i++) {
  let sliderSwitch = sliderSwitches[i];
  let sliderItem = sliderItems[i];

  sliderSwitch.addEventListener("click", function(evt) {
    evt.preventDefault();
    let sliderSwitchActive = document.querySelector(".active");
    let sliderItemActive = document.querySelector(".item-active");
    sliderSwitchActive.classList.remove("active");
    sliderItemActive.classList.remove("item-active");
    sliderSwitch.classList.add("active");
    sliderItem.classList.add("item-active");
  })
}

