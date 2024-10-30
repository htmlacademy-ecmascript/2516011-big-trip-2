import { render, replace, remove } from '../framework/render.js';

import TripPointView from '../view/trip-point-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';

export default class TripPointPresenter {
  #point = null;
  #container = null;

  #pointComponent = null;
  #editorComponent = null;
  #tripPointItem = new TripEventsItemView();

  constructor({ container }) {
    this.#container = container;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditorComponent = this.#editorComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      offers: this.#point.offers,
      onEditButtonClick: () => {
        this.#replacePointToEditor();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
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

    if (prevPointComponent === null || prevEditorComponent === null) {
      render(this.#tripPointItem, this.#container.element);
      render(this.#pointComponent, this.#tripPointItem.element);
      return;
    }

    if (this.#container.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#container.element.contains(prevEditorComponent.element)) {
      replace(this.#editorComponent, prevEditorComponent);
    }

    remove(prevPointComponent);
    remove(prevEditorComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editorComponent);
    remove(this.#tripPointItem);
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

  #handleFavoriteClick = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#updatePoint();
  };

  #updatePoint() {
    const oldPointComponent = this.#pointComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      offers: this.#point.offers,
      onEditButtonClick: () => {
        this.#replacePointToEditor();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    replace(this.#pointComponent, oldPointComponent);
    remove(oldPointComponent);
  }
}
