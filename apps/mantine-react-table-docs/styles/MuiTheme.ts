import { createTheme, darken } from '@mui/material';

export const theme = (isLightTheme: boolean) =>
  createTheme({
    palette: {
      mode: isLightTheme ? 'light' : 'dark',
      secondary: {
        main: isLightTheme ? darken('rgb(23,169,191)', 0.1) : 'rgb(23,169,191)',
      },
    },
    typography: {
      h1: {
        fontSize: '2rem',
        lineHeight: '3rem',
        paddingLeft: '16px',
      },
      h2: {
        fontSize: '32px',
        lineHeight: '5rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '2rem',
        lineHeight: '3rem',
        marginBottom: '16px',
      },
      h4: {
        fontSize: '24px',
        lineHeight: '2rem',
      },
      h5: {
        fontSize: '20px',
        lineHeight: '3rem',
      },
      h6: {
        fontSize: '1.16px',
        lineHeight: '3rem',
      },
      subtitle1: {
        marginBottom: '16px',
      },
      body1: {
        fontSize: '16px',
        lineHeight: '2rem',
        marginBottom: '8px',
      },
    },
  });
