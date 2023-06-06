import {DESCRIPTIONS, generatePicture, getRandomInt} from '../utils/util';

export const names = ['Chamonix', 'Berlin', 'Moscow', 'LA', 'Geneva'];

export const generateDestination = (id) => ({
  id,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  name: names[getRandomInt(0, names.length - 1)],
  pictures:
    Array.from({length: getRandomInt(2, 10)}, generatePicture)
});

export const randomDestinations = () => {
  const destinations = [];

  for (let i = 0; i <= 10; i++) {
    destinations.push(generateDestination(i));
  }

  return {
    getDestination: (id) => destinations[id],
    getAllDestinations: () => destinations,
  };
};
