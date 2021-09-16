export default {
  COMPANY_DATA_KEYS: ["email", "name", "phoneNo", "createdAt", "_id"],
  COMPANY_ALREADY_EXIST_MSG: "Company already exist, please sign In",
  EMPLOYEE_ALREADY_EXIST_MSG: "Employee already exist !",
  COMPANY_NOT_FOUND_MSG: "Company not found, please try again",
  PASS_INCORRECT: "Password did not matched",
  INTERNAL_SERVER_ERROR_MSG:
    "There is some internal server error, please try again later",
  STATUS_FAILED: "FAILED",
  STATUS_SUCCESS: "SUCCESS",
  STATUS_SUCCESS: "SUCCESS",
  AUTHORIZATION: "authorization",
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE_NO_REGEX: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
  SIGNUPFIELDSTOVALIDATE: [
    {
      fieldName: "email",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 3,
        },
        {
          functionName: "checkMaxLength",
          minLength: 30,
        },
        {
          functionName: "isEmail",
          minLength: 30,
        },
      ],
    },
    {
      fieldName: "password",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 3,
        },
        {
          functionName: "checkMaxLength",
          minLength: 40,
        },
      ],
    },
    {
      fieldName: "name",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 3,
        },
        {
          functionName: "checkMaxLength",
          minLength: 30,
        },
      ],
    },
    {
      fieldName: "phoneNo",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 10,
        },
        {
          functionName: "checkMaxLength",
          minLength: 13,
        },
        {
          functionName: "isPhoneNoValid",
        },
      ],
    },
  ],
  SIGNINFIELDSTOVALIDATE: [
    {
      fieldName: "email",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 3,
        },
        {
          functionName: "checkMaxLength",
          maxLength: 30,
        },
        {
          functionName: "isEmail",
        },
      ],
    },
  ],
  EMPLOYEE_FIELDS_TO_VALIDATE: [
    {
      fieldName: "name",
      validateFor: [
        {
          functionName: "checkMinLength",
          minLength: 3,
        },
        {
          functionName: "checkMaxLength",
          minLength: 30,
        },
      ],
    },
    {
      fieldName: "salary",
      validateFor: [
        {
          functionName: "checkGreaterThan",
          greaterThan: 0,
        },
        {
          functionName: "checkSmallerThan",
          smallerThan: 1000000000,
        },
      ],
    },
    {
      fieldName: "age",
      validateFor: [
        {
          functionName: "checkGreaterThan",
          greaterThan: 15,
        },
        {
          functionName: "checkSmallerThan",
          smallerThan: 120,
        },
      ],
    },
    {
      fieldName: "phoneNo",
      validateFor: [
        {
          functionName: "isPhoneNoValid",
        },
      ],
    },
  ],
};
