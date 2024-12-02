import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { mockPoints } from '../mock/points.js';

export default class PointsModel extends Observable {
  #points = null;
  #pointsWithDetails = null;
  #destinations = null;
  #offers = null;

  constructor() {
    super();
    this.#points = [];
    this.#pointsWithDetails = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#destinations = mockDestinations;
    this.#offers = mockOffers;
    this.#points = mockPoints;
    this.#pointsWithDetails = this.pointsWithDetails;
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

  /**
   * Обновляет существующую точку маршрута.
   * @param {string} updateType - Тип обновления.
   * @param {object} update - Обновляемая точка маршрута.
   */
  updatePoint(updateType, update) {
    const index = this.#pointsWithDetails.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update non-existing point');
    }
    this.#pointsWithDetails = [
      ...this.#pointsWithDetails.slice(0, index),
      update,
      ...this.#pointsWithDetails.slice(index + 1),
    ];
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
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
    this.#points = [
      update,
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
}
