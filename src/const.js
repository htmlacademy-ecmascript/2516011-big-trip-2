const AUTHORIZATION = 'Basic hS2sfS6948l1sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const DATE_FORMAT = 'DD/MM/YY HH:mm';
const FLATPICKR_DATE_FORMAT = 'd/m/y H:i';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const ESC_KEYS = ['Escape', 'Esc'];

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const EditMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const EmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  LOADING: 'Loading...',
  FAILURE: 'Failed to load latest route information',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  FAILURE: 'FAILURE',
};

export { AUTHORIZATION, END_POINT, DATE_FORMAT, FLATPICKR_DATE_FORMAT, POINT_TYPES, ESC_KEYS, Method, EditMode, FilterType, TimeLimit, EmptyMessage, SortType, UserAction, UpdateType };
