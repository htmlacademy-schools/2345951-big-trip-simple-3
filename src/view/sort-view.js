import AbstractView from '../framework/view/abstract-view';
import {convertToUpperCase, makeLowercased} from '../utils/util';
import {SORT_TYPE} from '../mock/sort';

const createSortItemTemplate = (sortType) =>
  `
    <div class="trip-sort__item  trip-sort__item--${makeLowercased(sortType)}">
      <input
        id="sort-${makeLowercased(sortType)}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${makeLowercased(sortType)}"
        ${sortType === SORT_TYPE.DAY ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${makeLowercased(sortType)}" data-sort-type="${sortType}">${convertToUpperCase(sortType)}</label>
    </div>`;

const createSortTemplate = (sorts) => {
  const sortItemsTemplate = sorts.map((sortType) => createSortItemTemplate(sortType)).join('');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>
  `;
};

export default class SortView extends AbstractView {

  #sorts = null;

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
