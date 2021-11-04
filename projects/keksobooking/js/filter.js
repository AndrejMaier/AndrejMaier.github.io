import {putPinToMap, clearPinsGroup} from './map.js';
import {filterPriceCategory, COUNT_OFFERS} from './vars.js';

const filterForm = document.querySelector('.map__filters');
const filterFieldTypeHouse = filterForm.querySelector('#housing-type');
const filterFieldPriceHouse = filterForm.querySelector('#housing-price');
const filterFieldRoomsHouse = filterForm.querySelector('#housing-rooms');
const filterFieldOfGuests = filterForm.querySelector('#housing-guests');
const checkListOfFeatures = filterForm.querySelectorAll('input[name="features"]');

//правило фильтрации по типу жилья
const filterOfType = (ad) => ad.offer.type === filterFieldTypeHouse.value || filterFieldTypeHouse.value === 'any';

//Правило фильтрации по цене
const filterOfPrice = (ad) => {
  if (filterFieldPriceHouse.value === 'any') {
    return true;
  } else {
    return ad.offer.price >= filterPriceCategory[filterFieldPriceHouse.value].start && ad.offer.price <= filterPriceCategory[filterFieldPriceHouse.value].end;
  }
};

// Правило фильтрации по колличеству комнат
const filterOfRooms = (ad) => ad.offer.rooms === Number(filterFieldRoomsHouse.value) || filterFieldRoomsHouse.value === 'any';

// Правило фильтрации по колличеству гостей
const filterOfGuests = (ad) => ad.offer.guests === Number(filterFieldOfGuests.value) || filterFieldOfGuests.value === 'any';

// Правило фильтрации по удобствам
const filterOfFeatures = (ad) => Array.from(checkListOfFeatures)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(filterFeature.value);
  });

// Получение отфильтрованного массива
const getFilteredAds = (ads) => {
  ads
    .filter((ad) => (filterOfType(ad) && filterOfPrice(ad) && filterOfRooms(ad) && filterOfGuests(ad) && filterOfFeatures(ad)))
    .slice(0, COUNT_OFFERS)
    .forEach((ad) => putPinToMap(ad));
};

// Перерисовка пинов на карте согласно фильтру
const filterChange = (ads) => {
  filterForm.addEventListener('change', () => {
    clearPinsGroup();
    getFilteredAds(ads);
  });
};

const changeAds = (update) => {
  update();
};

export {getFilteredAds, filterChange, changeAds};
