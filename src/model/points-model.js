import { mockDestinations} from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { mockPoints } from '../mock/points.js';

// const POINTS_COUNT = 5;

export default class PointsModel {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#destinations = mockDestinations;
    this.#offers = mockOffers;
    this.#points = mockPoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  get pointsWithDetails() {
    return this.#points.map((point) => {
      const destination = this.#destinations.find((dest) => dest.id === point.destination);
      const offersForType = this.#offers.find((offer) => offer.type === point.type)?.offers || [];
      const pointOffers = offersForType.filter((offer) => point.offers.includes(offer.id));

      return {
        ...point,
        destination: destination || null,
        typeOffers: offersForType,
        offers: pointOffers,
      };
    });
  }
}
