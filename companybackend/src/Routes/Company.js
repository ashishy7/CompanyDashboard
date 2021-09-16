import express from "express";
const Router = express.Router();
import CController from "../controllers/Company";
Router.param("companyId", CController.getCompanyById);
Router.post("/signin", CController.signIn);
Router.post("/signup", CController.signUp);
Router.get(
  "/test/:companyId",
  CController.isSignedIn,
  CController.isAuthenticated,
  (req, res) => res.send(req.company)
);
export default Router;
