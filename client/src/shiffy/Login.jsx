import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getUser } from "./api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  const user = await getUser(email);
  if (user && user.password === password) {
    alert("Login successful!");
    navigate("/dashboard");
  } else {
    alert("Invalid email or password");
  }
};
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e1e2f 0%, #3a3a60 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 400,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" gutterBottom color="white">
          Login
        </Typography>

        {/* form */}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "white" } }}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "white" } }}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#1976d2" }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, color: "#ccc" }}>
          Don’t have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            underline="hover"
            sx={{ color: "#90caf9" }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
