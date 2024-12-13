import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPES } from '../const.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/themes/material_blue.css';

function createEventTypeTemplate(pointId, type, isDisabled) {
  return POINT_TYPES.map((eventType) => `
    <div class="event__type-item">
      <input
        id="event-type-${eventType}-${pointId}"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType}"
        ${eventType === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__type-label event__type-label--${eventType}"
        for="event-type-${eventType}-${pointId}">
        ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}
      </label>
    </div>
  `).join('');
}

function createDateInputsTemplate(pointId, dateFrom, dateTo, isDisabled) {
  const formatDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

  const formattedDateFrom = dateFrom ? formatDate(dateFrom) : '';
  const formattedDateTo = dateTo ? formatDate(dateTo) : '';

  return `
    <div class="event__field-group event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
      <input
        class="event__input event__input--time"
        id="event-start-time-${pointId}"
        type="text"
        name="event-start-time"
        value="${formattedDateFrom}"
        ${isDisabled ? 'disabled' : ''}
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
      <input
        class="event__input event__input--time"
        id="event-end-time-${pointId}"
        type="text"
        name="event-end-time"
        value="${formattedDateTo}"
        ${isDisabled ? 'disabled' : ''}
      >
    </div>
  `;
}

function createPriceInputTemplate(pointId, basePrice, isDisabled) {
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
        ${isDisabled ? 'disabled' : ''}
      >
    </div>
  `;
}


function createOfferMarkup(offers, type, getOffersByType, isDisabled) {
  const offerExist = getOffersByType(type);
  if (!offerExist || offerExist.length === 0) {
    return '';
  }

  const offerLabels = offerExist.map((offer) =>
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.title}-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.title}"
        ${offers.some((attachedOffer) => attachedOffer.id === offer.id) ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
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

function createDestinationTemplate(destination, destinations, type, isDisabled) {
  const destinationOptions = destinations
    .map((name) => `<option value="${name}"></option>`)
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
        ${isDisabled ? 'disabled' : ''}
      >
      <datalist id="destination-list-${destination?.id || '1'}">
        ${destinationOptions}
      </datalist>
    </div>
  `;
}

function creatDestinationDescription(destination) {
  if (!destination || !destination.description) {
    return '';
  }

  const picturesMarkup = destination.pictures && Array.isArray(destination.pictures) && destination.pictures.length > 0
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((picture) => `
            <img class="event__photo" src="${picture.src}" alt="${picture.description}">
          `).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description || ''}</p>
    </section>
    ${picturesMarkup}
  `;
}

function createEventEditorTemplate(data, destinations, getOffersByType) {
  const {
    type,
    basePrice = 0,
    destination,
    offers,
    isEventExist,
    isDisabled,
    isSaving,
    isDeleting,
    dateFrom,
    dateTo,
  } = data;

  const pointId = data.id || 0;
  const offerMarkup = createOfferMarkup(offers, type, getOffersByType, isDisabled);
  const destinationDescription = creatDestinationDescription(destination);
  const destinationTemplate = createDestinationTemplate(destination, destinations, type, isDisabled);
  const eventTypeTemplate = createEventTypeTemplate(pointId, type, isDisabled);
  const dateInputsTemplate = createDateInputsTemplate(pointId, dateFrom, dateTo, isDisabled);
  const priceInputTemplate = createPriceInputTemplate(pointId, basePrice, isDisabled);

  const isSubmitDisabled = (dateTo && dateFrom && dateTo === null && dateFrom === null);

  return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-${pointId}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-${pointId}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
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
        <button class="event__save-btn btn btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        ${isEventExist ? `
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        ` : `
          <button class="event__reset-btn" type="reset">Cancel</button>
        `}
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
  #handleCloseButtonClick = null;
  #handleDeleteClick = null;
  #pointId = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #destinationsNames = null;
  #getDestinationsDetails = null;
  #getOfferById = null;
  #getOffersByType = null;

  constructor({ point, isEventExist, onEditorSubmit, onCloseButtonClick, onDeleteClick, getDestinationsNames, getDestinationsDetails, getOfferById, getOffersByType}) {
    super();
    if (!point) {
      point = {
        basePrice: 0,
        dateFrom: '',
        dateTo: '',
        destination: null,
        isFavorite: false,
        offers: [],
        type: 'flight',
        typeOffers: null,
        isEventExist: true
      };
    }
    this._setState(EventEditorView.parsePointToState(point, isEventExist));
    this.#handleEditorSubmit = onEditorSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleDeleteClick = onDeleteClick;

    this.#destinationsNames = getDestinationsNames();
    this.#pointId = point.id || 0;

    this.#getDestinationsDetails = getDestinationsDetails;
    this.#getOfferById = getOfferById;
    this.#getOffersByType = getOffersByType;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditorTemplate(this._state, this.#destinationsNames, this.#getOffersByType);
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
    this.updateElement(EventEditorView.parsePointToState(point, isEventExist, this.#getOffersByType));
  }

  _restoreHandlers() {
    const typeListElement = this.element.querySelector('.event__type-list');

    const destinationElement = this.element.querySelector(`#event-destination-${this._state.destination?.id || '1'}`);
    if (destinationElement) {
      destinationElement.addEventListener('change', this.#destinationChangeHandler);
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
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      });
    }

    if (dateToElement) {
      this.#datepickerTo = flatpickr(dateToElement, {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
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

  #updateDestinationDetails(destinationName) {
    const updatedDestinations = this.#getDestinationsDetails(destinationName);
    if (!updatedDestinations) {
      return;
    }
    this.updateElement({ destination: updatedDestinations });
  }

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      name: evt.target.value,
    });
    this.#updateDestinationDetails(evt.target.value);
  };

  #eventTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = evt.target.id.split('-').slice(-5).join('-');
    const isChecked = evt.target.checked;

    const updatedOffers = isChecked
      ? [...this._state.offers, this.#getOfferById(offerId)]
      : this._state.offers.filter((offer) => offer.id !== offerId);

    this._setState({ offers: updatedOffers });
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
    return { ...point,
      isEventExist,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const { ...pointData } = state;

    delete pointData.isEventExist;
    delete pointData.isDisabled;
    delete pointData.isSaving;
    delete pointData.isDeleting;
    return pointData;
  }
}
