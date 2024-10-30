import { render, replace } from '../framework/render.js';

import TripPointView from '../view/trip-point-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';

export default class TripPointPresenter {
  #point = null;
  #container = null;

  #pointComponent = null;
  #editorComponent = null;
  #tripPointItem = new TripEventsItemView();

  constructor({ point, container }) {
    this.#point = point;
    this.#container = container;
  }

  init() {
    this.#pointComponent = new TripPointView({
      point: this.#point,
      offers: this.#point.offers,
      onEditButtonClick: () => {
        this.#replacePointToEditor();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editorComponent = new EventEditorView({
      point: this.#point,
      destination: this.#point.destination,
      offers: this.#point.offers,
      isEventExist: true,
      onEditorSubmit: () => {
        this.#replaceEditorToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onCloseButtonClick: () => {
        this.#replaceEditorToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    render(this.#tripPointItem, this.#container.element);
    render(this.#pointComponent, this.#tripPointItem.element);
  }

  #replacePointToEditor = () => {
    replace(this.#editorComponent, this.#pointComponent);
  };

  #replaceEditorToPoint = () => {
    replace(this.#pointComponent, this.#editorComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditorToPoint();
    }
  };
}
