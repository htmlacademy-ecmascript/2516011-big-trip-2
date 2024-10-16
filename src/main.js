import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';

const siteTripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({container: siteTripEventsElement, pointsModel: pointsModel});
boardPresenter.init();
