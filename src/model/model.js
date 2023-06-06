import {generateTripPoint} from '../mock/point';

const POINT_COUNT = 3;

export default class TripPointModel {
  tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

  getTripPoints() {
    return this.tripPoints;
  }
}
