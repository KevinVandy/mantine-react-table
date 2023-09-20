import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import BasicExample from '../examples/basic';
import MinimalExample from '../examples/minimal';
import AdvancedExample from '../examples/advanced';
import AggregationAndGroupingExample from '../examples/aggregation-and-grouping';
import CustomHeadlessExample from '../examples/custom-headless';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const BasicExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <>
      <Box w={'100%'} mt={1}>
        <Tabs
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
          keepMounted={false}
        >
          <Tabs.List grow={!isPage}>
            <Tabs.Tab value="basic">Basic</Tabs.Tab>
            <Tabs.Tab value="minimal">Minimal</Tabs.Tab>
            <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
            <Tabs.Tab value="aggregation-and-grouping">
              Aggregation and Grouping
            </Tabs.Tab>
            <Tabs.Tab value="custom-headless">Custom Headless</Tabs.Tab>
            <Link href="/docs/examples">
              <Tabs.Tab value="more">
                More Examples <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
          </Tabs.List>
          <Tabs.Panel value="basic">
            <BasicExample showTopRow={isPage} />
          </Tabs.Panel>
          <Tabs.Panel value="minimal">
            <MinimalExample showTopRow={isPage} />
          </Tabs.Panel>
          <Tabs.Panel value="advanced">
            <AdvancedExample showTopRow={isPage} />
          </Tabs.Panel>
          <Tabs.Panel value="aggregation-and-grouping">
            <AggregationAndGroupingExample showTopRow={isPage} />
          </Tabs.Panel>
          <Tabs.Panel value="custom-headless">
            <CustomHeadlessExample showTopRow={isPage} />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default BasicExamples;
