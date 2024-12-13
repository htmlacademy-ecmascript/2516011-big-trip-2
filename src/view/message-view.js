import AbstractView from '../framework/view/abstract-view';
import { EmptyMessage } from '../const';

function createMessageTemplate(messageText) {
  const emptyMessageValue = EmptyMessage[messageText];
  return `<p class="trip-events__msg">${emptyMessageValue}</p>`;
}

export default class MessageView extends AbstractView {
  #messageText = null;

  constructor ({messageText}) {
    super();
    this.#messageText = messageText;
  }

  get template() {
    return createMessageTemplate(this.#messageText);
  }
}
