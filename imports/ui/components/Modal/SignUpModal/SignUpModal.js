import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useTracker } from "meteor/react-meteor-data";
import modal from "../../../../libs/modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignUpModal(props) {
  const modalState = useTracker(() => {
    return modal.get("modalSignUp");
  });
  const handleClose = () => {
    modal.set("modalSignUp", {
      open: false,
    });
  };
  return (
    <div>
      <Modal
        className="SignUpModal"
        open={modalState.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}
