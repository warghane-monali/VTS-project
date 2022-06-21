import React from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const ConfirmModal = (props) => {
  const { content, open, setOpen, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="dialog-title"
    >
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
        Submit
        </Button>
      </DialogActions>
    </Dialog>
    // </div>
  );
};

export default ConfirmModal;