import SortView from '../view/sort-view';
import {render} from '../framework/render.js';
import NoPointsView from '../View/no-points-view';
import PointPresenter from './point-presenter';
import {generateSort, SORT_TYPE} from '../mock/sort';
import {sortByDay, sortByPrice, sortByTime} from '../utils/util';

export default class Presenter {
  #container = null;
  #tripPointsModel = null;
  #tripListComponent = null;
  #tripPointPresenter = null;
  #tripPoints = null;

  constructor({container, tripPointsModel}) {
    this.#tripPointsModel = tripPointsModel;
    this.#container = container;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  #sorters = generateSort();
  #sortComponent = new SortView({sorts: this.#sorters});
  #currentSortType = SORT_TYPE.DAY;

  init() {
    this.#renderSortingView();

    if (this.#tripPoints.length === 0) {
      render(new NoPointsView(), this.#container);
      return;
    }
    this.#renderEventsList();
  }

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new PointPresenter(this.#tripListComponent.element,
      tripPoint, {handleModeChange: this.#handleModeChange});
    tripPointPresenter.init();
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #renderSortingView = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTrips(sortType);
    this.#renderSortingView();
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderEventsList = () => {
    render(this.#tripListComponent, this.#container);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  };

  #clearEventsList = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  };

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      case SORT_TYPE.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SORT_TYPE.DAY:
        this.#tripPoints.sort(sortByDay);
    }
    this.#currentSortType = sortType;
  };
}
