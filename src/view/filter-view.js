import AbstractView from '../framework/view/abstract-view';
import {convertToLowerCase} from '../utils/utils';

const createFilterItemTemplate = (filter, currentFilter) => `
    <div class="trip-filters__filter">
        <input
            id="filter-${convertToLowerCase(filter.type)}"
            class="trip-filters__filter-input visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter.type}"
            ${filter.type === currentFilter ? 'checked' : ''}
            ${(filter.count === 0) ? 'disabled="true"' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${convertToLowerCase(filter.type)}">${filter.type}</label>
    </div>
`;


const createFilterTemplate = (filters, currentFilter) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


export default class FilterView extends AbstractView {
  #filters;
  #currentFilter;

  constructor({filters, currentFilter, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this._callback.onFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.onFilterChange(evt.target.value);
  };
}
