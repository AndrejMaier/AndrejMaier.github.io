
import {map, mainPinMarker} from './map.js';
import {setAddress, MAP_ZOOM} from './vars.js';
import {onSuccessPopupEscKeydown, onCloseSuccessModal, onErrorPopupEscKeydown, onCloseErrorModal} from './modal-event.js';
import {resetAvatarImg, resetPhotoHome} from './img.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const mapFilter = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');


// Возврат карты в начальные координаты
const resetPinMap = () => {
  mainPinMarker.setLatLng(setAddress);
  map.setView(setAddress, MAP_ZOOM);
};

// сброс фильтра
const resetFilter = () => {
  mapFilter.reset();
};

// сброс формы и карты
const clearAndResetFormAndMap = () => {
  document.querySelector('.ad-form').reset();
  resetPinMap();
  resetFilter();
  resetAvatarImg();
  resetPhotoHome();
};

// сброс формы, карты и фильтра при нажатии кнопки сброса
const onResetButton = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearAndResetFormAndMap();
    cb();
  });
};

// Закрытие окна с объявление об успешной отправки данных
const closeSuccessModal = () => {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  document.removeEventListener('click', onCloseSuccessModal);
  clearAndResetFormAndMap();
};

const openSuccessModal = () => {
  const modal = successModalTemplate.cloneNode(true);
  document.body.appendChild(modal);

  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  document.addEventListener('click', onCloseSuccessModal);
};

const closeErrorModal = () => {
  const errorButton = document.querySelector('.error__button');
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  document.removeEventListener('click', onCloseErrorModal);
  errorButton.removeEventListener('click', onCloseErrorModal);
};

//
// Открытие окна с объявлением об ошибки отправки данных
const openErrorModal = () => {
  const error = errorModalTemplate.cloneNode(true);
  const errorButton = error.querySelector('.error__button');
  document.body.appendChild(error);
  errorButton.addEventListener('click', onCloseErrorModal);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  document.addEventListener('click', onCloseErrorModal);
};

export {openSuccessModal, openErrorModal, onResetButton, resetFilter, resetPinMap, closeSuccessModal, closeErrorModal};
