import SortView from '../view/sort-view';
import {render} from '../framework/render.js';
import NoPointsView from '../View/no-points-view';
import PointPresenter from './point-presenter';
import {generateSort} from '../mock/sort';

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

  init() {
    this.#renderSortingView();
    this.#renderEventsList();

    if (this.#tripPoints.length === 0) {
      render(new NoPointsView(), this.#container);
    }
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
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
    render(new SortView({sorts: this.#sorters}), this.#container);
  };

  #renderEventsList = () => {
    render(this.#tripListComponent, this.#container);
  };
}
