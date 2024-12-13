import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils/point.js';
import {filter} from '../utils/filter.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import TripInfoView from '../view/trip-info-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import MessageView from '../view/message-view.js';

import TripPointPresenter from './trip-point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import FilterModel from '../model/filter-model.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #container = null;
  #headerContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #loadingMessageComponent = new MessageView({ messageText: 'LOADING' });
  #failureMessageComponent = new MessageView({ messageText: 'FAILURE' });
  #noPointsComponent = null;
  #isLoading = true;
  #faildToLoadData = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #onNewPointFormClose = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #pointListComponent = new TripEventsListView();
  #TripInfoElement = null;
  #newPointButtonComponent = null;
  #tripPointPresenters = new Map();
  #newTripPointPresenter = null;

  constructor({ container, headerContainer, pointsModel, newPointButtonComponent, onNewPointFormClose }) {
    this.#container = container;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#newPointButtonComponent = newPointButtonComponent;
    this.#onNewPointFormClose = onNewPointFormClose;
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
    this.#renderFilter();
    this.#renderBoard();
  }

  #renderFilter() {
    const siteFilterElement = this.#headerContainer.querySelector('.trip-controls__filters');
    const filterPresenter = new FilterPresenter({
      filterContainer: siteFilterElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
      newPointButtonComponent: this.#newPointButtonComponent,
    });
    filterPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    render(this.#pointListComponent, this.#container);
    this.#newTripPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointFormClose,
      getDestinationsNames: this.#pointsModel.getDestinationsNames,
      getDestinationsDetails: this.#pointsModel.getDestinationsDetails,
      getOfferById: this.#pointsModel.getOfferById,
      getOffersByType: this.#pointsModel.getOffersByType,
    });

    this.#newTripPointPresenter.init();
  }

  #renderTripPoint(point) {
    render(this.#pointListComponent, this.#container);
    const tripPointPresenter = new TripPointPresenter({
      container: this.#pointListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      getDestinationsNames: this.#pointsModel.getDestinationsNames,
      getDestinationsDetails: this.#pointsModel.getDestinationsDetails,
      getOfferById: this.#pointsModel.getOfferById,
      getOffersByType: this.#pointsModel.getOffersByType,
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#container);
  }

  #renderInfo(points) {
    this.#TripInfoElement = new TripInfoView({points: points});
    render(this.#TripInfoElement, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    if (this.#isLoading) {
      render(this.#loadingMessageComponent, this.#container);
      return;
    }

    if (this.#faildToLoadData) {
      render(this.#failureMessageComponent, this.#container);
      return;
    }

    this.#noPointsComponent = new MessageView({
      messageText: this.#filterType
    });

    const points = this.pointsWithDetails;

    this.#renderInfo(points);

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

    remove(this.#TripInfoElement);
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
  #handleViewAction = async(actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newTripPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
          this.#newPointButtonComponent.element.disabled = false;
        } catch(err) {
          this.#newTripPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointPresenters.get(update.id).setDeleting();
        try {
          this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingMessageComponent);
        this.#renderBoard();
        break;
      case UpdateType.FAILURE:
        this.#isLoading = false;
        this.#faildToLoadData = true;
        remove(this.#loadingMessageComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newTripPointPresenter?.destroy();
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#newPointButtonComponent.element.disabled = false;
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
