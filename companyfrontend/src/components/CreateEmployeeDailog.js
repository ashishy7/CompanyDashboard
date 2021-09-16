import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateContext";

function CreateEmployeeDailog() {
  const [{ isCreateFormdialogOpen }, dispatch] = useStateValue();
  const handleOpenFormClick = () =>
    dispatch({
      type: actionTypes.SET_CREATE_FORM_DIALOG_OPEN,
    });
  return (
    <div>
      <Dialog
        open={isCreateFormdialogOpen}
        onClose={handleOpenFormClick}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add Employee 1
        </DialogTitle>
        <DialogContent>
          <CreateEmployeeForm handleCloseOrOpen={handleOpenFormClick} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOpenFormClick} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreateEmployeeDailog;
