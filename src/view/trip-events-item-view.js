import { createElement } from '../render.js';

function createTripEventsItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class TripEventsItemView {
  getTemplate() {
    return createTripEventsItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
