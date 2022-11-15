import React from 'react';

import { DatePickers, RadioForm, TimePicker } from '../../components';
import {
  TimePickerContainer,
  TimeParagreaph,
} from '../../screens/applyLeave/ApplyLeave.styles';
import { ShowDays } from './LeaveOption.style';

import {
  applyLeaveRadioButtonArray,
  fullDay,
  other,
  wfhFullDay,
  earlyGoing,
  toDate,
  fromTime,
  toTime,
  fromDate,
} from '../../utils';

export const LeaveOption = ({
  applyLeaveData,
  Radio,
  setRadio,
  handleChange,
  id,
  totalTimeDiff,
}) => {
  const radioForm = () => {
    if (
      applyLeaveData.leave === fullDay ||
      applyLeaveData.leave === wfhFullDay
    ) {
      return (
        <TimePickerContainer>
          <RadioForm
            value={Radio}
            setValue={setRadio}
            radioArray={applyLeaveRadioButtonArray}
            formLabel="Leave For"
            disabled={id}
          />
        </TimePickerContainer>
      );
    }
  };

  const showToTime = () => {
    if (
      (applyLeaveData.leave === fullDay ||
        applyLeaveData.leave === wfhFullDay) &&
      Radio === other
    ) {
      return (
        <TimePickerContainer from="from">
          <TimeParagreaph>To: &nbsp; </TimeParagreaph>{' '}
          <DatePickers
            setStartDate={(e) => handleChange(e, toDate)}
            details={id}
            startDate={applyLeaveData.toDate}
            date={applyLeaveData.fromDate}
          />
        </TimePickerContainer>
      );
    }
  };

  const showEarlyTime = () => {
    if (applyLeaveData.leave === earlyGoing) {
      return (
        <>
          <TimePickerContainer>
            <TimeParagreaph>From: &nbsp; </TimeParagreaph>{' '}
            <TimePicker
              value={applyLeaveData.fromTime}
              handleChange={(e) => handleChange(e, fromTime)}
              disabled={id}
              label="From"
            />
          </TimePickerContainer>
          <TimePickerContainer>
            <TimeParagreaph>To: &nbsp; </TimeParagreaph>{' '}
            <TimePicker
              value={applyLeaveData.toTime}
              handleChange={(e) => handleChange(e, toTime)}
              disabled={id}
              label="To"
            />
          </TimePickerContainer>
        </>
      );
    }
  };

  return (
    <>
      {radioForm()}

      <TimePickerContainer from="from">
        <TimeParagreaph>
          {' '}
          {Radio === other ? 'From' : 'Date'}: &nbsp;{' '}
        </TimeParagreaph>{' '}
        <DatePickers
          setStartDate={(e) => handleChange(e, fromDate)}
          details={id}
          startDate={applyLeaveData.fromDate}
          date={new Date()}
        />
      </TimePickerContainer>

      {showToTime()}

      {showEarlyTime()}

      {applyLeaveData.leave === earlyGoing
        ? applyLeaveData.toTime && <ShowDays>{totalTimeDiff} </ShowDays>
        : applyLeaveData.fromDate && <ShowDays>{totalTimeDiff}</ShowDays>}
    </>
  );
};
