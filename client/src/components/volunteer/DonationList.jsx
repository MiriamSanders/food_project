import React from "react";
import { Grid, Typography } from "@mui/material";
import DonationCard from "./DonationCard";

const DonationList = ({ donations, onClaim }) => {
  if (!donations.length)
    return (
      <Typography color="text.secondary" mt={2}>
        No donations available right now.
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {donations.map((donation) => (
        <Grid item xs={12} md={6} lg={4} key={donation._id}>
          <DonationCard donation={donation} onClaim={onClaim} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DonationList;
