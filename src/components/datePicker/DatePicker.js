import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { DateInput } from './DatePicker.styles';

export const DatePickers = ({ startDate, setStartDate, details, date }) => {
  const isDisable = details ? true : false;
  return (
    <DateInput
      disabled={isDisable}
      selected={startDate}
      minDate={date}
      onChange={setStartDate}
      dateFormat="dd-MM-yyyy"
      placeholderText="dd/mm/yy"
    />
  );
};
