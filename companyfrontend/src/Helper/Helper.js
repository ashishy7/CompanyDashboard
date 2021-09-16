import CONSTANTS from "../Helper/Constants";
const { EMAIL_REGEX, PHONE_NO_REGEX } = CONSTANTS;
var data;
class Helper {
  validate(fields, valObj) {
    let errors = {};
    // console.log(fields, valObj);
    fields.forEach(({ fieldName, validateFor }) => {
      const value = valObj[fieldName];
      validateFor.every((validation) => {
        const { functionName } = validation;
        if (functionName === "checkMinLength") {
          const { minLength } = validation;
          return this.checkMinLength(value, minLength, fieldName, errors);
        }
        if (functionName === "checkMaxLength") {
          const { maxLength } = validation;
          return this.checkMaxLength(value, maxLength, fieldName, errors);
        }
        if (functionName === "checkSmallerThan") {
          const { smallerThan } = validation;
          return this.checkSmallerThan(value, smallerThan, fieldName, errors);
        }
        if (functionName === "checkGreaterThan") {
          const { greaterThan } = validation;
          return this.checkGreaterThan(value, greaterThan, fieldName, errors);
        }
        if (functionName === "isEmail") {
          return this.isEmail(value, fieldName, errors);
        }
        if (functionName === "isPhoneNoValid") {
          return this.isPhoneNoValid(value, fieldName, errors);
        }
        return false;
      });
    });

    return Object.keys(errors).length ? errors : undefined;
  }
  checkMinLength(input, min, key, errors) {
    if (!input || input.trim().length < min) {
      errors[key] = `${key} must be greater than ${min} characters !`;
      return false;
    }
    return true;
  }
  checkMaxLength(input, max, key, errors) {
    if (!input || input.trim().length > max) {
      errors[key] = `${key} must be smaller than ${max} characters !`;
      return false;
    }
    return true;
  }
  checkGreaterThan(input, greaterThan, key, errors) {
    if (!input || isNaN(+input) || +input < greaterThan) {
      errors[key] = `${key} should not be greater than ${greaterThan} !`;
      return false;
    }
    return true;
  }
  checkSmallerThan(input, smallerThan, key, errors) {
    if (!input || isNaN(+input) || +input > smallerThan) {
      errors[key] = `${key} should not be smaller than ${smallerThan} !`;
      return false;
    }
    return true;
  }
  isEmail(email, key, errors) {
    if (!EMAIL_REGEX.test(email)) {
      errors[key] = `${key} not valid !`;
      return false;
    }
    return true;
  }
  isPhoneNoValid(phoneNo, key, errors) {
    if (!PHONE_NO_REGEX.test(phoneNo)) {
      errors[key] = `${key} not valid !`;
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
  setItemsInLocalStorage(Items) {
    if (Items.length) {
      Items.forEach((item) => {
        const key = Object.keys(item)[0];
        localStorage.setItem(key, JSON.stringify(item[key]));
      });
    }
  }
  getItemFromLocalStorage(itemKey, isItemNotInJsonFormat) {
    return !isItemNotInJsonFormat
      ? JSON.parse(localStorage.getItem(itemKey))
      : localStorage.getItem(itemKey);
  }
  removeItemsInLocalStorage(Items) {
    if (Items.length) {
      Items.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }
  setEmployeeList(dataItem) {
  localStorage.setItem("emplist", JSON.stringify(dataItem));
    this.data = dataItem
    
  }
  getEmployeeList() {
    return JSON.parse(localStorage.getItem("emplist"));
  }
}
const HF = new Helper();
export default HF;
