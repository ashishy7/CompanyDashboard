import { AllInboxOutlined } from "@material-ui/icons";
import auth from "./AuthHandler";
import BE from "./backend";
import company from "./Company";

class EmployeeHandlerAPIs {
  async createEmployee(employeeData) {
    try {
      const companyInfo = company.getCompanyInfo();
      const { _id } = companyInfo;
      if (!_id) throw new Error();
      const URI = `/company/${_id}/employee`;
      const token = auth.getAuthToken();
      console.log(employeeData);
      const datafromBackend = await BE.customPOSTFetch(
        URI,
        employeeData,
        token
      );
      return datafromBackend;
    } catch (exception) {
      return Promise.reject();
    }
  }
  async signIn(userData) {
    console.log("USER", userData);
    const datafromBackend = await BE.customPOSTFetch("/signin", userData);
    return datafromBackend;
  }
  getEmployeeData(id) {
    fetch(`http://localhost:8080/${id}`).then()
  }
}
const employeeAPI = new EmployeeHandlerAPIs();
export default employeeAPI;
