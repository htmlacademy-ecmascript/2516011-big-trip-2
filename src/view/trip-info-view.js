import AbstractView from '../framework/view/abstract-view.js';
import { sortPointByDay } from '../utils/point.js';

function createTripInfoTemplate(points) {
  if (!points || points.length === 0) {
    return '<section class="trip-main__trip-info  trip-info"></section>';
  }

  const routeName = generateRouteName(points);
  const dates = formatTripDates(points);
  const total = calculateTotal(points);

  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${routeName}</h1>
              <p class="trip-info__dates">${dates}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
            </p>
          </section>`);
}

function calculateTotal(points) {
  return points.reduce((total, point) => {
    let pointTotal = point.basePrice;

    point.offers.forEach((offer) => {
      if (offer && offer.price) {
        pointTotal += offer.price;
      }
    });

    return total + pointTotal;
  }, 0);
}

function generateRouteName(points) {
  if (points.length === 0) {
    return '';
  }

  const destinations = points.map((point) => point.destination.name);

  if (destinations.length <= 3) {
    return destinations.join(' &mdash; ');
  }

  const firstCity = destinations[0];
  const lastCity = destinations[destinations.length - 1];

  return `${firstCity} &mdash; ... &mdash; ${lastCity}`;
}

function formatTripDates(points) {
  if (points.length === 0) {
    return '';
  }

  const startDate = new Date(points[0].dateFrom);
  const endDate = new Date(points[points.length - 1].dateTo);

  const formatOptions = { day: 'numeric', month: 'short' };

  const startFormatted = startDate.toLocaleDateString('en-GB', formatOptions);
  const endFormatted = endDate.toLocaleDateString('en-GB', formatOptions);

  return `${startFormatted}&nbsp;&mdash;&nbsp;${endFormatted}`;
}

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor({ points }) {
    super();
    this.#points = points ? [...points].sort(sortPointByDay) : [];
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
