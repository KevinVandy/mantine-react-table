import React, { useState } from 'react';
import {
  Anchor,
  ColorSchemeProvider,
  Flex,
  MantineProvider,
  Select,
  Stack,
  Text,
} from '@mantine/core';
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
  const colorScheme = useDarkMode() ? 'dark' : 'light';
  const [primaryColor, setPrimaryColor] = useState('blue');
  const mantineColors = [
    'dark',
    'gray',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
  ];

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={() => { }}>
      <MantineProvider
        theme={{ colorScheme, primaryColor }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Flex justify="space-between">
          <Stack>
            <Text
              sx={{
                paddingBottom: '0.5rem',
                color: useDarkMode() ? '#fff' : '#666',
              }}
            >
              Looking for the main docs site? Click{' '}
              <Anchor
                underline
                href="https://www.mantine-react-table.com"
                target="_blank"
                rel="noopener"
              >
                here.
              </Anchor>
            </Text>
            <Text
              sx={{
                paddingBottom: '1rem',
                color: useDarkMode() ? '#fff' : '#666',
              }}
            >
              View source code below in the story tab on Canvas or the Show Code
              Button in Docs. Toggle dark and light mode in the toolbar buttons
              above.
            </Text>
          </Stack>
          <Select
            label="Primary Color"
            data={mantineColors}
            value={primaryColor}
            onChange={setPrimaryColor}
          />
        </Flex>
        <Story {...context} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export const decorators = [withThemeProvider];
