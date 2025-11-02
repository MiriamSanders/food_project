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
  const { _id, hallName, address, foodType, quantity, status } = donation;

  const isAvailable = status === "Available";

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
            color={isAvailable ? "success.main" : "info.main"}
            sx={{ mt: 1 }}
          >
            {status}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onClaim(_id)}
          sx={{ borderRadius: 2 }}
          disabled={!isAvailable} // אם לא זמין, הכפתור מושבת
          color={isAvailable ? "primary" : "inherit"} // אם לא זמין, צבע אפור
        >
          {isAvailable ? "Claim" : "Claimed"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonationCard;
