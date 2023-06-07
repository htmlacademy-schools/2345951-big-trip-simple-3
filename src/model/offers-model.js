import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #tripPointApiService = null;
  #offers = [];

  constructor ({tripPointApiService}) {
    super();
    this.#tripPointApiService = tripPointApiService;
    this.init();
  }

  async init() {
    try {
      this.#offers = await this.#tripPointApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

}
