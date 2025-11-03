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
  const { _id, name, address, items, status, volunteerName } = donation;

  const isAvailable = status === "pending";

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
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>

        <Box mt={1}>
          {items.map((item, idx) => (
            <Typography key={idx} variant="body2">
              <strong>{item.food}:</strong> {item.amount} {item.unit}
            </Typography>
          ))}

          <Typography
            variant="body2"
            color={
              isAvailable ? "success.main" : status === "claimed" ? "warning.main" : "info.main"
            }
            sx={{ mt: 1 }}
          >
            {status === "pending"
              ? "Available"
              : status === "claimed"
              ? `Claimed by ${volunteerName || "someone"}`
              : "Completed"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onClaim(_id)}
          sx={{ borderRadius: 2 }}
          disabled={!isAvailable}
          color={isAvailable ? "primary" : "inherit"}
        >
          {isAvailable ? "Claim" : "Claimed"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonationCard;
