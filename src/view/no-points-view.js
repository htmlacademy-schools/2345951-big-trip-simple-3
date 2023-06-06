import {createElement} from '../render.js';

const createNoPointsTemplate = () => ({
  Everything: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  Past: '<p class="trip-events__msg">There are no past events now</p>',
  Future: '<p class="trip-events__msg">There are no future events now</p>'
});

export default class NoPointsView {

  #element = null;

  get template() {
    return createNoPointsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
