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
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Restaurant, VolunteerActivism, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
          sx={{ opacity: 0.95, py: 1, boxShadow: 5 }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="Bridge of Food Logo"
                style={{ height: "80px", marginRight: "10px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                FoodBridge
              </Typography>
            </Box>
            <Box>

              <Box>
                {["Home", "About", "Sign Up", "Login"].map((item) => {
                  // Map the button label to a route path
                  const pathMap = {
                    Home: "/home",
                    About: "/about",
                    "Sign Up": "/signup",
                    Login: "/login",
                  };
                  return (
                    <Button
                      key={item}
                      color="inherit"
                      sx={{
                        mx: 1,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                      }}
                      onClick={() => navigate(pathMap[item])}
                    >
                      {item}
                    </Button>
                  );
                })}
              </Box>

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
            sx={{ mr: 2, px: 4, py: 1.5 }}
          >
            Offer Food
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Collect Food
          </Button>
        </Box>

        {/* Feature Section */}
        <Container sx={{ mt: 12, mb: 12 }}>
          <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
            {[
              {
                icon: <Restaurant fontSize="large" color="primary" />,
                title: "Catering Surplus",
                desc: "Easily post extra meals from events or kitchens.",
                mt: 6,
              },
              {
                icon: <VolunteerActivism fontSize="large" color="primary" />,
                title: "Volunteer Pickup",
                desc: "Join local volunteers who collect and deliver donations.",
                mt: 0,
              },
              {
                icon: <Group fontSize="large" color="primary" />,
                title: "Community Impact",
                desc: "Help reduce waste and feed those in need.",
                mt: 6,
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.93)",
                    boxShadow: 4,
                    mt: feature.mt,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
