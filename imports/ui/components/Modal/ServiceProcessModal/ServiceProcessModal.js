import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import modal from "../../../../libs/modal";
import { useTracker } from "meteor/react-meteor-data";
import "./style.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ServiceProcessModal(props) {
  const modalState = useTracker(() => {
    return modal.get("modalServiceProcess");
  });
  const handleClose = () => {
    modal.set("modalServiceProcess", {
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
        <Box sx={style}>
          <div className="ServiceProcessModal">
            <div className="ServiceProcessModal__body">
              <h5 className="card-title">{props.msg}</h5>
            </div>
            <div className="ServiceProcessModal__action">
              <button
                className="ServiceProcessModal__btn ServiceProcessModal__btn--cancel"
                onClick={handleClose}
              >
                cancel
              </button>
              <button
                className="ServiceProcessModal__btn ServiceProcessModal__btn--confirm"
                onClick={() => {
                  props.handler();
                  handleClose();
                }}
              >
                confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
