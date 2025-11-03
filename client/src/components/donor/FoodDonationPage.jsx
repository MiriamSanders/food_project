// src/pages/FoodDonationPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LocationOn, AccessTime, Favorite, Send } from "@mui/icons-material";
import FoodItemsForm from "./FoodItemsForm";
import Layout from "../layout/Layout";

export default function FoodDonationPage() {
  const [location, setLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [foodItems, setFoodItems] = useState([
    { food: "", amount: "", unit: "kg" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `Lat: ${position.coords.latitude.toFixed(
              7
            )}, Lng: ${position.coords.longitude.toFixed(7)}`
          );
          fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude.toFixed(
              4
            )}&lon=${position.coords.longitude.toFixed(
              4
            )}&apiKey=9e8ff255619a4e1e98604808be9065e3`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.features && data.features.length > 0) {
                setLocation(data.features[0].properties.formatted);
              }

            });
          showSnackbar("Location detected successfully.", "info");
        },
        () => {
          showSnackbar(
            "Unable to get location. Please enter manually.",
            "warning"
          );
        }
      );
    } else {
      showSnackbar("Geolocation not supported by your browser", "error");
    }
  };

  const handleSubmit = async () => {
    if (!location || !pickupTime) {
      showSnackbar("Please fill in location and pickup time!", "error");
      return;
    }
    const validFoodItems = foodItems.filter((item) => item.food && item.amount);
    if (validFoodItems.length === 0) {
      showSnackbar("Please add at least one food item!", "error");
      return;
    }

    // 🧠 Convert pickupTime (HH:mm) to a proper Date for today
    const today = new Date();
    const [hours, minutes] = pickupTime.split(":");
    const maxTime = new Date(today.setHours(hours, minutes));

    const donationData = {
      name: "Anonymous Donor", // or replace with a real name field later
      address: location,
      items: validFoodItems,
      maxTime,
    };
    console.log(donationData);

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:5000/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit donation");
      }

      showSnackbar("Donation submitted successfully!", "success");
      setLocation("");
      setPickupTime("");
      setFoodItems([{ food: "", amount: "", unit: "kg" }]);
    } catch (err) {
      console.error(err);
      showSnackbar(err.message || "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          maxWidth="sm" // smaller than 'md'
          sx={{
            bgcolor: "rgba(255,255,255,0.95)",
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 3 }, // slightly less padding
            width: "100%", // ensures it scales on small screens
            mx: "auto", // centers horizontally
          }}
        >
          {/* Header */}
          <Card
            sx={{
              p: 2,
              mb: 4,
              borderLeft: 8,
              borderColor: "success.main",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Favorite color="success" fontSize="large" />
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                >
                  Food Bridge
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                Building bridges between food and people
              </Typography>
            </CardContent>
          </Card>

          {/* Main Form */}
          <Card sx={{ p: 4, borderRadius: 2 }}>
            <CardContent>
              {/* Location */}
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                fontFamily="Inter, sans-serif"
              >
                <LocationOn
                  color="success"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Pickup Location
              </Typography>

              <TextField
                fullWidth
                label="Address or specific location details"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Button
                variant="outlined"
                color="success"
                onClick={detectLocation}
                startIcon={<LocationOn />}
              >
                Use Current GPS Location
              </Button>

              <Divider sx={{ my: 4 }} />

              {/* ✅ Food Items Section */}
              <FoodItemsForm
                foodItems={foodItems}
                setFoodItems={setFoodItems}
              />

              {/* Pickup Time */}
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                fontFamily="Inter, sans-serif"
              >
                <AccessTime
                  color="primary"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Pickup Deadline
              </Typography>

              <TextField
                type="time"
                fullWidth
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                helperText="Food must be collected by this time today"
              />

              {/* Submit */}
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                sx={{ mt: 4, py: 2, fontWeight: "bold", fontSize: "1.2rem" }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : undefined
                }
              >
                {isSubmitting ? "Submitting..." : "Submit Donation ✨"}
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Typography
          textAlign="center"
          mt={4}
          color="white"
          fontWeight="medium"
          sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          Thank you for making a difference 💚
        </Typography>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
}
