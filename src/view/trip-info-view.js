import AbstractView from '../framework/view/abstract-view';

function createTripInfoTemplate(total) {
  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
            </p>
          </section>`);
}

export default class TripInfoView extends AbstractView{
  #points = null;

  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#calculateTotal());
  }

  #calculateTotal() {
    return this.#points.reduce((total, point) => {
      let pointTotal = point.basePrice;

      point.offers.forEach((offer) => {
        if (offer && offer.price) {
          pointTotal += offer.price;
        }
      });

      return total + pointTotal;
    }, 0);
  }
}
