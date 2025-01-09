import dayjs from 'dayjs';

const getFormattedDuration = (dateFrom, dateTo) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);

  const differenceMinutes = endDate.diff(startDate, 'minute');
  const days = Math.floor(differenceMinutes / 1440);
  const hours = Math.floor((differenceMinutes % 1440) / 60);
  const minutes = differenceMinutes % 60;

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  return `${minutes.toString().padStart(2, '0')}M`;
};


const isPointInFuture = (point) => dayjs(point.dateFrom).isAfter(dayjs());
const isPointInPresent = (point) => dayjs(point.dateFrom).isBefore(dayjs()) && dayjs(point.dateTo).isAfter(dayjs());
const isPointInPast = (point) => dayjs(point.dateTo).isBefore(dayjs());

const sortPointByDay = (firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom);
const sortPointByTime = (firstPoint, secondPoint) => (new Date(secondPoint.dateTo) - new Date(secondPoint.dateFrom)) - (new Date(firstPoint.dateTo) - new Date(firstPoint.dateFrom));
const sortPointByPrice = (firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice;

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export { getFormattedDuration, isPointInFuture, isPointInPresent, isPointInPast, sortPointByDay, sortPointByTime, sortPointByPrice, isDatesEqual };
