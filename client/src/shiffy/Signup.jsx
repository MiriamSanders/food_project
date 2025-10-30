import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
  import { setUser } from "./api";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("");


const handleSignup = async (e) => {
  e.preventDefault();
  const newUser = { email, password, address, role };

  const result = await setUser(newUser);
  if (result) {
    alert("Signup successful!");
    navigate("/"); // go to login page
  } else {
    alert("Signup failed. Try again.");
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
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSignup}>
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

          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ style: { color: "white" } }}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel sx={{ color: "#ccc" }}>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#333",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="volunteer">Volunteer</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#1976d2" }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, color: "#ccc" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{ color: "#90caf9" }}
          >
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
