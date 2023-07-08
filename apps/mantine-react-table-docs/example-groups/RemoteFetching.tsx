import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ReactQueryExample from '../examples/react-query';
import RemoteExample from '../examples/remote';

const RemoteFetching = () => {
  const { pathname, push } = useRouter();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={pathname.split('/').pop()}
          onTabChange={(newPath) => push(newPath as string)}
          keepMounted={false}
        >
          <Tabs.List>
            <Tabs.Tab value="react-query">React Query</Tabs.Tab>
            <Tabs.Tab value="remote">useEffect</Tabs.Tab>
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
