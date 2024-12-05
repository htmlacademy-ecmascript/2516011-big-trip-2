import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';

document.addEventListener('DOMContentLoaded', () => {
  const siteTripEventsElement = document.querySelector('.trip-events');
  const pointsModel = new PointsModel();
  pointsModel.init();
  const boardPresenter = new BoardPresenter({container: siteTripEventsElement, pointsModel: pointsModel});
  boardPresenter.init();
});
