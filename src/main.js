import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';
import PointsApiService from './points-api-service.js';
const AUTHORIZATION = 'Basic hS2sfS48wcl1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

document.addEventListener('DOMContentLoaded', async () => {
  const siteTripEventsElement = document.querySelector('.trip-events');
  const pointsModel = new PointsModel({
    pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
  });
  const boardPresenter = new BoardPresenter({container: siteTripEventsElement, pointsModel: pointsModel});
  boardPresenter.init();
});
