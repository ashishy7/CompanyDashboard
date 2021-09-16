import CONSTANTS from "../Helper/Constants";
import HF from "../Helper/Helper";
const {
  EMPLOYEE_FIELDS_TO_VALIDATE,
  STATUS_FAILED,
  INTERNAL_SERVER_ERROR_MSG,
  EMPLOYEE_ALREADY_EXIST_MSG,
} = CONSTANTS;
import Employee from "../models/Employee";
class EmployeeController {
  createEmployee = async (req, res) => {
    const { name, age, salary, phoneNo } = req.body;
    console.log("EMP_DATA", req.body);
    const errors = HF.validate(EMPLOYEE_FIELDS_TO_VALIDATE, {
      name,
      age,
      salary,
      phoneNo,
    });
    if (errors.length)
      return HF.sendJSONResponse(res, { errors }, 400, STATUS_FAILED);
    const isEmpleyeeExist = await Employee.exists({ name, phoneNo });
    if (isEmpleyeeExist)
      return HF.sendJSONResponse(
        res,
        { general: EMPLOYEE_ALREADY_EXIST_MSG },
        400,
        STATUS_FAILED
      );
    const employee = new Employee({
      name,
      age,
      salary,
      phoneNo,
      company: req.company._id,
    });
    employee
      .save()
      .then((employee) => HF.sendJSONResponse(res, { employee }))
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
  getAllEmployees = async (req, res) => {
    try {
      const companyId = req.company._id;
      const employeeList = await Employee.find({ company: companyId });
      return HF.sendJSONResponse(res, { employeeList });
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
  getEmployeeById = async (req, res, next, id) => {
    console.log("Getting req",res,req)
  try {
      const employeeData = await Employee.findById(id).exec();
      if (!employeeData)
        return HF.sendJSONResponse(
          res,
          { general: EMPLOYEE_NOT_FOUND_MSG },
          400,
          STATUS_FAILED
        );
    // req.company = HF.some(company, COMPANY_DATA_KEYS);
     return HF.sendJSONResponse(res, { employeeData });
      next();
    } catch (exception) {
      console.log(exception);
    }
  }

}

const EController = new EmployeeController();
export default EController;
