import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const.js';

function createTripSortTemplate(currentSortType) {
  const sortOptions = [
    { type: SortType.DAY, isEnabled: true, isChecked: currentSortType === SortType.DAY },
    { type: SortType.EVENT, isEnabled: false, isChecked: false },
    { type: SortType.TIME, isEnabled: true, isChecked: currentSortType === SortType.TIME },
    { type: SortType.PRICE, isEnabled: true, isChecked: currentSortType === SortType.PRICE },
    { type: SortType.OFFER, isEnabled: false, isChecked: false },
  ];

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortOptions.map(({ type, isEnabled, isChecked }) => `
          <div class="trip-sort__item  trip-sort__item--${type}">
            <input
              id="sort-${type}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="${type}"
              data-sort-type="${type}"
              ${isChecked ? 'checked' : ''}
              ${isEnabled ? '' : 'disabled'}>
            <label class="trip-sort__btn" for="sort-${type}">${type}</label>
          </div>
        `).join('')}
    </form>
  `;
}

export default class TripSortView extends AbstractView{
  #currentSortType = null;
  #handleSortTypeChange = null;

  /**
   * Конструктор компонента сортировки.
   * @param {Object} params - Параметры компонента.
   * @param {string} params.currentSortType - Текущий активный тип сортировки.
   * @param {function} params.onSortTypeChange - Обработчик изменения типа сортировки.
   */
  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  /**
   * Обработчик события изменения типа сортировки.
   * @param {Event} evt - Событие изменения.
   */
  #sortTypeChangeHandler = (evt) => {
    const sortType = evt.target.dataset.sortType;
    if (!sortType || this.#currentSortType === sortType) {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(sortType);
  };
}
