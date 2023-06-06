import AbstractView from '../framework/view/abstract-view';
import {convertToUpperCase} from '../utils/util';

const createFilterItemTemplate = (filterType) =>
  `
  <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${convertToUpperCase(filterType)}</label>
  </div>
  `;

const createFiltersTemplate = (filters) => {
  const filterItems = filters.map((filter) => createFilterItemTemplate(filter)).join('');
  return `
  <form className="trip-filters" action="#" method="get">
    ${filterItems}
    <button className="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
};

export default class FiltersView extends AbstractView {

  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
