import * as T from "../../types";

const initialState = {
  loading: false,
  error: false,
  errorMessage: {},
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.GENERATE_CHANGE_SALARY_PASS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case T.GENERATE_CHANGE_SALARY_PASS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case T.GENERATE_CHANGE_SALARY_PASS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
