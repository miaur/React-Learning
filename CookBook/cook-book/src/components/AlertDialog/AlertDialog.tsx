import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'


interface AlertDialogProps {
    alertDialogState: {
        alertTitle?: string,
        text?: string,
        open: boolean,
    },
    onClose: () => void,
}
export default function AlertDialog(props: AlertDialogProps) {
    const { onClose } = props;

    return (
        <Dialog
            open={props.alertDialogState.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.alertDialogState.alertTitle ? props.alertDialogState.alertTitle: ""}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.alertDialogState.text ? props.alertDialogState.text : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose() }} color="primary">
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    );

}
