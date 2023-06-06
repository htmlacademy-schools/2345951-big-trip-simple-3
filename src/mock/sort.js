const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const sorts = {
  [SORT_TYPE.DAY]: () => (0),
  [SORT_TYPE.EVENT]: () => (0),
  [SORT_TYPE.OFFERS]: () => (0),
  [SORT_TYPE.PRICE]: () => (0),
  [SORT_TYPE.TIME]: () => (0),
};

export const generateSort = () => Object.keys(sorts).map((sortName) => sortName);
