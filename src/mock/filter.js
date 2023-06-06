import {isTripDateBeforeToday} from '../utils/util';

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const filter = {
  [FILTER_TYPE.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => !isTripDateBeforeToday(tripPoint.date_from)),
  [FILTER_TYPE.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isTripDateBeforeToday(tripPoint.date_from)),
  [FILTER_TYPE.EVERYTHING]: (tripPoints) => tripPoints
};


export const generateFilter = () => Object.keys(filter).map((filterName) => filterName );
