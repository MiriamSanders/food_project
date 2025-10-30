import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import DonationList from "./DonationList";

const VolunteerDonationClaim = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // מדמה בקשת API
  useEffect(() => {
    setLoading(true);
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
    }, 1200);
  }, []);

  const handleClaim = (donationId) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId ? { ...d, status: "Claimed by you" } : d
      )
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Available Donations
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <DonationList donations={donations} onClaim={handleClaim} />
      )}
    </Box>
  );
};

export default VolunteerDonationClaim;
