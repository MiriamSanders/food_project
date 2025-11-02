import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} FoodBridge — Connecting hearts through shared meals.
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
        Together, we build a world with less waste and more kindness.
      </Typography>
    </Box>
  );
}
