import jwt from "jsonwebtoken";
import Company from "../models/Company";
import CONSTANTS from "../Helper/Constants";
import HF from "../Helper/Helper";
const {
  COMPANY_ALREADY_EXIST_MSG,
  STATUS_FAILED,
  INTERNAL_SERVER_ERROR_MSG,
  COMPANY_NOT_FOUND_MSG,
  PASS_INCORRECT,
  AUTHORIZATION,
  COMPANY_DATA_KEYS,
  SIGNINFIELDSTOVALIDATE,
  SIGNUPFIELDSTOVALIDATE,
} = CONSTANTS;
class CompanyController {
  signIn = async (req, res) => {
    const { email, password } = req.body;
    const errors = HF.validate(SIGNINFIELDSTOVALIDATE, { email });
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    try {
      const company = await Company.findOne({ email });
      if (!company.authenticate(password))
        return HF.sendJSONResponse(
          res,
          { general: PASS_INCORRECT },
          400,
          STATUS_FAILED
        );
      return HF.SignJWTandSendResponse(req, res, company, COMPANY_DATA_KEYS);
    } catch (error) {
      console.log(error);
      HF.sendJSONResponse(
        res,
        { general: COMPANY_NOT_FOUND_MSG },
        400,
        STATUS_FAILED
      );
    }
  };
  signUp = async (req, res) => {
    const { name, email, password, phoneNo } = req.body;
    const errors = HF.validate(SIGNUPFIELDSTOVALIDATE, {
      email,
      name,
      password,
      phoneNo,
    });
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    const isCompanyExist = await Company.exists({ email });
    if (isCompanyExist)
      return HF.sendJSONResponse(
        res,
        { general: COMPANY_ALREADY_EXIST_MSG },
        400,
        STATUS_FAILED
      );
    const company = new Company({ name, email, password, phoneNo });
    company
      .save()
      .then((company) =>
        HF.SignJWTandSendResponse(req, res, company, COMPANY_DATA_KEYS)
      )
      .catch((error) => {
        console.log(error);
        return HF.sendJSONResponse(
          res,
          { general: INTERNAL_SERVER_ERROR_MSG },
          500,
          STATUS_FAILED
        );
      });
  };
  //middlewares
  isSignedIn = (req, res, next) => {
    let token;
    if (
      !req.headers ||
      !req.headers.hasOwnProperty(AUTHORIZATION) ||
      !req.headers[AUTHORIZATION]
    )
      return HF.sendJSONResponse(
        res,
        { general: "No token Found" },
        400,
        STATUS_FAILED
      );
    const auth = req.headers[AUTHORIZATION];
    console.log("AUTH ", auth);
    if (auth && typeof auth === "string") token = auth.split("Bearer ")[1];
    jwt.verify(token || "", process.env.PRIVATEKEY, (err, payload) => {
      if (err)
        return HF.sendJSONResponse(
          res,
          { general: "Invalid token" },
          400,
          STATUS_FAILED
        );
      req.authCompany = payload;
      next();
    });
  };
  isAuthenticated = (req, res, next) => {
    if (
      !req.company ||
      !req.authCompany ||
      req.company._id != req.authCompany._id
    )
      return HF.sendJSONResponse(
        res,
        { general: "Company not Authenticated" },
        400,
        STATUS_FAILED
      );
    next();
  };
  getCompanyById = async (req, res, next, id) => {
    try {
      const company = await Company.findById(id).exec();
      if (!company)
        return HF.sendJSONResponse(
          res,
          { general: COMPANY_NOT_FOUND_MSG },
          400,
          STATUS_FAILED
        );
      req.company = HF.some(company, COMPANY_DATA_KEYS);
      next();
    } catch (exception) {
      console.log(exception);
    }
  };
}

const CController = new CompanyController();
export default CController;

// Bearer token
