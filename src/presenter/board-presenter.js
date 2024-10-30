import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render.js';

import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/trip-sort-view.js';
import MessageView from '../view/message-view.js';

import TripPointPresenter from './trip-point-presenter.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;

  #pointsWithDetails = null;
  #listComponent = new TripEventsListView();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsModel.init();
    this.#pointsWithDetails = this.#pointsModel.pointsWithDetails;

    this.#renderHeader();
    this.#renderBoard();
  }

  #renderTripPoint(point) {
    const tripPointItem = new TripPointPresenter({
      point,
      listContainer: this.#listComponent.element
    });
    tripPointItem.init();
  }

  #renderHeader() {
    const filters = generateFilter(this.#pointsWithDetails);
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new TripFilterView({filters}), siteFilterElement);
  }

  #renderBoard() {
    if (this.#pointsWithDetails.length === 0) {
      render(new MessageView('Click New Event to create your first point'), this.#container);
      return;
    }

    render(this.#listComponent, this.#container);
    render(new SortView(), this.#listComponent.element);

    for (const pointWithDetails of this.#pointsWithDetails) {
      this.#renderTripPoint(pointWithDetails);
    }
  }
}
