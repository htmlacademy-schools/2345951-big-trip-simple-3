import SortView from '../view/sort-view';
import EventListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';
import EditPointView from '../View/edit-point-view';
import NewItemFormView from '../view/create-form-view';
import { render } from '../render';

export default class Presenter {
  tripListComponent = new EventListView();

  constructor(tripPointsModel) {
    this.tripPointsModel = tripPointsModel;
  }

  init(container) {
    this.tripPoints = [...this.tripPointsModel.getTripPoints()];
    this.container = container;

    render(new SortView(), this.container);
    render(this.tripListComponent, this.container);
    render(new NewItemFormView({tripPoint: this.tripPoints[0]}), this.tripListComponent.getElement());
    render(new EditPointView(), this.tripListComponent.getElement());
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new EventItemView({tripPoint: this.tripPoints[i]}), this.tripListComponent.getElement());
    }
  }
}
