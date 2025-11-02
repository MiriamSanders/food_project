import React from "react";
import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { theme } from "./theme";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: "url('/background_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Container sx={{ flex: 1, mt: 5, mb: 5 }}>{children}</Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
