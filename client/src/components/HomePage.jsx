import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Restaurant, VolunteerActivism, Group } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: { main: "#88B04B" }, // green
    secondary: { main: "#FFD6A5" }, // peach
    background: { default: "#FFF9F4" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: { fontWeight: 700 },
    h5: { fontWeight: 500 },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: "url('/background_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#333",
        }}
      >
        {/* Header */}
            <AppBar
              position="static"
              color="primary"
              sx={{
                opacity: 0.95,
                py: 2,
                boxShadow: 5,
              }}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                src="/logo.png"
                alt="Bridge of Food Logo"
                style={{ height: '150px', marginRight: '10px' }}
                  />
                </Box>
                <Box>
                  {["Home", "Donate Food", "Collect Donations"].map(
                (item) => (
                  <Button key={item} color="inherit" sx={{ mx: 1, fontSize: "1.5rem" }} >
                    {item}
                  </Button>
                )
                  )}
                </Box>
              </Toolbar>
            </AppBar>

            {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 6, md: 10 },
            bgcolor: "rgba(255,255,255,0.85)",
            borderRadius: 5,
            maxWidth: "900px",
            mx: "auto",
            mt: 8,
            p: 5,
            boxShadow: 6,
          }}
        >
          <Typography variant="h3" gutterBottom color="primary">
            Bridging Surplus & Need
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Turning leftover meals into meaningful help.  
            Connect catering businesses, volunteers, and charities in real-time.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2, px: 4, py: 1.2 }}
          >
            Offer Food
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.2 }}
          >
            Collect Food
          </Button>
        </Box>

        {/* Feature Section */}
        <Container sx={{ mt: 12, mb: 12 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              position: "relative",
              "& .feature-card": {
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
              },
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className="feature-card"
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.92)",
                  boxShadow: 4,
                  mt: 6,
                }}
              >
                <CardContent>
                  <Restaurant fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Catering Surplus
                  </Typography>
                  <Typography variant="body1">
                    Easily post extra meals from events or kitchens.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                className="feature-card"
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.95)",
                  boxShadow: 6,
                  transform: { md: "translateY(-40px)" },
                }}
              >
                <CardContent>
                  <VolunteerActivism fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Volunteer Pickup
                  </Typography>
                  <Typography variant="body1">
                    Join local volunteers who collect and deliver donations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                className="feature-card"
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.92)",
                  boxShadow: 4,
                  mt: 6,
                }}
              >
                <CardContent>
                  <Group fontSize="large" color="primary" />
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Community Impact
                  </Typography>
                  <Typography variant="body1">
                    Help reduce waste and feed those in need.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 5,
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          <Typography variant="body1">
            © {new Date().getFullYear()} FoodBridge — Connecting hearts through shared meals.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Together, we build a world with less waste and more kindness.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
