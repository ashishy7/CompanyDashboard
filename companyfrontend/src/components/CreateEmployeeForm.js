import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import CONSTANTS from "../Helper/Constants";
import HF from "../Helper/Helper";
import theme from "../util/theme";
import employeeAPI from "../util/EmployeeHandlerAPIs";
import { useStateValue } from "../context/StateContext";
import { actionTypes } from "../context/reducer";
import queryString from "query-string";
const style = (theme) => ({
  ...theme,
});

const { EMPLOYEE_FIELDS_TO_VALIDATE, INTERNAL_SERVER_ERROR_MSG } = CONSTANTS;
const CreateEmployeeForm = (
  {
  classes: { textField, button, loading },
  handleCloseOrOpen,
 },props) => {
  const initialState = {
    age: "",
    salary: "",
    name: "",
    phoneNo: "",
  };
  const [isEdit,setEditMode]=useState(false)
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { age, name, salary, phoneNo } = state;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  // const query = queryString.parse(props.location.search);
  console.log("Query Details", window.location.search.split("?"));
  console.log("id", window.location.pathname.split('/')[2]);
  const empId = window.location.pathname.split("/")[2];
  const isEditFromUrl = window.location.search.split("=")[1];
  let employeedb={};
  if (isEditFromUrl==="true") {
    
    const empList = HF.getEmployeeList();

    empList.forEach((emp) => {
      if (emp.id === empId) {
        employeedb = emp;
      }
    });
    // setEditMode(true);
  }
  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      setIsLoading(true);
      error && setError("");
      const formInput = {
        name,
        salary,
        age,
        phoneNo,
      };
      const errors = HF.validate(EMPLOYEE_FIELDS_TO_VALIDATE, formInput);
      console.log(errors);
      if (errors) return setError(errors);
      const { success, data } = await employeeAPI.createEmployee(formInput);
      data
        .then((data) => {
          console.log(data);
          const { status, employee } = data;
          if (status.toLowerCase() === "success") {
            dispatch({
              type: actionTypes.SET_EMPLOYEELIST,
              payload: [{ ...employee, id: employee._id }, ...Employees],
            });
            handleCloseOrOpen();
          } else {
            setError(data);
          }
        })
        .catch((err) => console.log("FAIL ", err));
    } catch (error) {
      console.log(error);
      setError({ general: INTERNAL_SERVER_ERROR_MSG });
    } finally {
      setIsLoading(false);
      // setEditMode(false);
    }
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // setEditMode(false)
      
  }
  const [{ Employees }, dispatch] = useStateValue();

  return (
    <Grid item>
      {isEditFromUrl !== "true" ? (
        <form>
          <TextField
            autoComplete="off"
            label="name"
            name="name"
            value={name}
            onChange={handleChange}
            fullWidth
            helperText={error && error["name"]}
            error={error && !!error["name"]}
            className={textField}
          />
          <TextField
            autoComplete="off"
            label="Age"
            value={age}
            type="number"
            onChange={handleChange}
            fullWidth
            helperText={error && error["age"]}
            error={error && !!error["age"]}
            className={textField}
            name="age"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Yrs</InputAdornment>
              ),
            }}
          />
          <TextField
            autoComplete="off"
            label="Salary"
            type="number"
            name="salary"
            value={salary}
            onChange={handleChange}
            fullWidth
            helperText={error && error["salary"]}
            error={error && !!error["salary"]}
            className={textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">LPA</InputAdornment>
              ),
            }}
          />{" "}
          <TextField
            autoComplete="off"
            label="Phone No"
            type="tel"
            name="phoneNo"
            value={phoneNo}
            onChange={handleChange}
            fullWidth
            helperText={error && error["phoneNo"]}
            error={error && !!error["phoneNo"]}
            className={textField}
          />
          {!!(error && error["general"]) && (
            <Typography variant="body2" color="secondary">
              {error && error["general"]}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            className={button}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading && (
              <CircularProgress
                color="secondary"
                size="2rem"
                className={loading}
              />
            )}
            Create
          </Button>
        </form>
      ) : (
        <form>
          <TextField
            autoComplete="off"
            label="name"
            name="name"
            value={employeedb.name ? employeedb.name : ""}
            onChange={handleChange}
            fullWidth
            helperText={error && error["name"]}
            error={error && !!error["name"]}
            className={textField}
          />
          <TextField
            autoComplete="off"
            label="Age"
            value={employeedb.age ? employeedb.age : ""}
            type="number"
            onChange={handleChange}
            fullWidth
            helperText={error && error["age"]}
            error={error && !!error["age"]}
            className={textField}
            name="age"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Yrs</InputAdornment>
              ),
            }}
          />
          <TextField
            autoComplete="off"
            label="Salary"
            type="number"
            name="salary"
            value={employeedb.salary ? employeedb.salary : ""}
            onChange={handleChange}
            fullWidth
            helperText={error && error["salary"]}
            error={error && !!error["salary"]}
            className={textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">LPA</InputAdornment>
              ),
            }}
          />{" "}
          <TextField
            autoComplete="off"
            label="Phone No"
            type="tel"
            name="phoneNo"
            value={employeedb.phoneNo ? employeedb.phoneNo : ""}
            onChange={handleChange}
            fullWidth
            helperText={error && error["phoneNo"]}
            error={error && !!error["phoneNo"]}
            className={textField}
          />
          {!!(error && error["general"]) && (
            <Typography variant="body2" color="secondary">
              {error && error["general"]}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            className={button}
            disabled={isLoading}
            onClick={handleUpdateSubmit}
          >
            {isLoading && (
              <CircularProgress
                color="secondary"
                size="2rem"
                className={loading}
              />
            )}
            Update
          </Button>
        </form>
      )}
    </Grid>
  );
};
export default withStyles(style(theme))(CreateEmployeeForm);
