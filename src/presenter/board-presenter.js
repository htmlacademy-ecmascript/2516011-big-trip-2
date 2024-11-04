import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils/task.js';

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

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];
  #pointsWithDetails = null;
  #listComponent = new TripEventsListView();
  #tripPointPresenters = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsModel.init();
    this.#pointsWithDetails = this.#pointsModel.pointsWithDetails;
    this.#sourcedBoardPoints = this.#pointsModel.pointsWithDetails;

    this.#renderBoard();
  }

  #renderHeader() {
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filters = generateFilter(this.#pointsWithDetails);
    render(new TripFilterView({filters}), siteFilterElement);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#pointsWithDetails.sort(sortPointByDay);
        break;
      case SortType.TIME:
        this.#pointsWithDetails.sort(sortPointByTime);
        break;
      case SortType.PRICE:
        this.#pointsWithDetails.sort(sortPointByPrice);
        break;
      default:
        this.#pointsWithDetails = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #clearPointsList() {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();
  }

  #renderTripPointsList () {
    for (const pointWithDetails of this.#pointsWithDetails) {
      this.#renderTripPoint(pointWithDetails);
    }
  }

  #renderTripPoint(point) {
    render(this.#listComponent, this.#container);
    const tripPointPresenter = new TripPointPresenter({
      container: this.#listComponent,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }

  #renderNoPoints() {
    render(new MessageView('Click New Event to create your first point'), this.#container);
  }

  #renderBoard() {
    if (this.#pointsWithDetails.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderHeader();
    this.#renderFilter();
    this.#renderSort();
    this.#renderTripPointsList();
  }

  #handleTripPointChange = (updatedTripPoint) => {
    this.#pointsWithDetails = updateItem(this.#pointsWithDetails, updatedTripPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedTripPoint);
    this.#tripPointPresenters.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #handleModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderTripPointsList();
  };
}
