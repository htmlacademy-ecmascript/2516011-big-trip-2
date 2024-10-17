import AbstractView from '../framework/view/abstract-view';

function createTripEventsItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class TripEventsItemView extends AbstractView{
  get template() {
    return createTripEventsItemTemplate();
  }
}
