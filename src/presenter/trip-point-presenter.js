import { render, replace, remove } from '../framework/render.js';

import TripPointView from '../view/trip-point-view.js';
import EventEditorView from '../view/event-editor-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  #point = null;
  #destinations = null;
  #container = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editorComponent = null;
  #tripPointItem = new TripEventsItemView();

  #mode = Mode.DEFAULT;

  constructor({ container, onDataChange, onModeChange }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destinations) {
    this.#point = point;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditorComponent = this.#editorComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      onEditButtonClick: () => {
        this.#replacePointToEditor();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editorComponent = new EventEditorView({
      point: this.#point,
      destinations: this.#destinations,
      isEventExist: true,
      onEditorSubmit: this.#handlerEditorSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseButtonClick: this.#handlerCloseButtonClick,
    });

    if (!prevPointComponent || !prevEditorComponent) {
      render(this.#tripPointItem, this.#container.element);
      render(this.#pointComponent, this.#tripPointItem.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
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

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editorComponent.reset(this.#point, this.#point.destination, this.#point.offers, true);
      this.#replaceEditorToPoint();
    }
  }

  #replacePointToEditor = () => {
    replace(this.#editorComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditorToPoint = () => {
    replace(this.#pointComponent, this.#editorComponent);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editorComponent.reset(this.#point, this.#point.destination, this.#point.offers, true);
      this.#replaceEditorToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };

  #handlerEditorSubmit = (updatedPoint) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dueDate, updatedPoint.dueDate);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint,
    );
    this.#replaceEditorToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handlerCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#editorComponent.reset(this.#point, this.#point.destination, this.#point.offers, true);
    this.#replaceEditorToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
