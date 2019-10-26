/*  eslint-disable import/prefer-default-export */

export function placeValueAdder(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}

export function daysCalculator(date1, date2) {
  if (!date1 || !date2) {
    return null;
  }

  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);
  let differenceInSec = 0;
  let differenceInDays = 0;

  differenceInSec = dateObj2.getTime() - dateObj1.getTime();

  differenceInDays = Math.floor(differenceInSec / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

export function dateFormatSetter(actionDate, dateFormat) {
  if (!actionDate) {
    return null;
  }

  if (!dateFormat) {
    return dateFormat;
  }

  const dateObj = new Date(actionDate);
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  if (dateFormat === 'YYYY-MM-DD') {
    return `${year}-${placeValueAdder(month)}-${placeValueAdder(date)}`;
  }

  return null;
}

export function dayDifferenceValueHandler(daysDifferenceNum) {
  if (daysDifferenceNum > 0) {
    return `${daysDifferenceNum} days ahead`;
  }
  if (daysDifferenceNum > 0) {
    return `${Math.abs(daysDifferenceNum)} days ago`;
  }

  return `Today`;
}
