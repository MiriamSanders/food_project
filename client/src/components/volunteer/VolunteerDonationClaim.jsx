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
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        if (isDev && !API_BASE_URL) {
          setTimeout(() => {
            setDonations([]);
            setLoading(false);
          }, 500);
          return;
        }
        const res = await axios.get(`${API_BASE_URL}/donations`);
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    const socket = io(API_BASE_URL || "http://localhost:5000");


    socket.on("donationCreated", (newDonation) => {
      setDonations((prev) => [newDonation, ...prev]);
    });

    socket.on("donationUpdated", (updatedDonation) => {
      setDonations((prev) =>
        prev.map((d) => (d._id === updatedDonation._id ? updatedDonation : d))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [API_BASE_URL, isDev]);

  const handleClaim = async (donationId) => {
    if (isDev && !API_BASE_URL) {
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId ? { ...d, status: "claimed" } : d
        )
      );
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/donations/${donationId}/claim`);
      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId ? { ...d, status: "claimed" } : d
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
