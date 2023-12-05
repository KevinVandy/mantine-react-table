import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { SampleCodeSnippet } from './SampleCodeSnippet';

const packagesString =
  'mantine-react-table @mantine/core @mantine/hooks @mantine/dates @tabler/icons-react dayjs';

export function InstallCommand() {
  const tabValues = [
    {
      value: 'npm',
      label: 'NPM',
      command: `npm i ${packagesString}`,
    },
    {
      value: 'pnpm',
      label: 'PNPM',
      command: `pnpm add ${packagesString}`,
    },
    {
      value: 'yarn',
      label: 'Yarn',
      command: `yarn add ${packagesString}`,
    },
    {
      value: 'bun',
      label: 'Bun',
      command: `bun i ${packagesString}`,
    },
  ];

  return (
    <>
      <Tabs defaultValue="npm">
        <Tabs.List>
          {tabValues.map((tabValue) => (
            <Tabs.Tab key={tabValue.value} value={tabValue.value}>
              {tabValue.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabValues.map((tabValue) => (
          <Tabs.Panel key={tabValue.value} value={tabValue.value}>
            <SampleCodeSnippet
              className="language-bash"
              style={{ overflowX: 'hidden' }}
              code={tabValue.command}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
}
