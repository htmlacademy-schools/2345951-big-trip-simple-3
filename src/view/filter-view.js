import AbstractView from '../framework/view/abstract-view';

const createFiltersTemplate = () =>
  `<form className="trip-filters" action="#" method="get">
    <div className="trip-filters__filter">
      <input id="filter-everything" className="trip-filters__filter-input  visually-hidden" type="radio"
             name="trip-filter" value="everything">
        <label className="trip-filters__filter-label" htmlFor="filter-everything">Everything</label>
    </div>

    <div className="trip-filters__filter">
      <input id="filter-future" className="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
             value="future">
        <label className="trip-filters__filter-label" htmlFor="filter-future">Future</label>
    </div>

    <button className="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {

  get template() {
    return createFiltersTemplate();
  }
}
