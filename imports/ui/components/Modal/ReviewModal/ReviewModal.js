import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import modal from "../../../../libs/modal";
import { useTracker } from "meteor/react-meteor-data";
import { Box, Rating, TextField } from "@mui/material";

import "./style.scss";
import { ServicesCollection } from "../../../../api/services/services";
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

export default function ReviewModal({ id }) {
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState("");
  const modalState = useTracker(() => {
    return modal.get("modalReview");
  });
  const service = useTracker(() => {
    Meteor.subscribe("services");

    return ServicesCollection.findOne(id);
  });
  const handelRating = (e, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    modal.set("modalReview", {
      open: false,
    });
  };
  const handelChange = (e) => {
    setDescription(e.target.value);
  };
  const confirmHandler = () => {
    Meteor.call(
      "ReviewsCollection.insert",
      service._id,
      Meteor.userId(),
      service.provider,
      value,
      description,
      () => {
        setValue(null);
        setDescription("");
        Meteor.call(
          "notification.insert",
          `reviewed your work`,
          service.provider,
          id
        );
        return "yes";
      }
    );
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
          <div>
            <div>
              <h3 className="heading-2">Rating</h3>
              <Rating
                onChange={handelRating}
                name="read-only"
                precision={0.5}
                value={value}
                size="large"
              />
              <hr />

              <div className="service-fields mb-3">
                <h3 className="heading-2">Details Information</h3>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="entry">
                        <TextField
                          value={description}
                          onChange={handelChange}
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={8}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ServiceProcessModal__action">
              <button
                className="ServiceProcessModal__btn ServiceProcessModal__btn--cancel"
                onClick={handleClose}
              >
                cancel
              </button>
              <button
                disabled={!value || value === null}
                className="ServiceProcessModal__btn ServiceProcessModal__btn--confirm"
                onClick={() => {
                  if (!value || value === null) {
                    return;
                  }
                  confirmHandler();
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
