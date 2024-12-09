import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const EmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  LOADING: 'Loading...',
};

function createMessageTemplate(filterType) {
  const emptyMessageValue = EmptyMessage[filterType];
  return `<p class="trip-events__msg">${emptyMessageValue}</p>`;
}

export default class MessageView extends AbstractView {
  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createMessageTemplate(this.#filterType);
  }
}
