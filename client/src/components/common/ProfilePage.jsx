import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { Person, Favorite, VolunteerActivism, AccountCircle } from "@mui/icons-material";
import Layout from "../layout/Layout";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [donationsOffered, setDonationsOffered] = useState([]);
  const [donationsClaimed, setDonationsClaimed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    // שולף משתמש מה-localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // נתונים לדוגמה — בהמשך יוחלפו בפניות אמיתיות לשרת
    setTimeout(() => {
      setDonationsOffered([
       
      ]);
      setDonationsClaimed([
       
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 4 },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            bgcolor: "rgba(255,255,255,0.95)",
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
            width: "100%",
            mx: "auto",
          }}
        >
          {/* כותרת עליונה */}
          <Card
            sx={{
              p: 2,
              mb: 4,
              borderLeft: 8,
              borderColor: "primary.main",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <AccountCircle color="primary" fontSize="large" />
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                >
                  My Profile
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                Welcome back, {user?.name || "user"}!
              </Typography>
            </CardContent>
          </Card>

          {/* פרטי משתמש */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                <Person color="primary" sx={{ mr: 1, verticalAlign: "middle" }} />
                Personal Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography><strong>Name:</strong> {user?.name}</Typography>
              <Typography><strong>Email:</strong> {user?.email}</Typography>
              <Typography><strong>Address:</strong> {user?.address}</Typography>
              <Typography><strong>Role:</strong> {user?.role}</Typography>
            </CardContent>
          </Card>

          {/* תרומות שהציע */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                <Favorite color="error" sx={{ mr: 1, verticalAlign: "middle" }} />
                Donations I Offered
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {donationsOffered.length === 0 ? (
                <Typography color="text.secondary">No donations yet.</Typography>
              ) : (
                donationsOffered.map((d) => (
                  <Typography key={d.id}>
                    • {d.title} — <em>{d.status}</em>
                  </Typography>
                ))
              )}
            </CardContent>
          </Card>

          {/* תרומות שנאספו */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                <VolunteerActivism color="success" sx={{ mr: 1, verticalAlign: "middle" }} />
                Donations I Claimed
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {donationsClaimed.length === 0 ? (
                <Typography color="text.secondary">No claimed donations yet.</Typography>
              ) : (
                donationsClaimed.map((d) => (
                  <Typography key={d.id}>
                    • {d.title} — <em>{d.status}</em>
                  </Typography>
                ))
              )}
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 2, fontWeight: "bold", fontSize: "1.1rem" }}
            onClick={() =>
              setSnackbar({ open: true, message: "Edit profile coming soon!", severity: "info" })
            }
          >
            Edit Profile ✏️
          </Button>
        </Box>

        <Typography
          textAlign="center"
          mt={4}
          color="white"
          fontWeight="medium"
          sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          Building bridges between food and people 💚
        </Typography>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
}
