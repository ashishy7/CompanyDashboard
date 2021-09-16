import express from "express";
import CController from "../controllers/Company";
import EController from "../controllers/Employee";
const Router = express.Router();
Router.param("companyId", CController.getCompanyById);
Router.post(
  "/company/:companyId/employee",
  CController.isSignedIn,
  CController.isAuthenticated,
  EController.createEmployee
);
Router.get(
  "/company/:companyId/employees",
  CController.isSignedIn,
  CController.isAuthenticated,
  EController.getAllEmployees

);
Router.get("/emp/:id",
     EController.getEmployeeById

)
export default Router;

