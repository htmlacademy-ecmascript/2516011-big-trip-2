import dayjs from 'dayjs';
const DATE_FORMAT = 'D MMMM';

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

const getFormattedDuration = (dateFrom, dateTo) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  const differenceMinutes = endDate.diff(startDate, 'minute');

  const hours = Math.floor(differenceMinutes / 60);
  const minutes = differenceMinutes % 60;

  return `${hours}H ${minutes}M`;
};

export { getRandomElement, humanizeTaskDueDate, getFormattedDuration };
