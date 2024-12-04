import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPES } from '../const.js';
import { getOffersByType, getDestinationDetails } from '../utils/data-fetch.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/themes/material_blue.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: null,
  isFavorite: false,
  offers: null,
  type: 'taxi',
  typeOffers: [
    {
      id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
      title: 'Upgrade to a business class',
      price: 120
    },
    {
      id: 'e3f4e556-89c3-41bb-bae2-45b2d58d5512',
      title: 'Choose a premium taxi',
      price: 200
    }
  ],
  isEventExist: true
};

function createEventTypeTemplate(pointId, type) {
  return POINT_TYPES.map((eventType) => `
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
    </div>`).join('');
}

function createDateInputsTemplate(pointId, dateFrom, dateTo) {
  const formattedDateFrom = `${new Date(dateFrom).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date(dateFrom).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}`;
  const formattedDateTo = `${new Date(dateTo).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date(dateTo).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}`;

  return `
    <div class="event__field-group event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
      <input
        class="event__input event__input--time"
        id="event-start-time-${pointId}"
        type="text"
        name="event-start-time"
        value="${formattedDateFrom}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
      <input
        class="event__input event__input--time"
        id="event-end-time-${pointId}"
        type="text"
        name="event-end-time"
        value="${formattedDateTo}"
      >
    </div>
  `;
}

function createPriceInputTemplate(pointId, basePrice) {
  return `
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
  `;
}


function createOfferMarkup(offers) {
  if (!offers) {
    return '';
  }

  const offerLabels = offers.map((offer) => `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.title}-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.title}"
        ${offer.isChecked ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');

  return `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${offerLabels}</div>
    </section>
  `;
}

function createDestinationTemplate(destination, destinations, type) {
  const destinationOptions = destinations
    .map(({ name }) => `<option value="${name}"></option>`)
    .join('');

  return `
    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-${destination?.id || '1'}">
        ${type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination-${destination?.id || '1'}"
        type="text"
        name="event-destination"
        value="${destination?.name || ''}"
        list="destination-list-${destination?.id || '1'}"
      >
      <datalist id="destination-list-${destination?.id || '1'}">
        ${destinationOptions}
      </datalist>
    </div>
  `;
}

function creatDestinationDescription(destination) {
  if (!destination) {
    return '';
  }

  const picturesMarkup = destination.pictures && Array.isArray(destination.pictures)
    ? destination.pictures.map((picture) => `
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">
      `).join('')
    : '';

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description || ''}</p>
    </section>
    <div class="event__photos-container">
      <div class="event__photos-tape">${picturesMarkup}</div>
    </div>
  `;
}

function createEventEditorTemplate(data, destinations) {
  const {
    type ,
    basePrice = 0,
    destination,
    offers,
    isEventExist,
    dateFrom,
    dateTo,
  } = data;

  const pointId = data.id || 0;
  const offerMarkup = createOfferMarkup(offers);
  const destinationDescription = creatDestinationDescription(destination);
  const destinationTemplate = createDestinationTemplate(destination, destinations, type);
  const eventTypeTemplate = createEventTypeTemplate(pointId, type);
  const dateInputsTemplate = createDateInputsTemplate(pointId, dateFrom, dateTo);
  const priceInputTemplate = createPriceInputTemplate(pointId, basePrice);

  return `
    <form class="event event--edit" action="#" method="post">
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
              ${eventTypeTemplate}
            </fieldset>
          </div>
        </div>
        ${destinationTemplate}
        ${dateInputsTemplate}
        ${priceInputTemplate}
        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        ${isEventExist ? '<button class="event__reset-btn" type="reset">Delete</button> <button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span></button>' : '<button class="event__reset-btn" type="reset">Cancel</button>'}
      </header>
      <section class="event__details">
        ${offerMarkup}
        ${destinationDescription}
      </section>
    </form>
  `;
}

export default class EventEditorView extends AbstractStatefulView {
  #handleEditorSubmit = null;
  #destinations = null;
  #handleCloseButtonClick = null;
  #handleDeleteClick = null;
  #pointId = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = BLANK_POINT, destinations, isEventExist, onEditorSubmit, onCloseButtonClick, onDeleteClick}) {
    super();
    this._setState(EventEditorView.parsePointToState(point, isEventExist));
    this.#handleEditorSubmit = onEditorSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleDeleteClick = onDeleteClick;

    this.#destinations = destinations;
    this.#pointId = point.id || 0;

    this._restoreHandlers();
  }

  get template() {
    console.log(this.#destinations);
    return createEventEditorTemplate(this._state, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point, isEventExist) {
    this.updateElement(EventEditorView.parsePointToState(point, isEventExist));
  }

  _restoreHandlers() {
    const typeListElement = this.element.querySelector('.event__type-list');
    if (this._state.destination && typeof this._state.destination.id === 'number') {
      const destinationElement = this.element.querySelector(`#event-destination-${this._state.destination.id}`);

      if (destinationElement) {
        destinationElement.addEventListener('input', this.#destinationChangeHandler);
      }
    }
    const dateFromElement = this.element.querySelector(`#event-start-time-${this.#pointId}`);
    const dateToElement = this.element.querySelector(`#event-end-time-${this.#pointId}`);
    const priceElement = this.element.querySelector(`#event-price-${this.#pointId}`);
    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    const formElement = this.element;
    const deleteButtonElement = this.element.querySelector('.event__reset-btn');
    const rollupButtonElement = formElement.querySelector('.event__rollup-btn');

    if (typeListElement) {
      typeListElement.addEventListener('change', this.#eventTypeChangeHandler);
    }

    if (dateFromElement) {
      this.#datepickerFrom = flatpickr(dateFromElement, {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      });
    }

    if (dateToElement) {
      this.#datepickerTo = flatpickr(dateToElement, {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      });
    }

    if (priceElement) {
      priceElement.addEventListener('input', this.#priceChangeHandler);
    }

    offerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    if (formElement) {
      formElement.addEventListener('submit', this.#editorSubmitHandler);
    }

    if (deleteButtonElement) {
      deleteButtonElement.addEventListener('click', this.#formDeleteClickHandler);
    }

    if (rollupButtonElement) {
      rollupButtonElement.addEventListener('click', this.#handleCloseButtonClick);
    }
  }

  #updateOffersByType(type) {
    const updatedOffers = getOffersByType(type);
    this.updateElement({ offers: updatedOffers });
  }

  #eventTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
    this.#updateOffersByType(evt.target.value);
  };

  #updateDestinationDetails(destinationName) {
    const destination = getDestinationDetails(destinationName);
    this._setState({
      destination: {
        ...destination,
        name: destinationName,
      },
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.#updateDestinationDetails(evt.target.value);
  };

  #updateTotalPrice() {
    const selectedOffers = this._state.offers.filter((offer) => offer.isChecked);
    const offersTotal = selectedOffers.reduce((sum, offer) => sum + offer.price, 0);
    const totalPrice = this._state.basePrice + offersTotal;
    this._setState({ basePrice: totalPrice });
  }

  #offerChangeHandler = (evt) => {
    const updatedOffers = this._state.offers.map((offer) => {
      if (offer.id === evt.target.id.split('-')[2]) {
        return { ...offer, isChecked: evt.target.checked };
      }
      return offer;
    });
    this._setState({ offers: updatedOffers });
    this.#updateTotalPrice();
  };


  #editorSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditorSubmit(EventEditorView.parseStateToPoint(this._state));
  };

  #dateFromChangeHandler = ([selectedDate]) => {
    this.updateElement({
      dateFrom: selectedDate.toISOString()
    });
  };

  #dateToChangeHandler = ([selectedDate]) => {
    this.updateElement({
      dateTo: selectedDate.toISOString()
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value.replace(/[^\d]/g, ''))
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditorView.parseStateToPoint(this._state));
  };

  static parsePointToState(point, isEventExist) {
    return { ...point, isEventExist };
  }

  static parseStateToPoint(state) {
    const { ...pointData } = state;
    return pointData;
  }
}
