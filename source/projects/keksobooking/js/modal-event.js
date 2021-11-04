import {closeSuccessModal, closeErrorModal} from './modal.js';

const isEsc = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Обработчик окна с объявление об успешной отправки данных при нажатии на ESC
const onSuccessPopupEscKeydown = (evt) => {
  if (isEsc) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

const onCloseSuccessModal = () => {
  closeSuccessModal();
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEsc) {
    evt.preventDefault();
    closeErrorModal();
  }
};

// закрытие окна с объявлением
const onCloseErrorModal = () => {
  closeErrorModal();
};

export {onSuccessPopupEscKeydown, onCloseSuccessModal, onErrorPopupEscKeydown, onCloseErrorModal};
