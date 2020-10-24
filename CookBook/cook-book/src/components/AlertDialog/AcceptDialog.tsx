import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import { AlertDialogState } from "../../models/AlertDialogState";

interface AcceptDialogProps {
  alertDialogState: AlertDialogState;
  onOk: () => void;
  onCancel: () => void;
}

export default function AcceptDialog(props: AcceptDialogProps) {
  const { onOk, onCancel } = props;

  return (
    <Dialog
      open={props.alertDialogState.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.alertDialogState.alertTitle
          ? props.alertDialogState.alertTitle
          : ""}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.alertDialogState.text ? props.alertDialogState.text : ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onOk();
          }}
          color="primary"
        >
          <CheckCircleIcon />
          Yes
        </Button>
        <Button
          onClick={() => {
            onCancel();
          }}
          color="primary"
        >
          <CancelIcon />
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
