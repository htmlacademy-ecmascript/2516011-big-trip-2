import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

import EventEditorView from '../view/event-editor-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';

export default class NewPointPresenter {
  #destinations = null;
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;

  #getDestinationsNames = null;
  #getDestinationsDetails = null;
  #getOfferById = null;
  #getOffersByType = null;

  #tripPointItem = new TripEventsItemView();

  constructor({pointListContainer, onDataChange, onDestroy, getDestinationsNames, getDestinationsDetails, getOfferById, getOffersByType}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;

    this.#getDestinationsNames = getDestinationsNames;
    this.#getDestinationsDetails = getDestinationsDetails;
    this.#getOfferById = getOfferById;
    this.#getOffersByType = getOffersByType;
  }

  init(destinations) {
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EventEditorView({
      isEventExist: false,
      destinations: this.#destinations,
      container: this.#pointListContainer,
      onEditorSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      getDestinationsNames: this.#getDestinationsNames,
      getDestinationsDetails: this.#getDestinationsDetails,
      getOfferById: this.#getOfferById,
      getOffersByType: this.#getOffersByType,
    });

    render(this.#tripPointItem, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    render(this.#pointEditComponent, this.#tripPointItem.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#tripPointItem);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
