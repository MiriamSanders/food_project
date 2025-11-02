import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const getButtons = () => {
    if (location.pathname === "/donation") {
      return [{ label: "My Donations", path: "/donation" }];
    } else if (location.pathname === "/claimdonation") {
      return [{ label: "Active Missions", path: "/claimdonation" }];
    } else {
      return [
        { label: "Donate Food", path: "/donation" },
        { label: "Volunteer", path: "/claimdonation" },
      ];
    }
  };

  const isHomePage = location.pathname === "/home";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ opacity: 0.95, py: 2, boxShadow: 5 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            key={"/home"}
            color="inherit"
            onClick={() => navigate("/home")}
            sx={{
              mx: 1,
              fontSize: "1.1rem",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <img
              src="/logo.png"
              alt="FoodBridge Logo"
              style={{ height: "90px", marginRight: "10px" }}
            />
          </Button>
        </Box>

        <Box>
          {getButtons().map(({ label, path }) => (
            <Button
              key={label}
              color="inherit"
              onClick={() => navigate(path)}
              sx={{
                mx: 1,
                fontSize: "1.1rem",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
            >
              {label}
            </Button>
          ))}

          {isHomePage ? (
             <Tooltip title="Login">
              <IconButton color="inherit" onClick={() => navigate("/login")} sx={{ ml: 2 }}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
