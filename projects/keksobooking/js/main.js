import {disableForm, initForm, formSubmitHandler} from './form.js';
import {loadMap} from './map.js';
import {getData} from './api.js';
import {getFilteredAds, filterChange, changeAds} from './filter.js';
import {debounce} from './utils/debounce.js';
import {RERENDER_DELAY} from './vars.js';
import {onResetButton} from './modal.js';
import './img.js';

disableForm();
loadMap();
initForm();
getData((offers) => {
  getFilteredAds(offers);
  changeAds(debounce(() => {
    filterChange(offers);
  }, RERENDER_DELAY));
  onResetButton(() => {
    getFilteredAds(offers);
  });
  formSubmitHandler(offers);
});
