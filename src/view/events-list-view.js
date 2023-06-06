import {createElement, render} from '../render.js';
import AbstractView from '../framework/view/abstract-view';

const createEventListTemplate = () =>
  '<ul class="trip-events__list"></ul>';

const createElementWrapperTemplate = () => `
  <li class="trip-events__item"></li>
`;

export default class EventListView extends AbstractView {

  get template() {
    return createEventListTemplate();
  }

  addComponent(component) {
    const listElement = createElement(createElementWrapperTemplate());
    render(component, listElement);
    this.element.append(listElement);
  }
}
