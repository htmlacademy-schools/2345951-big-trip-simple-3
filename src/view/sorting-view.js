import AbstractView from '../framework/view/abstract-view';
import {convertToLowerCase} from '../utils/utils';

const createSortItemTemplate = (sortType, current) => (
  `
    <div class="trip-sort__item  trip-sort__item--${convertToLowerCase(sortType)}">
      <input
        id="sort-${convertToLowerCase(sortType)}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${convertToLowerCase(sortType)}"
        ${(['event', 'offers' ].includes(sortType) ? 'disabled' : '')}
        ${sortType !== 'event' && sortType !== 'offers' && sortType === current ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${convertToLowerCase(sortType)}" data-sort-type="${sortType}">${sortType}</label>
    </div>`
);


const createSortTemplate = (sorts, current) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.keys(sorts).map((sort) => createSortItemTemplate(sort, current)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #sorts = [];
  #current;

  constructor({sorts, current}) {
    super();
    this.#sorts = sorts;
    this.#current = current;
  }

  get template() {
    return createSortTemplate(this.#sorts, this.#current);
  }

  changeCurrentType = (type) => {
    this.#current = type;
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL' || ['event', 'offers' ].includes(evt.target.dataset.sortType)) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
