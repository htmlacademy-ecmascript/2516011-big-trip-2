import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import SortView from '../view/trip-sort-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripPointView from '../view/trip-point-view.js';
import MessageView from '../view/message-view.js';

import { render, RenderPosition } from '../render.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  ListComponent = new TripEventsListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new TripFilterView(), siteFilterElement);

    render(this.ListComponent, this.container);
    render(new SortView(), this.ListComponent.getElement());

    const eventEditorItem = new TripEventsItemView();
    render(eventEditorItem, this.ListComponent.getElement());
    render(new EventEditorView({ isEventExist: true }), eventEditorItem.getElement());

    for (let i = 0; i < 3; i++) {
      const tripPointItem = new TripEventsItemView();
      render(tripPointItem, this.ListComponent.getElement());
      render(new TripPointView(), tripPointItem.getElement());
    }

    render(new MessageView(), this.ListComponent.getElement());
  }
}