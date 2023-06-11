import {filters, UPDATE_TYPE} from '../const';
import FilterView from '../view/filter-view';
import {remove, render, replace} from '../framework/render';
import {FILTER_TYPE} from '../const';


export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #waypointEventsModel;
  #filterComponent;

  constructor({filterContainer, filterModel, tripEventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#waypointEventsModel = tripEventModel;

    this.#waypointEventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [FILTER_TYPE.EVERYTHING, FILTER_TYPE.FUTURE, FILTER_TYPE.PAST].map((type) => ({
      type,
      count: filters[type](this.#waypointEventsModel.tripEvents).length
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterTypeChange
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };
}
