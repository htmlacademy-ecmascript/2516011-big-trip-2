import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #PointsWithDetailsApiService = null;
  #points = [];
  #pointsWithDetails = [];
  #destinations = [];
  #offers = [];

  constructor({PointsWithDetailsApiService}) {
    super();
    this.#PointsWithDetailsApiService = PointsWithDetailsApiService;
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
      const pointOffers = Array.isArray(point.offers) ? offersForType.filter((offer) => point.offers.includes(offer.id)) : [];

      return {
        ...point,
        destination: destination || null,
        typeOffers: offersForType,
        offers: pointOffers,
      };
    });
  }

  async init() {
    try {
      const points = await this.#PointsWithDetailsApiService.points;
      this.#points = points.map(this.#adaptToClient);

      const destinations = await this.#PointsWithDetailsApiService.destinations;
      this.#destinations = destinations;

      const offers = await this.#PointsWithDetailsApiService.offers;
      this.#offers = offers;

      this.#pointsWithDetails = this.pointsWithDetails;
    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  _extractBasePointData(point) {
    return {
      ...point,
      destination: point.destination?.id || null,
      offers: point.offers?.map((offer) => offer.id) || null,
    };
  }

  /**
   * Обновляет существующую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Обновляемая точка маршрута.
   */
  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    try {
      const preparedUpdate = {
        ...update,
        destination: update.destination.id,
        offers: update.offers.map((offer) => offer.id),
      };

      const response = await this.#PointsWithDetailsApiService.updatePoint(preparedUpdate);

      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  }

  /**
   * Добавляет новую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Новая точка маршрута.
   */
  addPoint(updateType, update) {
    this.#pointsWithDetails = [
      update,
      ...this.#pointsWithDetails,
    ];
    const baseUpdate = this._extractBasePointData(update);
    this.#points = [
      baseUpdate,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  /**
   * Удаляет существующую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Удаляемая точка маршрута.
   */
  deletePoint(updateType, update) {
    const index = this.#pointsWithDetails.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete non-existing point');
    }
    this.#pointsWithDetails = [
      ...this.#pointsWithDetails.slice(0, index),
      ...this.#pointsWithDetails.slice(index + 1),
    ];
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    return adaptedPoint;
  }

  getOffersByType = (type) => {
    const offers = this.#offers.find((offer) => offer.type === type);
    return offers ? offers.offers : [];
  };

  getOfferById = (id) => {
    for (const category of this.#offers) {
      const offer = category.offers.find((item) => item.id === id);
      if (offer) {
        return offer;
      }
    }
    return null;
  };

  getDestinationsDetails = (destinationName) => {
    const destinations = this.#destinations.find((destination) => destination.name === destinationName);
    return destinations || null;
  };

  getDestinationsNames = () => this.#destinations.map((destination) => destination.name);
}
