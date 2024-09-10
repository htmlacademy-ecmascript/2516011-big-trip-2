import NewSortView from '../view/trip-sort-view.js';
import NewEventCreationFormHeaderView from '../view/event-creation-form-header-view.js';
import NewEventEditorHeaderView from '../view/event-editor-header-view.js';
import NewEventOffersView from '../view/event-offers-view.js';
import NewEventDestinationView from '../view/event-destination-view.js';
import NewEventPhotosContainerView from '../view/event-photos-container-view.js';
import NewTripPointView from '../view/trip-point-view.js';
import NewMessageView from '../view/message-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new NewSortView(), this.container);

    const TripEventsList = document.createElement('ul');
    TripEventsList.classList.add('trip-events__list');
    const siteTripEventsList = this.container.appendChild(TripEventsList);

    // Форма редактирования события
    const newEventEditorHeaderView = new NewEventEditorHeaderView();
    render(newEventEditorHeaderView, siteTripEventsList);
    render(new NewEventOffersView(), newEventEditorHeaderView.getElement().querySelector('.event'));
    render(new NewEventDestinationView(), newEventEditorHeaderView.getElement().querySelector('.event'));

    for(let i = 0; i < 3; i++) {
      render(new NewTripPointView(), siteTripEventsList);
    }

    // Форма создания нового события
    const newEventCreationFormHeaderView = new NewEventCreationFormHeaderView();
    render(newEventCreationFormHeaderView, siteTripEventsList);
    render(new NewEventOffersView(), newEventCreationFormHeaderView.getElement().querySelector('.event'));
    render(new NewEventDestinationView(), newEventCreationFormHeaderView.getElement().querySelector('.event'));
    render(new NewEventPhotosContainerView(), newEventCreationFormHeaderView.getElement().querySelector('.event__section--destination'));

    // Какое-то любое сообщение
    render(new NewMessageView(), siteTripEventsList);
  }
}
