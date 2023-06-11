import AbstractView from '../framework/view/abstract-view';

const createNoPointsMessageTemplate = (text) => `<p class="trip-events__msg">${text}</p>`;

export default class NoWaypointsView extends AbstractView {
  #text;

  constructor(text = 'Click New Event to create your first point') {
    super();
    this.#text = text;
  }

  get template() {
    return createNoPointsMessageTemplate(this.#text);
  }
}
