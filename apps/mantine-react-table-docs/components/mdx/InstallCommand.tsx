import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { SampleCodeSnippet } from './SampleCodeSnippet';

const defaultPackagesString =
  'mantine-react-table @mantine/core@6.0.21 @mantine/hooks@6.0.21 @mantine/dates@6.0.21 @emotion/react @tabler/icons-react dayjs';

export const InstallCommand = ({
  packagesString = defaultPackagesString,
  ...rest
}) => {
  const [tab, setTab] = useState<string | null>('npm');

  return (
    <>
      <Tabs value={tab} onTabChange={setTab}>
        <Tabs.List {...rest}>
          <Tabs.Tab value="npm">NPM</Tabs.Tab>
          <Tabs.Tab value="pnpm">PNPM</Tabs.Tab>
          <Tabs.Tab value="yarn">Yarn</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <SampleCodeSnippet
        className="language-bash"
        style={{ overflowX: 'hidden' }}
      >
        {tab === 'npm'
          ? `npm i ${packagesString}`
          : tab === 'pnpm'
          ? `pnpm add ${packagesString}`
          : `yarn add ${packagesString}`}
      </SampleCodeSnippet>
    </>
  );
};
