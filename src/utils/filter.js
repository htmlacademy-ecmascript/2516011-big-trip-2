import {FilterType} from '../const';
import {isEventFuture, isEventPresent, isEventPast } from './task';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.startDate)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.startDate, event.endDate)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.endDate)),
};

export {filter};
