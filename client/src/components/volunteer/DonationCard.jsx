import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const DonationCard = ({ donation, onClaim }) => {
  const { _id, name, address, items, maxTime, status } = donation;

  // האם התרומה זמינה לתפיסה
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
          <Typography variant="subtitle2">Items:</Typography>
          <List dense>
            {items.map((item, idx) => (
              <ListItem key={idx} sx={{ py: 0 }}>
                <ListItemText
                  primary={`${item.food} - ${item.amount} ${item.unit}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="body2"
            color={
              status === "pending"
                ? "success.main"
                : status === "claimed"
                ? "info.main"
                : "text.secondary"
            }
            sx={{ mt: 1 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Max Pickup: {new Date(maxTime).toLocaleString()}
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
