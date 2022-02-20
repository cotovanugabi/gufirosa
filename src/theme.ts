import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          minWidth: "unset",
          textTransform: "none",
          marginRight: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
  },
});

export default theme;
