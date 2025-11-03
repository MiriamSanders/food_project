import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // שליפת המשתמש מה-localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

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
        {/* לוגו */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
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

        {/* ניווט + פרופיל */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
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

          {user ? (
            <>
              {/* תצוגת סוג המשתמש */}
              <Typography
                variant="body1"
                sx={{
                  ml: 2,
                  mr: 1,
                  fontWeight: 500,
                  bgcolor: "rgba(255,255,255,0.15)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  textTransform: "capitalize",
                }}
              >
                {user.role === "donor" ? "Donor" : "Volunteer"}
              </Typography>

              {/* אווטר עם האות הראשונה */}
              <Tooltip title={user.name || "Profile"}>
                <Avatar
                  sx={{
                    bgcolor: "#fff",
                    color: "primary.main",
                    fontWeight: "bold",
                    ml: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </Avatar>
              </Tooltip>

              {/* כפתור יציאה */}
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Login">
              <IconButton color="inherit" onClick={() => navigate("/login")} sx={{ ml: 2 }}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
