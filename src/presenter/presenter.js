import SortView from '../view/sort-view';
import EventListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';

import {render, replace} from '../framework/render.js';
import NewItemFormView from '../View/create-form-view';
import NoPointsView from '../View/no-points-view';
import EditPointView from '../View/edit-point-view';

export default class Presenter {
  #container = null;
  #tripPointsModel = null;
  #tripListComponent = null;
  #sorters = null;

  constructor({container, tripPointsModel, sorters}) {
    this.#tripPointsModel = tripPointsModel;
    this.#container = container;
    this.#sorters = sorters;
  }

  init() {

    const tripPoints = [...this.#tripPointsModel.getTripPoints()];
    if (tripPoints.length === 0) {
      render(new NoPointsView(), this.#container);
    } else {
      this.#tripListComponent = new EventListView();
      render(new SortView(this.#sorters), this.#container);
      render(this.#tripListComponent, this.#container);
      render(new NewItemFormView(tripPoints[0]), this.#tripListComponent.element);
      for (let i = 1; i < tripPoints.length - 1; i++) {
        this.#renderTripPoint(tripPoints[i]);
      }
    }
  }

  #renderTripPoint = (tripPoint) => {
    const ecsKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    };

    const tripPointComponent = new EventItemView({
      tripPoint,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.body.addEventListener('keydown', ecsKeyDownHandler);
      }});

    const editFormComponent = new EditPointView({
      tripPoint,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editFormComponent, tripPointComponent);
    }

    function replaceFormToPoint() {
      replace(tripPointComponent, editFormComponent);
    }

    render(tripPointComponent, this.#tripListComponent.element);
  };
}
