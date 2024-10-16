import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import SortView from '../view/trip-sort-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripPointView from '../view/trip-point-view.js';
import MessageView from '../view/message-view.js';

import { render, RenderPosition } from '../framework/render.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  ListComponent = new TripEventsListView();

  constructor({ container, PointsModel }) {
    this.container = container;
    this.PointsModel = PointsModel;
  }

  init() {
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new TripFilterView(), siteFilterElement);

    render(this.ListComponent, this.container);
    render(new SortView(), this.ListComponent.element);

    const pointsModel = new this.PointsModel();
    pointsModel.init();
    this.pointsWithDetails = pointsModel.getPointsWithDetails();

    const eventEditorItem = new TripEventsItemView();
    render(eventEditorItem, this.ListComponent.element);
    render(new EventEditorView(this.pointsWithDetails[0], this.pointsWithDetails[0].destination, this.pointsWithDetails[0].offers, { isEventExist: true }), eventEditorItem.element);

    for (const pointWithDetails of this.pointsWithDetails) {
      const tripPointItem = new TripEventsItemView();
      render(tripPointItem, this.ListComponent.element);
      render(new TripPointView(pointWithDetails, pointWithDetails.offers), tripPointItem.element);
    }

    render(new MessageView(), this.ListComponent.element);
  }
}
