import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#88B04B" },
    secondary: { main: "#FFD6A5" },
    background: { default: "#FFF9F4" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: { fontWeight: 700 },
    h5: { fontWeight: 500 },
  },
});
