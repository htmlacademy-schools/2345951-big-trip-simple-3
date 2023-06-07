import { getRandomSliceFromItems } from './utils';
import { offersByType } from '../mock/const';

const getOffersByType = (type) => offersByType.find((offers) => offers.type === type).offers;

const getRandomOffersIdsByType = (type) => {
  const currentTypeRandomOffers = getRandomSliceFromItems(getOffersByType(type));
  return currentTypeRandomOffers.map((offer) => offer.id);
};

export {getRandomOffersIdsByType, getOffersByType };
