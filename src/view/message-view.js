import AbstractView from '../framework/view/abstract-view';

function createMessageTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class MessageView extends AbstractView {
  get template() {
    return createMessageTemplate();
  }
}

