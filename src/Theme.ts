import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Add more palette customization as needed
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      textTransform: 'none',
    },
    h2: {
      textTransform: 'none',
    },
    h3: {
      textTransform: 'none',
    },
    h4: {
      textTransform: 'none',
    },
    h5: {
      textTransform: 'none',
    },
    h6: {
      textTransform: 'none',
    },
    body1: {
      textTransform: 'none',
    },
    body2: {
      textTransform: 'none',
    },
    // Add more typography customization as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    // Add more component customizations as needed
  },
});

export default theme;
