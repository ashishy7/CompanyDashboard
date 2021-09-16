import { Button, fade, Grid, InputBase, makeStyles } from "@material-ui/core";
import { AddIcon, SearchIcon } from "@material-ui/data-grid";
import React from "react";
import "./css/SearchAndAdd.css";
import CreateEmployeeDailog from "./CreateEmployeeDailog";
import { useStateValue } from "../context/StateContext";
import { actionTypes } from "../context/reducer";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    marginRight: "10px",
    backgroundColor: "lightgray",
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "10px",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        boxShadow: "0px 0px 5px 2px #1E3235",
      },
    },
  },
}));

function SearchAndAdd({ setEmployeesList }) {
  const classes = useStyles();
  const [{ isCreateFormdialogOpen }, dispatch] = useStateValue();
  const handleOpenFormClick = () =>
    dispatch({
      type: actionTypes.SET_CREATE_FORM_DIALOG_OPEN,
    });
  return (
    <Grid container className="searchAndAddCont">
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleOpenFormClick}
      >
        {/* <AddIcon /> */}
        Add Employee
      </Button>
      <CreateEmployeeDailog
        open={isCreateFormdialogOpen}
        setEmployeesList={setEmployeesList}
      />
    </Grid>
  );
}

export default SearchAndAdd;
