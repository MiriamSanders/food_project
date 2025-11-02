import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Slide,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function SuccessPage({ address, open, onClose }) {
  const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 5,
          bgcolor: "#FFF9F4",
          px: 3,
          py: 4,
          textAlign: "center",
          minWidth: { xs: "300px", sm: "400px" },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <CheckCircleIcon sx={{ fontSize: 60, color: "#88B04B" }} />
      </DialogTitle>

      <DialogContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#88B04B" }}>
          Success!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your donation has been successfully recorded.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          You can navigate to the pickup location:
        </Typography>
        <Button
          variant="contained"
          href={wazeLink}
          target="_blank"
          sx={{
            bgcolor: "#FFD6A5",
            color: "#333",
            fontWeight: 600,
            "&:hover": { bgcolor: "#FFC090" },
          }}
        >
          Open in Waze
        </Button>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button onClick={onClose} sx={{ color: "#88B04B", fontWeight: 600 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessPage;
