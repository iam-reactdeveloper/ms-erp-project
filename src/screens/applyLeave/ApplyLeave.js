import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SrightIcon from '@mui/icons-material/Send';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';

import { LeaveOption } from '../../container';
import {
  BasicTable,
  Button,
  EmailChipInput,
  Modal,
  SelectFeild,
  TextArea,
  Loader,
} from '../../components';
import {
  MailHeading,
  MailContainer,
  Container,
  MailContainerBody,
  BodyButton,
  ApplyLeaveUpperContainer,
  LeaveContainer,
  InputContainer,
  SelectContainer,
  ButtonBar,
  CommentContainer,
} from './ApplyLeave.styles';
import {
  dateTimeCalculation,
  applyLeaveSelect,
  Message,
  ondeDay,
  other,
  earlyGoing,
  description,
  leave,
  toastMessage,
  routes,
  dateHandler,
  date,
  pending,
  commentColumnList,
} from '../../utils';
import {
  getCCAction,
  applyLeaveAction,
  resetApplyLeaveState,
  setEmptyLeaveData,
  getSingleLeaveData,
  getComment,
} from '../../services';
import { BackButtonMain } from '../../components';

export const ApplyLeave = () => {
  const { isLeaveApllied, getCCData, loading } = useSelector(
    (state) => state?.applyLeave
  );
  const commentList = useSelector((state) => state?.leaves?.commentList);
  const { leaveDetail } = useSelector((state) => state.leaves);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const check = id ? true : false;

  const [open, setOpen] = useState(false);
  const [applyLeaveData, setApplyLeaveData] = useState({
    leave: '',
    fromTime: null,
    toTime: null,
    description: '',
    fromDate: null,
    toDate: null,
  });

  const [to, setTo] = useState([]);
  const [cc, setCC] = useState(getCCData);
  const [Radio, setRadio] = useState(ondeDay);

  useEffect(() => {
    if (id) {
      setApplyLeaveData({
        leave: leaveDetail.type,
        fromTime: leaveDetail.fromTime,
        toTime: leaveDetail.toTime,
        description: leaveDetail?.description,
        fromDate: moment(leaveDetail.fromDate).toDate(),
        toDate: moment(leaveDetail.toDate).toDate(),
      });
      setCC(leaveDetail?.cc);
      setTo(leaveDetail?.to);

      const radioData =
        leaveDetail?.fromDate === leaveDetail?.toDate ? ondeDay : other;
      setRadio(radioData);
    }
  }, [leaveDetail, id]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleLeaveData(id));
    }
    if (isLeaveApllied) {
      dispatch(resetApplyLeaveState());
      history(routes.leave.totalLeave);
    }
  }, [id, isLeaveApllied, dispatch, history]);

  useEffect(() => {
    dispatch(getCCAction());
    return () => {
      dispatch(setEmptyLeaveData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (leaveDetail && leaveDetail.fromTime && !loading) {
      setApplyLeaveData({
        ...applyLeaveData,
        leave: leaveDetail?.type,
        fromTime: leaveDetail.fromTime,
        toTime: leaveDetail?.toTime,
        description: leaveDetail?.description,
        fromDate: moment(leaveDetail?.fromDate)?.toDate(),
        toDate: moment(leaveDetail?.toDate)?.toDate(),
      });
      setCC(leaveDetail?.cc);
      setTo(leaveDetail?.to);

      const radioData =
        leaveDetail?.fromDate === leaveDetail?.toDate ? ondeDay : other;
      setRadio(radioData);
    }
  }, [leaveDetail, loading, applyLeaveData]);

  useEffect(() => {
    setCC(getCCData);
  }, [Radio, getCCData]);

  const handleChange = (e, type) => {
    const data = { ...applyLeaveData };
    if (type === description || type === leave) {
      data[type] = e.target.value;
    } else {
      data[type] = e;
    }
    setApplyLeaveData({ ...applyLeaveData, ...data });
  };

  const handleBack = () => {
    history(-1);
  };

  const handleChangeChip = (chips, type) => {
    if (type === 'to') {
      setTo([...to, chips]);
    } else {
      setCC([...cc, chips]);
    }
  };

  const handleDelete = (deletedVal, type) => {
    if (type === 'to') {
      setTo(to.filter((element) => element !== deletedVal));
    } else {
      const filteredCC = cc.filter((element) => {
        if (element === deletedVal) {
          const index = getCCData.findIndex((e) => e === deletedVal);
          if (index !== -1) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });
      setCC(filteredCC);
    }
  };

  const getTotalDiff = () => {
    return {
      from:
        applyLeaveData.leave === earlyGoing
          ? applyLeaveData?.fromTime
          : applyLeaveData?.fromDate,
      to:
        applyLeaveData.leave === earlyGoing
          ? applyLeaveData?.toTime
          : applyLeaveData?.toDate,
    };
  };

  const totalTimeDiff = dateTimeCalculation(
    applyLeaveData?.leave,
    getTotalDiff()?.from,
    getTotalDiff()?.to
  );

  const handleSubmit = () => {
    if (
      !to.length ||
      !applyLeaveData?.leave ||
      !applyLeaveData?.description ||
      !applyLeaveData?.fromDate
    ) {
      toastMessage({ type: 'error', message: Message.errors.FIELDS_NOT_EMPTY });
      setIsLoading(false);
      return;
    }

    const finalToDate = applyLeaveData?.toDate
      ? applyLeaveData?.toDate
      : applyLeaveData?.fromDate;

    const body = {
      cc,
      to,
      description: applyLeaveData?.description,
      type: applyLeaveData?.leave,
      fromDate: moment(applyLeaveData?.fromDate).format('L'),
      toDate: moment(finalToDate).format('L'),
      fromTime: String(
        applyLeaveData?.fromTime ? applyLeaveData?.fromTime : '8:00 am'
      ),
      toTime: String(
        applyLeaveData?.toTime ? applyLeaveData?.toTime : '8:00 pm'
      ),
    };

    dispatch(applyLeaveAction(body));
    setIsLoading(false);
  };

  const convertOptions = applyLeaveSelect.map((e) => {
    return { label: e.name, value: e.value };
  });

  const handleOpen = () => {
    setIsLoading(true);
    setTimeout(() => {
      setOpen(true);
      setIsLoading(false);
      dispatch(getComment(id));
    }, 2000);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const commetRowList = commentList?.comment?.map((item) => {
    const commentTime = dateHandler({
      value: item?.createdAt,
      formateType: date,
    });
    const fullName = item?.commentedBy?.fullName;
    const status = item?.status;
    const comment = item?.comment ? item?.comment : 'N/A';

    return [commentTime, fullName, status, comment];
  });
  function loaderForBtn() {
    return isLoading === true ? true : false;
  }
  function handleSubmitMock() {
    setIsLoading(true);
    setTimeout(() => {
      handleSubmit();
    }, 2000);
  }

  return (
    <Container>
      <Modal open={open} handleClose={handleClose}>
        <CommentContainer>
          <BasicTable
            columns={commentColumnList}
            rows={commetRowList}
            id={id}
          />
        </CommentContainer>
      </Modal>

      {loading ? (
        <Loader
          style={{
            width: '100% !important',
            height: 'calc(100vh - 80px)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <>
          <ApplyLeaveUpperContainer>
            <BackButtonMain>
              <Button
                color="info"
                text="Back"
                leftIcon={<ArrowBackIcon />}
                handleOnClick={handleBack}
              />
            </BackButtonMain>
            <ButtonBar>
              {id && leaveDetail?.status !== pending && (
                <Button
                  color="info"
                  text="View History"
                  handleOnClick={handleOpen}
                  isLoading={isLoading}
                />
              )}
            </ButtonBar>
          </ApplyLeaveUpperContainer>
          <MailContainer>
            <MailHeading>{id ? 'Details' : 'Add Leave'}</MailHeading>
            <MailContainerBody>
              <InputContainer>
                <EmailChipInput
                  value={to}
                  onAdd={(chip) => handleChangeChip(chip, 'to')}
                  onDelete={(chip) => handleDelete(chip, 'to')}
                  disabled={check}
                  label="To: "
                />
                <EmailChipInput
                  value={cc}
                  onAdd={(chip) => handleChangeChip(chip, 'cc')}
                  onDelete={(chip) => handleDelete(chip, 'cc')}
                  disabled={check}
                  label="Cc: "
                />
              </InputContainer>
              <LeaveContainer>
                <SelectContainer>
                  <div className="select-container">
                    <SelectFeild
                      selectField="select-field"
                      options={convertOptions}
                      selectedValue={applyLeaveData?.leave || ''}
                      handleChange={(evt) => handleChange(evt, leave)}
                      disabled={check}
                      label="Leave"
                    />
                  </div>
                </SelectContainer>
                <LeaveOption
                  applyLeaveData={applyLeaveData}
                  Radio={Radio}
                  setRadio={setRadio}
                  handleChange={handleChange}
                  id={check}
                  totalTimeDiff={totalTimeDiff}
                />
              </LeaveContainer>
              <TextArea
                value={applyLeaveData?.description}
                setValue={(evt) => handleChange(evt, description)}
                disabled={check}
                height="250px"
              />
              <BodyButton>
                {!id && (
                  <BackButtonMain>
                    <Button
                      handleOnClick={handleSubmitMock}
                      color="info"
                      text={'Send'}
                      rightIcon={<SrightIcon />}
                      isLoading={loaderForBtn()}
                    />
                  </BackButtonMain>
                )}
              </BodyButton>
            </MailContainerBody>
          </MailContainer>
        </>
      )}
    </Container>
  );
};
