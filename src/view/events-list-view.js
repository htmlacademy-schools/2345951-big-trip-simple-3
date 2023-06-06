import {createElement, render} from '../render.js';

const createEventListTemplate = () =>
  '<ul class="trip-events__list"></ul>';

const createElementWrapperTemplate = () => `
  <li class="trip-events__item"></li>
`;

export default class EventListView {

  #element = null;

  get template() {
    return createEventListTemplate();
  }

  addComponent(component) {
    const listElement = createElement(createElementWrapperTemplate());
    render(component, listElement);
    this.element.append(listElement);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
