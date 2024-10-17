import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import SortView from '../view/trip-sort-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripPointView from '../view/trip-point-view.js';
//import MessageView from '../view/message-view.js';

import { render, replace, RenderPosition } from '../framework/render.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;

  #pointsWithDetails = [];
  #listComponent = new TripEventsListView();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new TripFilterView(), siteFilterElement);

    render(this.#listComponent, this.#container);
    render(new SortView(), this.#listComponent.element);

    //Генерируем новые точки и подвязываем данные к ним
    this.#pointsModel.init();
    this.#pointsWithDetails = this.#pointsModel.pointsWithDetails;

    for (const pointWithDetails of this.#pointsWithDetails) {
      this.#renderTripPoint(pointWithDetails);
    }
  }

  #renderTripPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripPointView({
      point: point,
      offers: point.offers,
      onEditClick: () => {
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
      }
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
}
