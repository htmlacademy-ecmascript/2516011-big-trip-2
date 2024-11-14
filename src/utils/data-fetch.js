import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

const getOffersByType = (type) => {
  const offers = mockOffers.find((offer) => offer.type === type);
  return offers ? offers.offers : [];
};

const getDestinationDetails = (destinationId) => mockDestinations.find((destination) => destination.id === destinationId) || null;

export {getOffersByType, getDestinationDetails};
