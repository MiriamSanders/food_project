import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const DonationCard = ({ donation, onClaim }) => {
  const { id, hallName, address, foodType, quantity, status } = donation;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {hallName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>

        <Box mt={1}>
          <Typography variant="body2">
            <strong>Food:</strong> {foodType}
          </Typography>
          <Typography variant="body2">
            <strong>Quantity:</strong> {quantity}
          </Typography>
          <Typography
            variant="body2"
            color={status === "Available" ? "success.main" : "info.main"}
            sx={{ mt: 1 }}
          >
            {status}
          </Typography>
        </Box>
      </CardContent>

      {status === "Available" && (
        <CardActions>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onClaim(id)}
            sx={{ borderRadius: 2 }}
          >
            Claim
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default DonationCard;
