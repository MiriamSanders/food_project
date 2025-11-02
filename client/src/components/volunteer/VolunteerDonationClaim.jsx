import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "./DonationList";
import Layout from "../layout/Layout";

const VolunteerDonationClaim = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDonations([
        {
          id: 1,
          hallName: "Simcha Hall",
          address: "12 Ben Gurion St, Bnei Brak",
          foodType: "Meat meals",
          quantity: "20 portions",
          status: "Available",
        },
        {
          id: 2,
          hallName: "Royal Events",
          address: "45 Herzl St, Jerusalem",
          foodType: "Dairy pastries",
          quantity: "15 trays",
          status: "Available",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClaim = (donationId) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId ? { ...d, status: "Claimed by you" } : d
      )
    );
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
