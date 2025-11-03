import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Snackbar,
  Alert
} from "@mui/material";
import { Favorite, Person } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "./api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

const handleLogin = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const result = await loginUser({ email, password });

  if (result && result.token) {
    // Store user info and token locally
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    setSnackbar({ open: true, message: "Login successful!", severity: "success" });

    // Navigate based on role after short delay
    setTimeout(() => {
      const role = result.user.role;
      if (role === "donor") {
        navigate("/donation");
      } else if (role === "volunteer") {
        navigate("/claimdonation");
      } else {
        navigate("/home"); // fallback
      }
    }, 800);
  } else {
    setSnackbar({ open: true, message: "Invalid email or password", severity: "error" });
  }

  setIsSubmitting(false);
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        backgroundImage: "url(/background_image.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "rgba(255,255,255,0.95)",
          borderRadius: 4,
          boxShadow: 24,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={3} justifyContent="center">
          <Favorite color="success" fontSize="large" />
          <Typography variant="h4" fontWeight="bold" fontFamily="Inter, sans-serif">
            Login
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3} color="text.secondary">
          Don’t have an account?{" "}
          <RouterLink to="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
            Sign up
          </RouterLink>
        </Typography>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
