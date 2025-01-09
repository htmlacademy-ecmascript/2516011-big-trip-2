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

      this.#destinations = await this.#PointsWithDetailsApiService.destinations;

      this.#offers = await this.#PointsWithDetailsApiService.offers;

      this.#pointsWithDetails = this.pointsWithDetails;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this._notify(UpdateType.FAILURE);
    }
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
      const baseUpdate = this._extractBasePointData(update);
      const response = await this.#PointsWithDetailsApiService.updatePoint(baseUpdate);

      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  /**
   * Добавляет новую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Новая точка маршрута.
   */
  async addPoint(updateType, update) {
    try {
      const baseUpdate = this._extractBasePointData(update);
      const response = await this.#PointsWithDetailsApiService.addPoint(baseUpdate);
      const newPoint = this.#adaptToClient(response);
      const detailedPoint = { ...update, id: newPoint.id };
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this.#pointsWithDetails = [
        detailedPoint,
        ...this.#pointsWithDetails,
      ];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  /**
   * Удаляет существующую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Удаляемая точка маршрута.
   */
  async deletePoint(updateType, update) {
    const index = this.#pointsWithDetails.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete non-existing point');
    }

    try {
      const baseUpdate = this._extractBasePointData(update);
      await this.#PointsWithDetailsApiService.deletePoint(baseUpdate);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this.#pointsWithDetails = [
        ...this.#pointsWithDetails.slice(0, index),
        ...this.#pointsWithDetails.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
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
