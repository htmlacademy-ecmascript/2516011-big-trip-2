import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const EmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  LOADING: 'Loading...',
  FAILURE: 'Failed to load latest route information',
};

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
