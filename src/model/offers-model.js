import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #tripEventApiService;
  #offers = [];

  constructor({tripEventApiService}) {
    super();
    this.#tripEventApiService = tripEventApiService;
    this.init();
  }

  init = async () => {
    try {
      this.#offers = await this.#tripEventApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  };

  get offers() {
    return this.#offers;
  }
}
