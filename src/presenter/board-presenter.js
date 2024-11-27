import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render.js';
import { EMPTY_MESSAGE, SortType } from '../const.js';
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
  #listComponent = new TripEventsListView();
  #tripPointPresenters = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  get pointsWithDetails() {
    const points = this.#pointsModel.pointsWithDetails;
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...points].sort(sortPointByDay);
      case SortType.TIME:
        return [...points].sort(sortPointByTime);
      case SortType.PRICE:
        return [...points].sort(sortPointByPrice);
      default:
        return points;
    }
  }

  init() {
    this.#renderBoard();
  }

  #renderHeader() {
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filters = generateFilter(this.#pointsModel.pointsWithDetails);
    render(new TripFilterView({filters}), siteFilterElement);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  }

  #clearPointsList() {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();
  }

  #renderTripPointsList(points) {
    points.forEach((point) => this.#renderTripPoint(point));
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
    render(new MessageView(EMPTY_MESSAGE), this.#container);
  }

  #renderBoard() {
    const points = this.#pointsModel.pointsWithDetails;

    if (!points || points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderHeader();
    this.#renderFilter();
    this.#renderSort();
    this.#renderTripPointsList(points);
  }

  #handleTripPointChange = (updatedTripPoint) => {
    //здесь необходимо реализовать обновление модели
    this.#tripPointPresenters.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #handleModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderTripPointsList(this.pointsWithDetails);
  };
}
