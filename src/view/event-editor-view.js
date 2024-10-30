import AbstractView from '../framework/view/abstract-view';
import { POINT_TYPES } from '../const.js';

function createEventEditorTemplate(point = {}, destination, offers, isEventExist = false) {
  const {
    type = 'flight',
    basePrice = 0,
    dateFrom = new Date().toISOString(),
    dateTo = new Date().toISOString(),
  } = point;
  const pointId = point.id || 0;

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

  const picturesMarkup = destination.pictures && Array.isArray(destination.pictures) ? destination.pictures.map((picture) => `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('') : '';

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
                        <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-${pointId}">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
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

                <div class="event__available-offers">
                  ${offerMarkup}
                </div>
              </section>
              <section class="event__section event__section--destination">
                <h3 class="event__section-title event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${destination.description || ''}</p>
              </section>
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${picturesMarkup}
                </div>
              </div>
            </section>
          </form>`);
}

export default class EventEditorView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #isEventExist = null;
  #handleEditorSubmit = null;
  #handleCloseButtonClick = null;

  constructor({point, destination, offers, isEventExist, onEditorSubmit, onCloseButtonClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#isEventExist = isEventExist;
    this.#handleEditorSubmit = onEditorSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;

    this.element.addEventListener('submit', this.#editorSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleCloseButtonClick);
  }

  get template() {
    return createEventEditorTemplate(this.#point, this.#destination, this.#offers, this.#isEventExist);
  }

  #editorSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditorSubmit();
  };
}
