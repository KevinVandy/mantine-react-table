import React, { useEffect, useState } from 'react';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import {
  Anchor,
  ColorSchemeScript,
  Flex,
  MantineProvider,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useDarkMode() ? 'dark' : 'light';
      const [primaryColor, setPrimaryColor] = useState<string>('blue');
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

      useEffect(() => {
        const sbRoot = document.getElementsByClassName(
          'sb-show-main',
        )[0] as HTMLElement;
        if (sbRoot) {
          sbRoot.style.backgroundColor =
            colorScheme === 'dark' ? '#333' : '#fff';
        }
      }, [useDarkMode()]);

      useEffect(() => {
        if (process.env.NODE_ENV === 'development') return;
        const script = document.createElement('script');
        script.src = 'https://plausible.io/js/script.js';
        script.setAttribute('data-domain', 'mantine-react-table.dev');
        script.defer = true;

        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

      return (
        <MantineProvider
          forceColorScheme={colorScheme}
          theme={{ colorScheme, primaryColor }}
        >
          <ColorSchemeScript forceColorScheme={colorScheme} />
          <Flex justify="space-between">
            <Stack>
              <Text
                style={{
                  paddingBottom: '8px',
                  color: useDarkMode() ? '#fff' : '#666',
                }}
              >
                Looking for the main docs site? Click{' '}
                <Anchor
                  underline="always"
                  href="https://www.mantine-react-table.com"
                  target="_blank"
                  rel="noopener"
                >
                  here.
                </Anchor>
              </Text>
              <Text
                style={{
                  paddingBottom: '16px',
                  color: useDarkMode() ? '#fff' : '#666',
                }}
              >
                View source code below in the story tab on Canvas or the Show
                Code Button in Docs. Toggle dark and light mode in the toolbar
                buttons above.
              </Text>
            </Stack>
            <Select
              label="Primary Color"
              data={mantineColors}
              value={primaryColor}
              onChange={(value) => setPrimaryColor(value as string)}
            />
          </Flex>
          <Story {...context} />
        </MantineProvider>
      );
    },
  ],
};

export default preview;
