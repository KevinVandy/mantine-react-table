import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Select,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import {
  IconBrandTypescript,
  IconBrandJavascript,
  IconApi,
  IconBrandGithub,
  IconBolt,
  IconBrandCodesandbox,
  IconExternalLink,
  IconCode,
  IconBrandCss3,
} from '@tabler/icons-react';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';
import { useThemeContext } from '../../styles/ThemeContext';
import { type MantineShade } from 'mantine-react-table';
import classes from './SourceCodeSnippet.module.css';

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
  cssCode?: string;
  javaScriptCode?: string;
  legacyCode?: string;
  tableId: string;
  typeScriptCode: string;
  showTopRow?: boolean;
}

export const SourceCodeSnippet = ({
  Component,
  apiCode,
  cssCode,
  javaScriptCode,
  legacyCode,
  tableId,
  typeScriptCode,
  showTopRow = true,
}: Props) => {
  const plausible = usePlausible();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const {
    primaryColor,
    setPrimaryColor,
    primaryShade,
    setPrimaryShade,
    darkDark,
    setDarkDark,
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

  function filterUndefined<TValue>(value: TValue | undefined): value is TValue {
    if (value === null || value === undefined) return false;
    return true;
  }

  return (
    <Box className={classes.wrapper}>
      {Component && (
        <>
          {showTopRow && (
            <Box className={classes.topRow}>
              <LinkHeading tableId={tableId} order={4}>
                Demo
              </LinkHeading>
              <Box className={classes.wrapper2}>
                <Flex className={classes.topRowLeft}>
                  <a
                    href={`https://stackblitz.com/github/KevinVandy/mantine-react-table/tree/main/apps/mantine-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
                    rel="noopener"
                    target="_blank"
                  >
                    <Button
                      color="green.7"
                      leftSection={<IconBolt />}
                      onClick={() => plausible('open-stackblitz')}
                      rightSection={<IconExternalLink />}
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
                      leftSection={<IconBrandCodesandbox />}
                      onClick={() => plausible('open-code-sandbox')}
                      rightSection={<IconExternalLink />}
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
                      rightSection={<IconExternalLink />}
                      onClick={() => plausible('open-on-github')}
                      leftSection={<IconBrandGithub />}
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
                      /*Hack for a weird SSG error in which primaryShade is not available (it is undefined) so hydration/compiling breaks*/
                      value={(primaryShade ?? 7).toString()}
                      onChange={(value) => {
                        setPrimaryShade(+(value as string) as MantineShade);
                        plausible('change-shade');
                      }}
                      className={classes.primaryShadeSelect}
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
                      className={classes.primaryColorSelect}
                    />
                  </Tooltip>
                  <Tooltip label="Select Theme Color Scheme">
                    <Select
                      aria-label="Select light/dark theme"
                      data={[
                        {
                          label: 'Light',
                          value: 'light',
                        },
                        {
                          label: 'Dark 1',
                          value: 'dark',
                        },
                        {
                          label: 'Dark 2',
                          value: 'darkDark',
                        },
                      ]}
                      value={darkDark ? 'darkDark' : colorScheme}
                      onChange={(value) => {
                        setColorScheme(
                          value?.startsWith('dark') ? 'dark' : 'light',
                        );
                        value === 'darkDark'
                          ? setDarkDark(true)
                          : setDarkDark(false);
                        plausible(`toggle-theme-${value}-mode`);
                      }}
                      className={classes.colorSchemeSelect}
                    />
                  </Tooltip>
                </Flex>
              </Box>
            </Box>
          )}
          <Component />
        </>
      )}
      <CodeHighlightTabs
        code={[
          {
            fileName: 'TS',
            code: typeScriptCode,
            language: 'tsx',
            icon: <IconBrandTypescript />,
          },
          javaScriptCode
            ? {
                fileName: 'JS',
                code: javaScriptCode,
                language: 'jsx',
                icon: <IconBrandJavascript />,
              }
            : undefined,
          cssCode
            ? {
                fileName: 'CSS',
                code: cssCode,
                language: 'css',
                icon: <IconBrandCss3 />,
              }
            : undefined,
          legacyCode
            ? {
                fileName: 'Legacy',
                code: legacyCode,
                language: 'tsx',
                icon: <IconCode />,
              }
            : undefined,
          apiCode
            ? {
                fileName: 'API',
                code: apiCode,
                language: 'typescript',
                icon: <IconApi />,
              }
            : undefined,
        ].filter(filterUndefined)}
      />
    </Box>
  );
};
