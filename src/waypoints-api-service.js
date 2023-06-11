import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export class WaypointsApiService extends ApiService {
  get tripEvents() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateTripEvent = async (tripPoint) => await ApiService.parseResponse(await this._load({
    url: `points/${tripPoint.id}`,
    method: Method.PUT,
    body: JSON.stringify(this.#adaptToServer(tripPoint)),
    headers: new Headers({'Content-Type': 'application/json'}),
  }));

  addTripEvent = async (tripPoint) => await ApiService.parseResponse(await this._load({
    url: 'points',
    method: Method.POST,
    body: JSON.stringify(this.#adaptToServer(tripPoint)),
    headers: new Headers({'Content-Type': 'application/json'}),
  }));

  deleteTripEvent = async (tripPoint) => await this._load({
    url: `points/${tripPoint.id}`,
    method: Method.DELETE,
  });

  #adaptToServer = (tripPoint) => {
    const adaptedTripEvent = {
      ...tripPoint,
      'date_from': (tripPoint.dateFrom) ? new Date(tripPoint.dateFrom).toISOString() : new Date().toISOString,
      'date_to': (tripPoint.dateTo) ? new Date(tripPoint.dateTo).toISOString() : new Date().toISOString,
      'base_price': Number(tripPoint.basePrice),
      'offers': tripPoint.offersIDs
    };

    delete adaptedTripEvent.dateFrom;
    delete adaptedTripEvent.dateTo;
    delete adaptedTripEvent.basePrice;
    delete adaptedTripEvent.offersIDs;
    return adaptedTripEvent;
  };
}
