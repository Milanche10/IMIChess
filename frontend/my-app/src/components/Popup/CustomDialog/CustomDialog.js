import React from "react";
import "./CustomDialog.css"; // Import your CSS file

export default function CustomDialog({ open, children, title, contentText, handleContinue }) {
  if (!open) return null;

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog">
        <h2>{title}</h2>
        <p>{contentText}</p>
        <div className="custom-dialog-content">
          {children}
        </div>
        <div className="custom-dialog-actions">
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}


/*@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog({ open, children, title, contentText, handleContinue }) {
  return (
    <Dialog open={open}> {//dialog container}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent> {// Main body of modal/dialog }
        <DialogContentText> {// main text }
          {contentText}
        </DialogContentText>
        {children} {/// Other content }
      </DialogContent>
      <DialogActions> {// Dialog action buttons }
        {// Force users to make input without option to cancel }
        {// <Button onClick={handleClose}>Cancel</Button> }
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}*/
