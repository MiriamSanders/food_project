import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "./DonationList";
import Layout from "../layout/Layout";
import axios from "axios";
import io from "socket.io-client";
import SuccessPage from "./SuccessPage.jsx";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const VolunteerDonationClaim = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [claimedAddress, setClaimedAddress] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const getCoordinates = () =>
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error)
            );
          });

        const coords = await getCoordinates();
        const { latitude, longitude } = coords;

        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/donations?lat=${latitude}&lng=${longitude}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const available = res.data.filter((d) => d.status === "pending");
        setDonations(available);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    socket.on("donationClaimed", (updatedDonation) => {
      setDonations((prev) =>
        prev.map((d) =>
          d._id === updatedDonation._id ? { ...d, ...updatedDonation } : d
        )
      );
    });

    socket.on("donationCreated", (newDonation) => {
      setDonations((prev) => [newDonation, ...prev]);
    });

    return () => {
      socket.off("donationClaimed");
      socket.off("donationCreated");
    };
  }, []);

  const handleClaim = async (donationId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/donations/${donationId}/claim`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDonations((prev) =>
        prev.map((d) =>
          d._id === donationId ? { ...d, status: "claimed" } : d
        )
      );

      const claimedDonation = donations.find((d) => d._id === donationId);
      if (claimedDonation?.address) setClaimedAddress(claimedDonation.address);

      setSuccessOpen(true);
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

      <SuccessPage
        open={successOpen}
        address={claimedAddress}
        onClose={() => setSuccessOpen(false)}
      />
    </Layout>
  );
};

export default VolunteerDonationClaim;
