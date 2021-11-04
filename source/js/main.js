const btnMenuOpen = document.querySelector(".burger--open");
const btnMenuClose = document.querySelector(".burger--close");
const menu = document.querySelector(".menu");

btnMenuOpen.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.add("menu--open");
})

btnMenuClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.remove("menu--open");
})


const form = document.querySelector("form");
const submitBtn = form.querySelector(".btn");
const inputName = form.querySelector("#name");
const inputEmail = form.querySelector("#email");
const textareaMessage = form.querySelector("#message");

const countLength = (item, itemLength, itemSetting) => {
  item.addEventListener("input", () => {
    if (item.value.length >= itemLength) {
      itemSetting.disabled = false;
    }else {
      itemSetting.disabled = true;
    }
  })
}

countLength(inputName, 2, inputEmail);
countLength(inputEmail, 5, textareaMessage);
countLength(textareaMessage, 10, submitBtn);