import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render.js';
import { EMPTY_MESSAGE, SortType, UpdateType, UserAction } from '../const.js';
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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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
      onDataChange: this.#handleViewAction,
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

  /**
   * Обработчик действий пользователя.
   * @param {string} actionType - Тип действия (например, 'ADD_POINT').
   * @param {string} updateType - Тип обновления (например, 'PATCH', 'MINOR').
   * @param {object} update - Обновленные данные точки маршрута.
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }
  };

  /**
   * Обработчик изменений в модели.
   * @param {string} updateType - Тип обновления.
   * @param {object} data - Обновленные данные.
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // Обновляем конкретную точку
        this.#tripPointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // Обновляем список
        this.#clearPointsList();
        this.#renderTripPointsList(this.pointsWithDetails);
        break;
      case UpdateType.MAJOR:
        // Полная перерисовка
        this.#clearPointsList();
        this.#renderBoard();
        break;
      default:
        throw new Error(`Unknown update type: ${updateType}`);
    }
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
