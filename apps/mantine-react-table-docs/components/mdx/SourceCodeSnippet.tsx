import { FC, useState, useEffect } from 'react';
import { Box, Flex, Divider, Button } from '@mantine/core';
import { Prism } from '@mantine/prism';
import {
  IconBrandTypescript,
  IconBrandJavascript,
  IconApi,
  IconBrandGithub,
  IconBolt,
  IconBrandCodesandbox,
  IconExternalLink,
} from '@tabler/icons';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';

export interface Props {
  Component?: FC;
  apiCode?: string;
  javaScriptCode?: string;
  showCodeSandboxLink?: boolean;
  tableId: string;
  typeScriptCode: string;
}

export const SourceCodeSnippet: FC<Props> = ({
  Component,
  apiCode,
  javaScriptCode,
  showCodeSandboxLink = true,
  tableId,
  typeScriptCode,
}) => {
  const plausible = usePlausible();
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
      <Divider />
      {Component && (
        <>
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
            {showCodeSandboxLink && (
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
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button
                    color="green"
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
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button
                    color="yellow"
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
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button
                    color="blue"
                    rightIcon={<IconExternalLink />}
                    onClick={() => plausible('open-on-github')}
                    leftIcon={<IconBrandGithub />}
                    variant="outline"
                  >
                    Open on GitHub
                  </Button>
                </a>
              </Flex>
            )}
          </Box>
          <Component />
        </>
      )}
      <Flex sx={{ gap: '16px', flexWrap: 'wrap', flexDirection: 'column' }}>
        <LinkHeading tableId={tableId} order={4}>
          Source Code
        </LinkHeading>
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
            {apiCode && (
              <Prism.Tab value="api" icon={<IconApi />}>
                API
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
          {apiCode && (
            <Prism.Panel withLineNumbers language="typescript" value="api">
              {apiCode}
            </Prism.Panel>
          )}
        </Prism.Tabs>
      </Flex>
    </Box>
  );
};
