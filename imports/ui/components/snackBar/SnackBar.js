import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import snackBar from "../../../libs/snackBar";
import { useTracker } from "meteor/react-meteor-data";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars() {
  const data = useTracker(() => {
    return snackBar.get("snackbar");
  });
  const handleClick = () => {
    snackBar.set("snackbar", {
      open: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackBar.set("snackbar", {
      open: false,
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={data.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={data.severity}
          sx={{ width: "100%" }}
          style={{
            fontSize: "1.6rem",
          }}
        >
          {data.msg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error" severity="success">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
