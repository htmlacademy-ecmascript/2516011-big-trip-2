import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

const getOffersByType = (type) => {
  const offers = mockOffers.find((offer) => offer.type === type);
  return offers ? offers.offers : [];
};

const getOfferById = (id) => {
  for (const category of mockOffers) {
    const offer = category.offers.find((item) => item.id === id);
    if (offer) {
      return offer;
    }
  }
  return null;
};

const getDestinationDetails = (destinationName) => {
  const destinations = mockDestinations.find((destination) => destination.name === destinationName);
  return destinations || null;
};

const getDestinationNames = () => mockDestinations.map((destination) => destination.name);

export {getOffersByType, getOfferById, getDestinationDetails, getDestinationNames};
