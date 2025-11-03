import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "../volunteer/DonationList";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");        
        const res = await axios.get(
          "http://localhost:5000/donations/my-donations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    socket.on("donationClaimed", (updatedDonation) => {
      setDonations((prev) =>
        prev.map((d) => (d._id === updatedDonation._id ? updatedDonation : d))
      );
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

export default MyDonations;
