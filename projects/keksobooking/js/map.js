import {setAddress, DECIMAL, MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_ANCHOR, PIN_ICON_SIZE, MAP_ZOOM} from './vars.js';
import {enableForm, addressField} from './form.js';
import {renderCard} from './card.js';

const map = L.map('map-canvas');

const loadMap = () => {
  map
    .on('load', () => {
      enableForm();
    })
    .setView(setAddress, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  setAddress,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const address = evt.target.getLatLng();
  const lat = address.lat.toFixed(DECIMAL);
  const lng = address.lng.toFixed(DECIMAL);
  addressField.value = `${lat}, ${lng}`;
});

const pinsGroup = L.layerGroup().addTo(map);

const putPinToMap = (offer) => {
  const lat = offer.location.lat;
  const lng = offer.location.lng;

  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: PIN_ICON_SIZE,
  });

  const pinMarker = L.marker({
    lat,
    lng,
  },
  {
    icon: pinIcon,
  });

  pinMarker
    .addTo(pinsGroup)
    .bindPopup(renderCard(offer),
      {
        keepInView: true,
      },
    );
};

const putPinsToMap = (offers) => {
  offers.forEach((offer) => {
    putPinToMap(offer);
  });
};

const clearPinsGroup = () => pinsGroup.clearLayers();

export {loadMap, putPinsToMap, putPinToMap, clearPinsGroup, map, mainPinMarker};
