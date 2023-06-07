import { generateDestinations } from './destination';
import { generateTripPoints } from './point';

const mockInit = (numberOfTripPoints, numberOfDestinations) => {
  const destinations = generateDestinations(numberOfDestinations);
  const tripPoints = generateTripPoints(numberOfTripPoints);
  return [tripPoints, destinations];
};

export { mockInit };
