import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPES } from '../const.js';

function createEventEditorTemplate(data) {
  const {
    type = 'flight',
    basePrice = 0,
    dateFrom = new Date().toISOString(),
    dateTo = new Date().toISOString(),
    destination = {},
    offers = [],
    isEventExist = false,
  } = data;

  const pointId = data.id || 0;

  const offerMarkup = offers.map((offer) => `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.title}"
        ${offer.isChecked ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');

  const picturesMarkup = destination.pictures && Array.isArray(destination.pictures)
    ? destination.pictures.map((picture) => `
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">
      `).join('')
    : '';

  return (`<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-${pointId}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((eventType) => `
              <div class="event__type-item">
                <input
                  id="event-type-${eventType}-${pointId}"
                  class="event__type-input visually-hidden"
                  type="radio"
                  name="event-type"
                  value="${eventType}"
                  ${eventType === type ? 'checked' : ''}
                >
                <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-${pointId}">
                  ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                </label>
              </div>`).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-${destination.id}">
          ${type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
        <input
          class="event__input event__input--destination"
          id="event-destination-${destination.id}"
          type="text"
          name="event-destination"
          value="${destination.name || ''}"
          list="destination-list-${destination.id}"
        >
        <datalist id="destination-list-${destination.id}">
          <option value="${destination.name}"></option>
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-${pointId}"
          type="text"
          name="event-start-time"
          value="${new Date(dateFrom).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date(dateFrom).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}"
        >
        &mdash;
        <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-${pointId}"
          type="text"
          name="event-end-time"
          value="${new Date(dateTo).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date(dateTo).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}"
        >
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-${pointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input event__input--price"
          id="event-price-${pointId}"
          type="text"
          name="event-price"
          value="${basePrice}"
        >
      </div>

      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      ${isEventExist ? '<button class="event__reset-btn" type="reset">Delete</button> <button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span></button>' : '<button class="event__reset-btn" type="reset">Cancel</button>'}
    </header>

    <section class="event__details">
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${offerMarkup}</div>
      </section>
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description || ''}</p>
      </section>
      <div class="event__photos-container">
        <div class="event__photos-tape">${picturesMarkup}</div>
      </div>
    </section>
  </form>`);
}

export default class EventEditorView extends AbstractStatefulView {
  #handleEditorSubmit = null;
  #handleCloseButtonClick = null;
  #pointId = null;

  constructor({ point, destination, offers, isEventExist, onEditorSubmit, onCloseButtonClick }) {
    super();
    this._setState(EventEditorView.parsePointToState(point, destination, offers, isEventExist));
    this.#handleEditorSubmit = onEditorSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;

    this.#pointId = point.id || 0;

    this._restoreHandlers(); // Восстанавливаем обработчики
  }

  get template() {
    return createEventEditorTemplate(this._state);
  }

  _restoreHandlers() {
    const formElement = this.element.querySelector('form');
    if (formElement) {
      formElement.addEventListener('submit', this.#editorSubmitHandler);
    }

    const typeListElement = this.element.querySelector('.event__type-list');
    if (typeListElement) {
      typeListElement.addEventListener('change', this.#eventTypeChangeHandler);
    }

    const destinationElement = this.element.querySelector(`#event-destination-${this._state.destination.id}`);
    if (destinationElement) {
      destinationElement.addEventListener('input', this.#destinationChangeHandler);
    }

    const dateFromElement = this.element.querySelector(`#event-start-time-${this.#pointId}`);
    if (dateFromElement) {
      dateFromElement.addEventListener('input', this.#dateFromChangeHandler);
    }

    const dateToElement = this.element.querySelector(`#event-end-time-${this.#pointId}`);
    if (dateToElement) {
      dateToElement.addEventListener('input', this.#dateToChangeHandler);
    }

    const priceElement = this.element.querySelector(`#event-price-${this.#pointId}`);
    if (priceElement) {
      priceElement.addEventListener('input', this.#priceChangeHandler);
    }

    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    offerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    if (this._state.isEventExist) {
      const rollupButton = this.element.querySelector('.event__rollup-btn');
      if (rollupButton) {
        rollupButton.addEventListener('click', this.#handleCloseButtonClick);
      }
    }
  }

  #editorSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditorSubmit(EventEditorView.parseStateToPoint(this._state));
  };

  #eventTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: {
        ...this._state.destination,
        name: evt.target.value
      }
    });
  };

  #dateFromChangeHandler = (evt) => {
    this.updateElement({
      dateFrom: evt.target.value
    });
  };

  #dateToChangeHandler = (evt) => {
    this.updateElement({
      dateTo: evt.target.value
    });
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    const updatedOffers = this._state.offers.map((offer) => {
      if (offer.id === +evt.target.id.split('-')[2]) {
        return { ...offer, isChecked: evt.target.checked };
      }
      return offer;
    });
    this.updateElement({
      offers: updatedOffers
    });
  };

  static parsePointToState(point, destination, offers, isEventExist) {
    return { ...point, destination, offers, isEventExist };
  }

  static parseStateToPoint(state) {
    const { ...pointData } = state;
    return pointData;
  }
}
