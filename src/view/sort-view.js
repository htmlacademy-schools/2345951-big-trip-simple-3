import AbstractView from '../framework/view/abstract-view';
import {convertToUpperCase} from '../utils/util';

const createSortItemTemplate = (sortType) =>
  `
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}">
    <label class="trip-sort__btn" for="sort-${sortType}">${convertToUpperCase(sortType)}</label>
  </div>
  `;

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

  get template() {
    return createSortTemplate(this.#sorts);
  }
}
