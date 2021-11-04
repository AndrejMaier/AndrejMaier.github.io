import {sendData} from './api.js';
import {roomsAndGuests, typeHouseAndPrice, DECIMAL, setAddress} from './vars.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
const typeHouse = document.querySelector('#type');
const priceField = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const quantityGuests = document.querySelector('#capacity');
const quantityGuestsList = quantityGuests.querySelectorAll('option');
const checkinField = document.querySelector('#timein');
const checkoutField = document.querySelector('#timeout');
const addressField = document.querySelector('#address');


// Переводит страницу в неактивное состояние
const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersSelect.forEach((element) => {
    element.disabled = true;
  });
  mapFiltersFieldset.forEach((element) => {
    element.disabled = true;
  });
};

// Переводит страницу в активное состояние
const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersSelect.forEach((element) => {
    element.disabled = false;
  });
  mapFiltersFieldset.forEach((element) => {
    element.disabled = false;
  });
};

//
// Валидация формы
//

// синхронизация полей "количество комнат" и "количество мест"
const syncRoomsAndGuests = () => {
  rooms.addEventListener('change', (e) => {
    const room = Number(e.target.value);
    quantityGuestsList.forEach((option) => {
      if (roomsAndGuests[room].includes(Number(option.value))) {
        option.disabled = false;
        option.selected = true;
      }else {
        option.disabled = true;
      }
    });
  });
};

// синхронизация полей "тип жилья" и "цена за ночь"
const syncTypeHouseAndPrice = () => {
  typeHouse.addEventListener('change', (e) => {
    priceField.min = typeHouseAndPrice[e.target.value];
    priceField.placeholder = typeHouseAndPrice[e.target.value];
  });
};

// обработчик события изменения значения поля времени
const syncCheckTime = (time1, time2) => {
  time1.addEventListener('input', (e) => {
    time2.value = e.target.value;
  });
};

//синхронизация полей "время заезда и выезда"
const syncCheckinAndCheckout = () => {
  syncCheckTime(checkinField, checkoutField);
  syncCheckTime(checkoutField, checkinField);
};

const getSetAddress = (coordinates) => {
  const lat = coordinates.lat.toFixed(DECIMAL);
  const lng = coordinates.lng.toFixed(DECIMAL);
  addressField.value = `${lat}, ${lng}`;
};

// настройка формы
const initForm = () => {
  syncRoomsAndGuests();
  syncTypeHouseAndPrice();
  syncCheckinAndCheckout();
  getSetAddress(setAddress);
};

//Обработка события отправки формы объявления
const formSubmitHandler = (ads) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(new FormData(evt.target), ads);
  });
};

export {disableForm, enableForm, initForm, addressField, formSubmitHandler, adForm};
