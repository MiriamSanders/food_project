import React, { useState } from "react";
import {
  Box, Button, Typography, TextField, Paper, Stack,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert
} from "@mui/material";
import { Favorite, Person, Home, AssignmentInd } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setUser } from "./api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !address || !role) {
      setSnackbar({ open: true, message: "Please fill all fields", severity: "error" });
      return;
    }

    setIsSubmitting(true);
    const newUser = { email, password, address, role };
    const result = await setUser(newUser);

    if (result) {
      setSnackbar({ open: true, message: "Signup successful!", severity: "success" });
      setTimeout(() => navigate("/"), 1000);
    } else {
      setSnackbar({ open: true, message: "Signup failed. Try again.", severity: "error" });
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
        {/* Header with icon */}
        <Stack direction="row" alignItems="center" spacing={1} mb={3} justifyContent="center">
          <Favorite color="success" fontSize="large" />
          <Typography
            variant="h4"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            Sign Up
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSignup}>
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
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              InputProps={{ startAdornment: <Home sx={{ mr: 1 }} /> }}
            />
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
                startAdornment={<AssignmentInd sx={{ mr: 1 }} />}
              >
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="volunteer">Volunteer</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </Box>

        <Typography textAlign="center" mt={3} color="text.secondary">
          Already have an account?{" "}
          <RouterLink to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
            Log in
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
