import {render} from './framework/render.js';
import { AUTHORIZATION, END_POINT, FilterType } from './const.js';

import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../src/model/points-model.js';
import PointsWithDetailsApiService from './points-with-details-api-service.js';
import NewPointButtonView from './view/new-point-button-view.js';
import MessageView from './view/message-view';

const siteMainElement = document.querySelector('.page-header');
const siteHeaderElement = siteMainElement.querySelector('.trip-main');
const siteTripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  PointsWithDetailsApiService: new PointsWithDetailsApiService(END_POINT, AUTHORIZATION)
});

const noPointsComponent = new MessageView({
  messageText: FilterType.EVERYTHING
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const boardPresenter = new BoardPresenter({
  container: siteTripEventsElement,
  headerContainer: siteHeaderElement,
  pointsModel: pointsModel,
  newPointButtonComponent: newPointButtonComponent,
  noPointsComponent: noPointsComponent,
  onNewPointFormClose: handleNewPointFormClose,
});


function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;

  if (!pointsModel.pointsWithDetails || pointsModel.pointsWithDetails.length === 0) {
    render(noPointsComponent, siteTripEventsElement);
  }
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
