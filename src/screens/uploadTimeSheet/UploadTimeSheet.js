import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContainerBox,
  SubmitButton,
  SelectYear,
  InnerBox,
  FormCol,
  HeadingLine,
  InnerDiv,
} from './uploadTimeSheet.style';
import { Button, SelectFeild } from '../../components';
import {
  Message,
  monthsName,
  toastMessage,
  yearCalculation,
} from '../../utils';
import { uploadCSVAction } from '../../services';

export const UploadTimeSheet = () => {
  const [sheet, setSheet] = useState({
    isError: false,
    fileData: null,
    inputKey: '',
    month: '',
    year: '',
  });

  const { loading } = useSelector((state) => state?.leaves);

  const dispatch = useDispatch();

  const resetTheFileInput = () => {
    const randomString = Math.random().toString(36);
    setSheet({
      ...sheet,
      isError: false,
      fileData: null,
      month: '',
      year: '',
      inputKey: randomString,
    });
  };

  const yearData = yearCalculation();
  const yearList = yearData.map((year) => ({ value: year, label: year }));

  const fileChangeHandler = (e) => {
    setSheet({ ...sheet, fileData: e.target.files[0] });
  };

  const monthOption = monthsName.map((e) => {
    return { label: e.name, value: e.value };
  });

  const handleChange = (e) => {
    setSheet({ ...sheet, month: e.target.value });
  };

  const handleYear = (e) => {
    setSheet({ ...sheet, year: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!sheet.fileData || !sheet.month || !sheet.year) {
      setSheet({ ...sheet, isError: true });
      toastMessage({
        type: 'error',
        message: Message.errors.FILE_UPLOAD_ERROR,
      });
      return false;
    }
    const data = new FormData();
    data.append('timesheet', sheet.fileData);

    const params = { month: sheet.month, year: sheet.year };

    dispatch(
      uploadCSVAction({
        body: data,
        params,
      })
    );
    resetTheFileInput();
  };

  return (
    <ContainerBox>
      <InnerBox>
        <HeadingLine>Upload Sheet</HeadingLine>
        <FormCol>
          <div>
            <input
              type="file"
              key={sheet.inputKey || ''}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={fileChangeHandler}
            />
            <InnerDiv>
              <>
                <div>Select Month</div>
                <SelectFeild
                  options={monthOption}
                  selectedValue={sheet.month || ''}
                  handleChange={(e) => handleChange(e)}
                />
              </>
              <SelectYear>
                <label htmlFor="select-year">Select Year</label>
                <SelectFeild
                  options={yearList}
                  selectedValue={sheet.year || ''}
                  handleChange={(e) => handleYear(e)}
                  id={'select-year'}
                />
              </SelectYear>
            </InnerDiv>

            <SubmitButton>
              <Button
                color="info"
                text="Submit"
                handleOnClick={onSubmitHandler}
                isLoading={loading}
              />
            </SubmitButton>
          </div>
        </FormCol>
      </InnerBox>
    </ContainerBox>
  );
};
