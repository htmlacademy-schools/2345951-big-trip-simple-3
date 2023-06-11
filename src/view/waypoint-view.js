import {convertToDateTime, convertToEventDate, convertToEventDateTime, convertToTime} from '../utils/utils';
import AbstractView from '../framework/view/abstract-view';


const createOffersTemplate = (offers) => offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

const createTripEventTemplate = (waypoint, destinations, offers) => {

  const destination = destinations.find((d) => d.id === waypoint.destination);

  const offersObj = offers.find((e) => e.type === waypoint.type) || {offers: []};

  return `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime="${convertToEventDateTime(waypoint.dateFrom)}">${convertToEventDate(waypoint.dateFrom)}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${waypoint.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${destination.name}</h3>
        <div class="event__schedule">
            <p class="event__time">
                <time class="event__start-time" datetime="${convertToDateTime(waypoint.dateFrom)}">${convertToTime(waypoint.dateFrom)}</time>
                    &mdash;
                <time class="event__end-time" datetime="${convertToDateTime(waypoint.dateTo)}">${convertToTime(waypoint.dateTo)}</time>
            </p>
        </div>
        <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${waypoint.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${createOffersTemplate(offersObj.offers.filter((e) => waypoint.offersIDs.includes(e.id)))}
        </ul>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    </div>
  </li>`;
};


export default class WaypointView extends AbstractView {
  #waypoint;
  #destinations;
  #offers;

  constructor({tripPoint, onRollupClick, destinations, offers}) {
    super();
    this.#waypoint = tripPoint;
    this.#offers = offers;
    this.#destinations = destinations;
    this._callback.onRollupClick = onRollupClick;

    this.element.querySelector('.event__rollup-btn',).addEventListener('click', this.#rollupHandler);
  }

  get template() {
    return createTripEventTemplate(this.#waypoint, this.#destinations, this.#offers);
  }

  #rollupHandler = (evt) => {
    evt.preventDefault();
    this._callback.onRollupClick();
  };
}
