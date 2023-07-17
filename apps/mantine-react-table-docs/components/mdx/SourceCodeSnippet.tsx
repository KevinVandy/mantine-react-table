import { useState, useEffect } from 'react';
import { Box, Flex, Divider, Button, Select, Tooltip } from '@mantine/core';
import { Prism } from '@mantine/prism';
import {
  IconBrandTypescript,
  IconBrandJavascript,
  IconApi,
  IconBrandGithub,
  IconBolt,
  IconBrandCodesandbox,
  IconExternalLink,
  IconCode,
} from '@tabler/icons-react';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';
import { useThemeContext } from '../../styles/ThemeContext';
import { type MantineShade } from 'mantine-react-table';

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

export interface Props {
  Component?;
  apiCode?: string;
  javaScriptCode?: string;
  legacyCode?: string;
  tableId: string;
  typeScriptCode: string;
  showTopRow?: boolean;
}

export const SourceCodeSnippet = ({
  Component,
  apiCode,
  javaScriptCode,
  legacyCode,
  tableId,
  typeScriptCode,
  showTopRow = true,
}: Props) => {
  const plausible = usePlausible();
  const {
    primaryColor,
    setPrimaryColor,
    isLightTheme,
    setIsLightTheme,
    primaryShade,
    setPrimaryShade,
  } = useThemeContext();
  const [defaultTS, setDefaultTS] = useState(true);

  useEffect(
    () =>
      setDefaultTS(
        localStorage.getItem('defaultTS') === 'true' || !javaScriptCode,
      ),
    [javaScriptCode],
  );

  useEffect(
    () => localStorage.setItem('defaultTS', defaultTS.toString()),
    [defaultTS],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        margin: '2rem auto',
      }}
    >
      {Component && (
        <>
          {showTopRow && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <LinkHeading tableId={tableId} order={4}>
                Demo
              </LinkHeading>
              <Flex
                sx={{
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <Flex
                  sx={{
                    flexWrap: 'wrap',
                    gap: '16px',
                    '@media (max-width: 720px)': {
                      justifyContent: 'center',
                    },
                  }}
                >
                  <a
                    href={`https://stackblitz.com/github/KevinVandy/mantine-react-table/tree/main/apps/mantine-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
                    rel="noopener"
                    target="_blank"
                  >
                    <Button
                      color="green.7"
                      leftIcon={<IconBolt />}
                      onClick={() => plausible('open-stackblitz')}
                      rightIcon={<IconExternalLink />}
                      variant="outline"
                    >
                      Open Stackblitz
                    </Button>
                  </a>
                  <a
                    href={`https://codesandbox.io/s/github/KevinVandy/mantine-react-table/tree/main/apps/mantine-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
                    rel="noopener"
                    target="_blank"
                  >
                    <Button
                      color="yellow.7"
                      leftIcon={<IconBrandCodesandbox />}
                      onClick={() => plausible('open-code-sandbox')}
                      rightIcon={<IconExternalLink />}
                      variant="outline"
                    >
                      Open Code Sandbox
                    </Button>
                  </a>
                  <a
                    href={`https://github.com/KevinVandy/mantine-react-table/tree/main/apps/mantine-react-table-docs/examples/${tableId}/sandbox/src/${
                      defaultTS ? 'TS.tsx' : 'JS.js'
                    }`}
                    rel="noopener"
                    target="_blank"
                  >
                    <Button
                      color="blue.7"
                      rightIcon={<IconExternalLink />}
                      onClick={() => plausible('open-on-github')}
                      leftIcon={<IconBrandGithub />}
                      variant="outline"
                    >
                      Open on GitHub
                    </Button>
                  </a>
                </Flex>
                <Flex gap="1rem">
                  <Tooltip label="Select Theme Primary Shade">
                    <Select
                      aria-label="Select theme shade"
                      data={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
                      value={primaryShade.toString()}
                      onChange={(value) => {
                        setPrimaryShade(+(value as string) as MantineShade);
                        plausible('change-shade');
                      }}
                      sx={{ width: '65px' }}
                    />
                  </Tooltip>
                  <Tooltip label="Select Theme Primary Color">
                    <Select
                      aria-label="Select theme color"
                      data={mantineColors}
                      value={primaryColor}
                      onChange={(value) => {
                        setPrimaryColor(value as string);
                        plausible('change-primary-color');
                      }}
                      sx={{ width: '100px' }}
                    />
                  </Tooltip>
                  <Tooltip label="Select Theme Color Scheme">
                    <Select
                      aria-label="Select light/dark theme"
                      data={['light', 'dark']}
                      value={isLightTheme ? 'light' : 'dark'}
                      onChange={(value) => {
                        setIsLightTheme(value === 'light');
                        plausible(`toggle-theme-${value}-mode`);
                      }}
                      sx={{ width: '90px' }}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Box>
          )}
          <Component />
        </>
      )}
      <Prism.Tabs defaultValue={defaultTS ? 'ts' : 'js'}>
        <Prism.TabsList>
          <Prism.Tab value="ts" icon={<IconBrandTypescript />}>
            TypeScript
          </Prism.Tab>
          {javaScriptCode && (
            <Prism.Tab value="js" icon={<IconBrandJavascript />}>
              JavaScript
            </Prism.Tab>
          )}
          {legacyCode && (
            <Prism.Tab value="legacy" icon={<IconCode />}>
              Legacy Props API
            </Prism.Tab>
          )}
          {apiCode && (
            <Prism.Tab value="api" icon={<IconApi />}>
              Back-end API
            </Prism.Tab>
          )}
        </Prism.TabsList>
        <Prism.Panel withLineNumbers language="tsx" value="ts">
          {typeScriptCode}
        </Prism.Panel>
        {javaScriptCode && (
          <Prism.Panel withLineNumbers language="jsx" value="js">
            {javaScriptCode}
          </Prism.Panel>
        )}
        {legacyCode && (
          <Prism.Panel withLineNumbers language="tsx" value="legacy">
            {legacyCode}
          </Prism.Panel>
        )}
        {apiCode && (
          <Prism.Panel withLineNumbers language="typescript" value="api">
            {apiCode}
          </Prism.Panel>
        )}
      </Prism.Tabs>
    </Box>
  );
};
