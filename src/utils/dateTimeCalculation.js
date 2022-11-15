import moment from 'moment';

import { earlyGoing, fullDay, wfhFullDay } from './appConstant';

export const dateTimeCalculation = (type, from, to) => {
  if (type === earlyGoing) {
    let startTime = moment(from);
    let endTime = moment(to);
    let duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) - hours * 60;
    const result = `0${hours}h ${minutes}m`;
    return result;
  } else if (type === fullDay || type === wfhFullDay) {
    let result;
    if (from && to) {
      let fromDate = moment(from);
      let ToDate = moment(to);
      const total = ToDate.diff(fromDate, 'days') + 1;
      result = `${total} days`;
    } else {
      result = `1 day`;
    }
    return result;
  } else {
    return '0.5 day';
  }
};

export const yearCalculation = () => {
  const yearCalculate = moment().year();
  let calculateDiff = yearCalculate - 10;
  const finalYearArray = [];
  for (let counter = yearCalculate; counter >= calculateDiff; counter--) {
    finalYearArray.push(counter);
  }
  return finalYearArray;
};
