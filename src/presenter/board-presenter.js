import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils/point.js';

import TripInfoView from '../view/trip-info-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import SortView from '../view/trip-sort-view.js';
import MessageView from '../view/message-view.js';

import TripPointPresenter from './trip-point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import {filter} from '../utils/filter.js';
import FilterModel from '../model/filter-model.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noPointsComponent = null;
  #newPointButtonComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #pointListComponent = new TripEventsListView();
  #tripPointPresenters = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = new FilterModel();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get pointsWithDetails() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.pointsWithDetails;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      default:
        return filteredPoints;
    }
  }

  init() {
    this.#renderHeader();
    this.#renderFilter();
    this.#renderBoard();
  }

  #renderHeader() {
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    render(this.#newPointButtonComponent, siteHeaderElement);
    render(new TripInfoView({points: this.#pointsModel.pointsWithDetails}), siteHeaderElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
    const filterPresenter = new FilterPresenter({
      filterContainer: siteFilterElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });
    filterPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  }

  #createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    render(this.#pointListComponent, this.#container);
    const newTripPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose
    });

    newTripPointPresenter.init();
  }

  #renderTripPoint(point) {
    render(this.#pointListComponent, this.#container);
    const tripPointPresenter = new TripPointPresenter({
      container: this.#pointListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new MessageView({
      filterType: this.#filterType
    });
    render(this.#noPointsComponent, this.#container);
  }

  #renderBoard() {
    const points = this.pointsWithDetails;

    if (!points || points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    points.forEach((point) => this.#renderTripPoint(point));
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    remove(this.#pointListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
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
        this.#tripPointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
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
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };
}
