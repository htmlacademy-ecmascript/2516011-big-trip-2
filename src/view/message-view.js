import AbstractView from '../framework/view/abstract-view';

function createMessageTemplate(messageText) {
  return `<p class="trip-events__msg">${messageText}</p>`;
}

export default class MessageView extends AbstractView {

  #messageText = null;

  constructor (messageText) {
    super();
    this.#messageText = messageText;
  }

  get template() {
    return createMessageTemplate(this.#messageText);
  }
}
