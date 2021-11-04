import {translatedTypeHouse, nameClasses, nameClassesOfFeatures} from './vars.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Отрисовка всех доступных удобств
 *
 * @param {array} elements - массив со случайными удобствами
 * @param {object} template - скопированный шаблон
 * @param {object} glossary - перечесление название удобств и их классов
 */
const renderSimilarFeatures = (elements, template, glossary) => {
  Object.keys(glossary).forEach((item) => {
    if (elements === undefined) {
      template.querySelector('.popup__features').textContent = '';
    }else if (!elements.includes(item)) {
      template.querySelector(glossary[item]).remove();
    }
  });
};

/**
 * Отрисовка галереи изображений объявления
 *
 * @param {array} elements - массив со ссылками на фотографии
 * @param {object} template - клонированный объект объявления в котором присутствует тег изображения
 * @returns {array}
 */
const renderSimilarPhotos = (elements, template) => {
  const photos = template.querySelector('.popup__photos');
  const photo = template.querySelector('.popup__photo');
  if (elements === undefined) {
    return photos.remove();
  } else {
    elements.forEach((element, index) => {
      if (index === 0) {
        photo.src = element;
      } else {
        const newPhoto = photo.cloneNode(false);
        newPhoto.src = element;
        photos.appendChild(newPhoto);
      }
    });
  }
};

/**
 *
 * @param {object} obj - объявление
 * @param {undefined} template - шаблон верстки объявления
 * @param {object} className - словарь с имена классов шаблона
 */
const checkValue = (obj, template, className) => {
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === 'object') {
      checkValue(obj[item], template, className);
    }else if (!obj[item]) {
      template.querySelector(className[item]).remove();
    }
  });
};

/**
 * Отрисовка объявления в разметке
 *
 * @param {underfined} element - объявление
 */
const renderCard = (element) => {
  const newOffer = offerTemplate.cloneNode(true);

  newOffer.querySelector('.popup__title').textContent = element.offer.title;
  newOffer.querySelector('.popup__text--address').textContent = element.offer.address;
  newOffer.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  newOffer.querySelector('.popup__type').textContent = translatedTypeHouse[element.offer.type];
  newOffer.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  renderSimilarFeatures(element.offer.features, newOffer, nameClassesOfFeatures);
  newOffer.querySelector('.popup__description').textContent = element.offer.description;
  renderSimilarPhotos(element.offer.photos, newOffer);
  newOffer.querySelector('.popup__avatar').src = element.author.avatar;
  checkValue(element, newOffer, nameClasses);
  return newOffer;
};

export {renderCard};
