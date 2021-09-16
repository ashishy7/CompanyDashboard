import CONSTANTS from "../Helper/Constants";
const { STATUS_SUCCESS, EMAIL_REGEX, PHONE_NO_REGEX } = CONSTANTS;
import jwt from "jsonwebtoken";
class Helper {
  validate(fields, valObj) {
    let errors = [];
    fields.forEach(({ fieldName, validateFor }) => {
      const value = valObj[fieldName];
      validateFor.every((validation) => {
        const { functionName } = validation;
        console.log(functionName, fieldName);
        if (functionName == "checkMinLength") {
          const { minLength } = validation;
          return this.checkMinLength(value, minLength, fieldName, errors);
        }
        if (functionName == "checkMaxLength") {
          const { maxLength } = validation;
          return this.checkMaxLength(value, maxLength, fieldName, errors);
        }
        if (functionName == "checkSmallerThan") {
          const { smallerThan } = validation;
          return this.checkSmallerThan(value, smallerThan, fieldName, errors);
        }
        if (functionName == "checkGreaterThan") {
          const { greaterThan } = validation;
          return this.checkGreaterThan(value, greaterThan, fieldName, errors);
        }
        if (functionName == "isEmail") {
          return this.isEmail(value, fieldName, errors);
        }
        if (functionName == "isPhoneNoValid") {
          return this.isPhoneNoValid(value, fieldName, errors);
        }
      });
    });

    return errors;
  }
  checkMinLength(input, min, key, errors) {
    if (!input || input.trim().length < min) {
      const errorObj = {};
      errorObj[key] = `${key} must be greater than ${min} characters !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  checkMaxLength(input, max, key, errors) {
    if (!input || input.trim().length > max) {
      const errorObj = {};
      errorObj[key] = `${key} must be smaller than ${max} characters !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  checkGreaterThan(input, greaterThan, key, errors) {
    console.log(input, greaterThan);
    if (!input || +input < greaterThan) {
      const errorObj = {};
      errorObj[key] = `${key} should not be greater than ${greaterThan} !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  checkSmallerThan(input, smallerThan, key, errors) {
    if (!input || +input > smallerThan) {
      const errorObj = {};
      errorObj[key] = `${key} should not be smaller than ${smallerThan} !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  isEmail(email, key, errors) {
    if (!EMAIL_REGEX.test(email)) {
      const errorObj = {};
      errorObj[key] = `${key} not valid !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  isPhoneNoValid(phoneNo, key, errors) {
    if (!PHONE_NO_REGEX.test(phoneNo)) {
      const errorObj = {};
      errorObj[key] = `${key} not valid !`;
      errors.push(errorObj);
      return false;
    }
    return true;
  }
  some(obj, keys) {
    const toReturn = {};
    for (let key of keys) {
      if (key in obj) toReturn[key] = obj[key];
    }
    return toReturn;
  }
  sendJSONResponse(res, data, statusCode = 200, status = "SUCCESS") {
    data.status = status;
    return res.status(statusCode).json(data);
  }
  SignJWTandSendResponse(req, res, data, specificKeys) {
    data = HF.some(data, specificKeys);
    const token = jwt.sign(data, process.env.PRIVATEKEY, {
      expiresIn: "2h",
    });
    return this.sendJSONResponse(res, { data, token }, 200, STATUS_SUCCESS);
  }
}
const HF = new Helper();
export default HF;
