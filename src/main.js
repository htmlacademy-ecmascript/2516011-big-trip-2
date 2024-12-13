import {render} from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';

import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';
import PointsWithDetailsApiService from './points-with-details-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  PointsWithDetailsApiService: new PointsWithDetailsApiService(END_POINT, AUTHORIZATION)
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const boardPresenter = new BoardPresenter({
  container: siteTripEventsElement,
  headerContainer: siteHeaderElement,
  pointsModel: pointsModel,
  newPointButtonComponent: newPointButtonComponent,
  onNewPointFormClose: handleNewPointFormClose,
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
  });
boardPresenter.init();
