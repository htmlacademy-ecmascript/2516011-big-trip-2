import dayjs from 'dayjs';
const DATE_FORMAT = 'D MMMM';

const humanizeTaskDueDate = (dueDate) => dueDate ?
  dayjs(dueDate).format(DATE_FORMAT) : '';

const getFormattedDuration = (dateFrom, dateTo) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const differenceMinutes = endDate.diff(startDate, 'minute');

  const hours = Math.floor(differenceMinutes / 60);
  const minutes = differenceMinutes % 60;

  return `${hours}H ${minutes}M`;
};

const isEventFuture = (startDate) => dayjs(startDate).isAfter(dayjs(), 'D');
const isEventPresent = (startDate, endDate) =>
  dayjs(startDate).isSameOrBefore(dayjs(), 'D') && dayjs(endDate).isSameOrAfter(dayjs(), 'D');
const isEventPast = (endDate) => dayjs(endDate).isBefore(dayjs(), 'D');

export { humanizeTaskDueDate, getFormattedDuration, isEventFuture, isEventPresent, isEventPast };
