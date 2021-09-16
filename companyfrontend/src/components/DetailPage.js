import React from "react";
import CompanyInfo from "./CompanyInfo";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import company from "../util/Company";
import CreateEmployeeDailog from "./CreateEmployeeDailog";
import { Link } from "react-router-dom";
import SearchAndAdd from "./SearchAndAdd";

function DetailPage(props) {
  console.log(window.history.state);
  const { _id,id, name, company, age, phoneNo, salary } = window.history.state;
  const companyInfo = JSON.parse(localStorage.getItem("company"));
  console.log(companyInfo.name);
  const onEditClick = () => {
    return <CreateEmployeeDailog></CreateEmployeeDailog>;
  };
  let URL =`/edit/${id}?isEdit=true`

  return (
    <div>
      {/* <CompanyInfo info={companyInfo || {}} /> */}
      <CompanyInfo info={companyInfo} />
      <Card>
        <CardContent>
          <Typography>Name :{name}</Typography>
          {/* <Typography>Company Name :{company}</Typography> */}
          <Typography>Age :{age}</Typography>
          <Typography>Salary:{salary}</Typography>
          <Typography>Phone No:{phoneNo}</Typography>
        </CardContent>
      </Card>
      {/* <Button color="primary">Delete</Button> */}
      <Link to={URL}>
        <button
          style={{
            padding: 15,
            margin: 20  
          }}
        >
          Edit
        </button>
      </Link>
    </div>
  );
}


export default DetailPage;
