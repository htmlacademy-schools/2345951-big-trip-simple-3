import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const BASIC_DATE_FORMAT = 'DD/MM/YY HH:mm';

export const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
export const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
export const convertToDateTime = (date) => date.substring(0, date.indexOf('.'));
export const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
export const convertToBasicDate = (date) => dayjs(date).format(BASIC_DATE_FORMAT);
export const compareDates = (a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1;
export const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');


export const compareTime = (a, b) => {
  const aDate = dayjs(a);
  const bDate = dayjs(b);

  if (aDate.hour() !== bDate.hour()) {
    return aDate.hour() - bDate.hour();
  }
  return aDate.minute() - bDate.minute();
};

export const sortByDay = (a, b) => compareDates(a.dateFrom, b.dateFrom);
export const sortByTime = (a, b) => compareTime(a.dateFrom, b.dateFrom);
export const sortByPrice = (a, b) => b.basePrice - a.basePrice;

export const convertToUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const convertToLowerCase = (str) => str.toLowerCase();
