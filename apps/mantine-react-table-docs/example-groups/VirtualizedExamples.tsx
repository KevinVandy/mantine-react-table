import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import Virtualized from '../examples/virtualized';
import VirtualizedWithScrollArea from '../examples/virtualized-with-scroll-area';
import InfiniteScrollingNativeScroll from '../examples/infinite-scrolling';
import InfiniteScrollingWithScrollArea from '../examples/infinite-scrolling-with-scroll-area';
import { useState } from 'react';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const InfiniteScrollingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('infinite-scrolling');

  return (
    <>
      <Box style={{ width: '100%', marginTop: '1rem' }}>
        <Tabs
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
          keepMounted={false}
        >
          <Tabs.List>
            <Tabs.Tab value="virtualized">Virtualization</Tabs.Tab>
            <Tabs.Tab value="virtualized-with-scroll-area">Virtualization with ScrollArea</Tabs.Tab>
            <Tabs.Tab value="infinite-scrolling">Infinite Scrolling with Native Scroll</Tabs.Tab>
            <Tabs.Tab value="infinite-scrolling-with-scroll-area">Infinite Scrolling with ScrollArea</Tabs.Tab>
            <Link href="/docs/examples">
              <Tabs.Tab value="more">
                More Examples <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
          </Tabs.List>
          <Tabs.Panel value="virtualized">
            <Virtualized />
          </Tabs.Panel>
          <Tabs.Panel value="virtualized-with-scroll-area">
            <VirtualizedWithScrollArea />
          </Tabs.Panel>
          <Tabs.Panel value="infinite-scrolling">
            <InfiniteScrollingNativeScroll />
          </Tabs.Panel>
          <Tabs.Panel value="infinite-scrolling-with-scroll-area">
            <InfiniteScrollingWithScrollArea />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default InfiniteScrollingExamples;
