import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';

const siteTripEventsElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: siteTripEventsElement, PointsModel});
boardPresenter.init();
