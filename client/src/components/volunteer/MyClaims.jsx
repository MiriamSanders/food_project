import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "./DonationList";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const MyClaims = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/donations/my-claims",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching claims:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();

    socket.on("donationClaimed", (updatedDonation) => {
      setDonations((prev) => {
        const exists = prev.find((d) => d._id === updatedDonation._id);
        if (exists)
          return prev.map((d) =>
            d._id === updatedDonation._id ? updatedDonation : d
          );
        if (
          updatedDonation.volunteerId ===
          JSON.parse(localStorage.getItem("user")).id
        ) {
          return [...prev, updatedDonation];
        }
        return prev;
      });
    });

    return () => socket.off("donationClaimed");
  }, []);

  return (
      <Box>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <DonationList donations={donations} />
        )}
      </Box>
  );
};

export default MyClaims;
