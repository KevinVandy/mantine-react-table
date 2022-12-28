import { createTheme, Link, ThemeProvider, Typography } from '@mui/material';
import { ColorSchemeProvider, MantineProvider, Text } from '@mantine/core';
import { useDarkMode } from 'storybook-dark-mode';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'lightgrey',
        value: '#fafeff',
      },
      {
        name: 'darkgrey',
        value: '#333',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
  },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const withThemeProvider = (Story, context) => {
  const defaultTheme = createTheme({
    palette: { mode: useDarkMode() ? 'dark' : 'light' },
  });

  const colorScheme = useDarkMode() ? 'dark' : 'light';

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={() => { }}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ThemeProvider theme={defaultTheme}>
          <Text
            sx={{
              paddingBottom: '0.5rem',
              color: useDarkMode() ? '#fff' : '#666',
            }}
          >
            Looking for the main docs site? Click{' '}
            <Link
              href="https://www.mantine-react-table.com"
              target="_blank"
              rel="noopener"
            >
              here.
            </Link>
          </Text>
          <Text
            sx={{
              paddingBottom: '1rem',
              color: useDarkMode() ? '#fff' : '#666',
            }}
          >
            View source code below in the story tab on Canvas or the Show Code
            Button in Docs. Toggle dark and light mode in the toolbar buttons above.
          </Text>
          <Story {...context} />
        </ThemeProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export const decorators = [withThemeProvider];
