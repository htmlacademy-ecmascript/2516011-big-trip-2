import BoardPresenter from './presenter/board-presenter.js';

const siteTripEventsElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: siteTripEventsElement});
boardPresenter.init();
