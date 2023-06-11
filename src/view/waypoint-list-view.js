import AbstractView from '../framework/view/abstract-view';

const createEventListTemplate = () => `
  <ul class="trip-events__list"></ul>
`;

export default class WaypointListView extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
