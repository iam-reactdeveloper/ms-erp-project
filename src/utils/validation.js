import * as E from "./message";

export const checkEmail = (email) => {
  if (!email) {
    return { valid: false, errMsg: E.Message.errors.USER_EMAIL };
  } else if (email.length < 2) {
    return { valid: false, errMsg: E.Message.info.USER_EMAIL_CHAR };
  } else if (!/^[a-zA-Z0-9 ]*$/.test(email)) {
    return { valid: false, errMsg: E.Message.errors.USER_VALID_EMAIL };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const checkFullName = (fullName) => {
  if (!fullName) {
    return { valid: false, errMsg: E.Message.errors.USER_FULLNAME };
  } else if (fullName.length < 5) {
    return { valid: false, errMsg: E.Message.info.USER_VALID_FULLNAME };
  } else if (!/^[a-zA-Z ]+$/i.test(fullName.trim())) {
    return { valid: false, errMsg: E.Message.info.USER_FULLNAME_CHAR };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const checkPassword = (pass) => {
  if (!pass) {
    return { valid: false, errMsg: E.Message.errors.USER_PASSWORD };
  } else if (!/^(?=.*[0-9])[a-zA-Z0-9]{6,12}$/.test(pass)) {
    return { valid: false, errMsg: E.Message.info.USER_VALID_PASSWORD };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const checkConfirmPassword = (confirmPassword, pass) => {
  if (!confirmPassword) {
    return { valid: false, errMsg: E.Message.errors.USER_CONFIRM_PASSWORD };
  } else if (confirmPassword !== pass) {
    return {
      valid: false,
      errMsg: E.Message.errors.USER_PASSWORD_CONFORMATION,
    };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const totalLeaves = (leave) => {
  if (!leave) {
    return { valid: false, errMsg: E.Message.errors.USER_LEAVES };
  } else if (leave <= 0) {
    return { valid: false, errMsg: E.Message.info.USER_TOTAL_LEAVES };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const checkRequired = (field, fieldName) => {
  if (!field && fieldName === "role") {
    return { valid: false, errMsg: E.Message.errors.USER_ROLE };
  } else if (!field && fieldName === "DOB") {
    return { valid: false, errMsg: E.Message.errors.USER_DOB };
  } else if (!field && fieldName === "joiningDate") {
    return { valid: false, errMsg: E.Message.errors.USER_JOINING_DATE };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const checkEmpCode = (empCode) => {
  if (!empCode) {
    return { valid: false, errMsg: E.Message.errors.USER_EMP };
  } else if (empCode.length > 4) {
    return { valid: false, errMsg: E.Message.info.USER_EMP_CODE };
  } else {
    return { valid: true, errMsg: "" };
  }
};

export const isTotalLeaves = (leave) => {
  if (!leave) {
    return E.Message.errors.USER_LEAVES;
  } else if (leave <= 0) {
    return E.Message.info.USER_TOTAL_LEAVES;
  } else {
    return "";
  }
};

export const isCheckEmail = (email) => {
  if (!email) {
    return E.Message.errors.USER_EMAIL;
  } else if (email.length < 2) {
    return E.Message.info.USER_EMAIL_CHAR;
  } else if (!/^[a-zA-Z0-9 ]*$/.test(email)) {
    return E.Message.errors.USER_VALID_EMAIL;
  } else {
    return "";
  }
};

export const isCheckFullName = (fullName) => {
  if (!fullName) {
    return E.Message.errors.USER_FULLNAME;
  } else if (fullName.length < 5) {
    return E.Message.info.USER_VALID_FULLNAME;
  } else if (!/^[a-zA-Z ]+$/i.test(fullName.trim())) {
    return E.Message.info.USER_FULLNAME_CHAR;
  } else {
    return "";
  }
};

export const isCheckPassword = (pass) => {
  if (!pass) {
    return E.Message.errors.USER_PASSWORD;
  } else if (pass.length < 6) {
    return E.Message.info.USER_VALID_PASSWORD;
  } else {
    return "";
  }
};

export const isCheckConfirmPassword = (confirmPassword, pass) => {
  if (!confirmPassword) {
    return E.Message.errors.USER_CONFIRM_PASSWORD;
  } else if (confirmPassword !== pass) {
    return E.Message.errors.USER_PASSWORD_CONFORMATION;
  } else {
    return "";
  }
};

export const isCheckRequired = (field, fieldName) => {
  if (!field && fieldName === "role") {
    return E.Message.errors.USER_ROLE;
  } else if (!field && fieldName === "DOB") {
    return E.Message.errors.USER_DOB;
  } else if (!field && fieldName === "joiningDate") {
    return E.Message.errors.USER_JOINING_DATE;
  } else {
    return "";
  }
};

export const isCheckEmpCode = (empCode) => {
  if (!empCode) {
    return E.Message.errors.USER_EMP;
  } else if (empCode.length > 4) {
    return E.Message.info.USER_EMP_CODE;
  } else {
    return "";
  }
};

export const isCheckSalary = (salary) => {
  if (!salary) {
    return E.Message.errors.USER_SALARY;
  }
  return "";
};

export const checkSalary = (salary) => {
  if (!salary) {
    return { valid: false, errMsg: E.Message.errors.USER_SALARY };
  }
  return { valid: true, errMsg: "" };
};

export const isEmptyField = (value) => {
  if (!value) {
    return E.Message.errors.PASSWORD_CAN_NOT_EMPTY;
  }
  return "";
};
