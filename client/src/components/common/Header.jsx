import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ opacity: 0.95, py: 2, boxShadow: 5 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="FoodBridge Logo"
            style={{ height: "90px", marginRight: "10px" }}
          />
        </Box>
        <Box>
          {["Home", "Donate Food", "Volunteer"].map((item) => (
            <Button
              key={item}
              color="inherit"
              sx={{
                mx: 1,
                fontSize: "1.1rem",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
