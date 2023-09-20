import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ReactQueryExample from '../examples/react-query';
import RemoteExample from '../examples/remote';
import { useState } from 'react';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const RemoteFetching = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('react-query');

  return (
    <>
      <Box style={{ width: '100%', marginTop: '1rem' }}>
        <Tabs
          value={isPage ? pathname.split('/').pop() : activeTab}
          onTabChange={(newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
          keepMounted={false}
        >
          <Tabs.List>
            <Tabs.Tab value="react-query">React Query</Tabs.Tab>
            <Tabs.Tab value="remote">useEffect</Tabs.Tab>
            <Link href="/docs/examples">
              <Tabs.Tab value="more">
                More Examples <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
          </Tabs.List>
          <Tabs.Panel value="react-query">
            <ReactQueryExample />
          </Tabs.Panel>
          <Tabs.Panel value="remote">
            <RemoteExample />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default RemoteFetching;
