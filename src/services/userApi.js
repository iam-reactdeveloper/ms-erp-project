import {
  API,
  error,
  Message,
  post,
  request,
  success,
  toastMessage,
} from "../utils";
import * as T from "../redux";

export const generateOrChangeSalaryPassword = (body) => {
  return async (dispatch) => {
    try {
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_REQUEST,
        })
      );
      const response = await request({
        url: API.userApi.generateOrChangeSalaryPassword,
        method: post,
        data: body,
      });
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_SUCCESS,
          payload: response,
        })
      );
      toastMessage({
        type: success,
        message: response?.message
          ? response?.message
          : Message?.success?.GENERATE_SALARY_PASSWORD_SUCCESS,
      });
    } catch (err) {
      toastMessage({
        type: error,
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : Message.errors.GENERATE_SALARY_PASSWORD_ERROR,
      });
      dispatch(
        T.GENERATE_OR_CHANGE_SALARY_PASSWORD({
          type: T.GENERATE_CHANGE_SALARY_PASS_FAIL,
          payload: err?.response?.data?.error,
        })
      );
    }
  };
};
