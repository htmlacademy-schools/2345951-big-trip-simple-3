
import Observable from '../framework/observable';
import {UPDATE_TYPE} from '../const';

export default class WaypointModel extends Observable {

  #waypoint = [];
  #waypointApiServer;

  constructor({tripEventApiService}) {
    super();
    this.#waypointApiServer = tripEventApiService;
  }

  get tripEvents() {
    return this.#waypoint;
  }

  init = async () => {
    try {
      const tripEvents = await this.#waypointApiServer.tripEvents;
      this.#waypoint = tripEvents.map(this.#adaptToClient);
    } catch (error) {
      this.#waypoint = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  };

  updateTripPoint = async (updateType, update) => {
    const index = this.#waypoint.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting tripPoint');
    }

    try {
      const response = await this.#waypointApiServer.updateTripEvent(update);
      const updatedTripEvents = this.#adaptToClient(response);
      this.#waypoint = [
        ...this.tripEvents.slice(0, index),
        updatedTripEvents,
        ...this.#waypoint.slice(index + 1),
      ];

      this._notify(updateType, updatedTripEvents);
    } catch (err) {
      throw new Error('Can\'t update tripPoint');
    }
  };

  addTripPoint = async (updateType, update) => {
    try {
      const response = await this.#waypointApiServer.addTripEvent(update);
      const newTripPoint = this.#adaptToClient(response);
      this.#waypoint = [newTripPoint, ...this.#waypoint];
      this._notify(updateType, newTripPoint);
    } catch (err) {
      throw new Error('Can\'t add tripPoint');
    }
  };

  deleteTripPoint = async (updateType, update) => {
    const index = this.#waypoint.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete not existing tripPoint');
    }

    try {
      await this.#waypointApiServer.deleteTripEvent(update);
      this.#waypoint = [
        ...this.tripEvents.slice(0, index),
        ...this.#waypoint.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete tripPoint');
    }
  };

  #adaptToClient = (tripPoint) => {
    const adaptedTripPoint = {
      ...tripPoint,
      dateFrom: tripPoint['date_from'],
      dateTo: tripPoint['date_to'],
      offersIDs: tripPoint['offers'],
      basePrice: tripPoint['base_price'],
    };

    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['offers'];

    return adaptedTripPoint;
  };
}
