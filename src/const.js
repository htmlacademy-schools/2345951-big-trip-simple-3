import {isTripDateBeforeToday, sortByDay, sortByPrice, sortByTime} from './utils/utils';

export const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const SORTS = {
  [SORT_TYPE.DAY]: sortByDay,
  [SORT_TYPE.EVENT]: undefined,
  [SORT_TYPE.TIME]: sortByTime,
  [SORT_TYPE.PRICE]: sortByPrice,
  [SORT_TYPE.OFFERS]: undefined,
};

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const TRIP_TYPES = {
  TAXI: 'taxi',
  BUS: 'bus',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

export const USER_ACTION = {
  UPDATE_TRIPPOINT: 'UPDATE_TRIPPOINT',
  ADD_TRIPPOINT: 'ADD_TRIPPOINT',
  DELETE_TRIPPOINT: 'DELETE_EVENT',
};

export const UPDATE_TYPE = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const filters = {
  [FILTER_TYPE.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => !isTripDateBeforeToday(tripPoint.dateFrom)),
  [FILTER_TYPE.EVERYTHING]: (tripPoints) => tripPoints,
  [FILTER_TYPE.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isTripDateBeforeToday(tripPoint.dateTo)),
};
