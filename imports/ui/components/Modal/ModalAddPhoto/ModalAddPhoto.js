import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import modal from "../../../../libs/modal";
import { useTracker } from "meteor/react-meteor-data";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalAddPhoto(props) {
  const modalState = useTracker(() => {
    return modal.get("modalAddPhoto");
  });
  const handleClose = () => {
    modal.set("modalAddPhoto", {
      open: false,
    });
  };
  return (
    <div>
      <Modal
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
