const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const translatedTypeHouse= {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const nameClasses = {
  avatar: '.popup__avatar',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  rooms: '.popup__text--capacity',
  guests: '.popup__text--capacity',
  checkin: '.popup__text--time',
  checkout: '.popup__text--time',
  features: '.popup__features',
  photos: '.popup__photos',
};

const nameClassesOfFeatures = {
  wifi: '.popup__feature--wifi',
  dishwasher: '.popup__feature--dishwasher',
  parking: '.popup__feature--parking',
  washer: '.popup__feature--washer',
  elevator: '.popup__feature--elevator',
  conditioner: '.popup__feature--conditioner',

};

const roomsAndGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const typeHouseAndPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const setAddress = {
  lat: 35.681700,
  lng: 139.753891,
};

const DECIMAL = 5;

const ALERT_SHOW_TIME = 5000;

const filterPriceCategory = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const RERENDER_DELAY = 500;

const MAP_ZOOM = 12;

const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];

const COUNT_OFFERS = 10;

export {FEATURES, DECIMAL, translatedTypeHouse, nameClasses, roomsAndGuests, typeHouseAndPrice, setAddress, nameClassesOfFeatures, ALERT_SHOW_TIME, filterPriceCategory, RERENDER_DELAY, MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_ANCHOR, PIN_ICON_SIZE, MAP_ZOOM, COUNT_OFFERS};
