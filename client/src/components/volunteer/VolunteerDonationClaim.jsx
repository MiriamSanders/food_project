import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "./DonationList";
import Layout from "../layout/Layout";
import axios from "axios";
import { io } from "socket.io-client";

const VolunteerDonationClaim = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const socket = io(API_BASE_URL);

    const fetchDonations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/donations`);
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    // מאזינים לאירועי Socket
    socket.on("donationClaimed", (updatedDonation) => {
      setDonations((prev) =>
        prev.map((d) =>
          d._id === updatedDonation._id ? updatedDonation : d
        )
      );
    });

    // נקה את החיבור בעת סגירת הקומפוננטה
    return () => {
      socket.disconnect();
    };
  }, [API_BASE_URL]);

  const handleClaim = async (donationId) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/donations/${donationId}/claim`);
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId ? { ...d, status: "Claimed by you" } : d
        )
      );
    } catch (err) {
      console.error("Error claiming donation:", err);
    }
  };

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight={700}>
          Available Donations
        </Typography>
        <Typography color="text.secondary">
          Choose a donation to claim and deliver.
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <DonationList donations={donations} onClaim={handleClaim} />
      )}
    </Layout>
  );
};

export default VolunteerDonationClaim;
