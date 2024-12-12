import {render, RenderPosition} from './framework/render.js';

import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';
import PointsWithDetailsApiService from './points-with-details-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';

const AUTHORIZATION = 'Basic hS2sfS6948l1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  PointsWithDetailsApiService: new PointsWithDetailsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter({
  container: siteTripEventsElement,
  headerContainer: siteHeaderElement,
  pointsModel: pointsModel,
  onNewPointFormClose: handleNewPointFormClose,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick () {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteHeaderElement);

pointsModel.init()
  .finally(() => {
    newPointButtonComponent.element.disabled = false;
    render(new TripInfoView({points: pointsModel.pointsWithDetails}), siteHeaderElement, RenderPosition.AFTERBEGIN);
  });
boardPresenter.init();
