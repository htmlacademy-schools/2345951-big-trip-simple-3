import {getRandomDate, getRandomInt} from '../utils/util';


const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const getRandomType = () => TRIP_TYPES[getRandomInt(0, TRIP_TYPES.length - 1)];

export const generateTripPoint = () => ({
  'base_price': getRandomInt(500, 2000),
  'date_from': getRandomDate(),
  'date_to': getRandomDate(),
  'destination': getRandomInt(0, 9),
  'id': getRandomInt(0, 3),
  'offers': [1, 3, 5],
  'type': getRandomType()
});
