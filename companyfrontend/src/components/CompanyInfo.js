import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import auth from "../util/AuthHandler";
import "./css/CompanyInfo.css";
function CompanyInfo(props) {
  const signOut = () => {
    auth.signOut();
    history.push("/login");
  };
  const history = useHistory();
  return (
    <div className="companyInfo">
      <header>
        <h3>Welcome, {props?.info?.name}</h3>
        <div className="contactInfo">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={signOut}
            className="btn"
          >
            Sign Out
          </Button>
        </div>
      </header>
    </div>
  );
}

export default CompanyInfo;
