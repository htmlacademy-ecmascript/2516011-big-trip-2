import NewTripInfoView from './view/trip-info-view.js';
import NewTripFilterView from './view/trip-filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './render.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

render(new NewTripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new NewTripFilterView(), siteFilterElement);

const boardPresenter = new BoardPresenter({container: siteTripEventsElement});
boardPresenter.init();
