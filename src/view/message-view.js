import { createElement } from '../render.js';

function createMessageTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class MessageView {
  getTemplate() {
    return createMessageTemplate();
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

