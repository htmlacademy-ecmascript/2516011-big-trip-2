import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import SortView from '../view/trip-sort-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripPointView from '../view/trip-point-view.js';
import MessageView from '../view/message-view.js';

import { generateFilter } from '../mock/filter.js';
import { render, replace, RenderPosition } from '../framework/render.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToPoint();
      }
    };

    const pointComponent = new TripPointView({
      point: point,
      offers: point.offers,
      onEditButtonClick: () => {
        replacePointToEditor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editorComponent = new EventEditorView({
      point: point,
      destination: point.destination,
      offers: point.offers,
      isEventExist: true,
      onEditorSubmit: () => {
        replaceEditorToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseButtonClick: () => {
        replaceEditorToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToEditor() {
      replace(editorComponent, pointComponent);
    }

    function replaceEditorToPoint() {
      replace(pointComponent, editorComponent);
    }

    const tripPointItem = new TripEventsItemView();
    render(tripPointItem, this.#listComponent.element);
    render(pointComponent, tripPointItem.element);
  }

  #renderHeader() {
    const filters = generateFilter(this.#pointsWithDetails);
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new TripFilterView({filters}), siteFilterElement);
  }

  #renderBoard() {
    if (this.#pointsWithDetails.every((task) => task.isArchive)) {
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
