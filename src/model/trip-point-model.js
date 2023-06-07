export default class TripPointModel {
  #tripPoints = null;
  #destinations = null;
  #offers = null;

  constructor (tripPoints, destinations, offers) {
    this.#tripPoints = tripPoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
