import { mockDestinations} from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getRandomPoints } from '../mock/points.js';

export default class PointsModel {
  constructor() {
    this.points = [];
    this.destinations = [];
    this.offers = [];
  }

  init() {
    this.destinations = mockDestinations;
    this.offers = mockOffers;
    this.points = Array.from({length: 5}, getRandomPoints);
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  getPointsWithDetails() {
    return this.points.map((point) => {
      const destination = this.destinations.find((dest) => dest.id === point.destination);
      const offersForType = this.offers.find((offer) => offer.type === point.type)?.offers || [];
      const pointOffers = offersForType.filter((offer) => point.offerIds.includes(offer.id));

      return {
        ...point,
        destination: destination || null,
        typeOffers: offersForType,
        offers: pointOffers,
      };
    });
  }
}
