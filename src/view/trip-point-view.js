import AbstractView from '../framework/view/abstract-view';
import { getFormattedDuration } from '../utils/point.js';

function createTripPointTemplate(point) {
  const {
    type = 'flight',
    basePrice = 0,
    dateFrom = '',
    dateTo = '',
    destination = {},
    offers = [],
    isFavorite = false
  } = point || {};

  const { name = 'undefined' } = destination || {};

  const offersMarkup = offers && offers.length > 0
    ? offers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')
    : '';

  return (`<div class="event">
            <time class="event__date" datetime="${new Date(dateFrom).toISOString()}">${new Date(dateFrom).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${dateFrom}">${new Date(dateFrom).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit' })}</time>
                &mdash;
                <time class="event__end-time" datetime="${dateTo}">${new Date(dateTo).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit' })}</time>
              </p>
              <p class="event__duration">${getFormattedDuration(dateFrom, dateTo)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${offersMarkup}
            </ul>
            <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>`);
}

export default class TripPointView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onEditButtonClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
