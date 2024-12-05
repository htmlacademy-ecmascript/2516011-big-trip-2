import {FilterType} from '../const';
import {isPointInFuture, isPointInPresent, isPointInPast } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointInFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointInPresent),
  [FilterType.PAST]: (points) => points.filter(isPointInPast),
};

export {filter};
