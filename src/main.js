import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';
import FilterModel from './model/filter-model.js';

document.addEventListener('DOMContentLoaded', () => {
  const siteTripEventsElement = document.querySelector('.trip-events');
  const pointsModel = new PointsModel();
  const filterModel = new FilterModel();
  pointsModel.init();
  const boardPresenter = new BoardPresenter({container: siteTripEventsElement, pointsModel: pointsModel});

  boardPresenter.init();
});
