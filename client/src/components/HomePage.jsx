import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Restaurant, VolunteerActivism, Group } from "@mui/icons-material";
import Layout from "./layout/Layout";

export default function HomePage({ setRole }) {
  const navigate = useNavigate();

  // נבדוק אם המשתמש מחובר ומה התפקיד שלו
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <Layout>
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
          Turning leftover meals into meaningful help. Connect catering
          businesses, volunteers, and charities in real-time.
        </Typography>

        {/* --- אם לא מחובר --- */}
        {!isLoggedIn && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2, px: 4, py: 1.5 }}
              onClick={() => {
                setRole("donor");
                navigate("/signup");
              }}
            >
              Sign Up as Donor
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
              onClick={() => {
                setRole("volunteer");
                navigate("/signup");
              }}
            >
              Sign Up as Volunteer
            </Button>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </>
        )}

        {/* --- אם מחובר כתורם --- */}
        {isLoggedIn && role === "donor" && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => navigate("/donation")}
          >
            Offer Food
          </Button>
        )}

        {/* --- אם מחובר כמתנדב --- */}
        {isLoggedIn && role === "volunteer" && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => navigate("/claimdonation")}
          >
            Collect Food
          </Button>
        )}
      </Box>

      {/* --- חלק תחתון של פיצ'רים --- */}
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
    </Layout>
  );
}
