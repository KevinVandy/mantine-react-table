import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import BasicExample from '../examples/basic';
import MinimalExample from '../examples/minimal';
import AdvancedExample from '../examples/advanced';
import AggregationAndGroupingExample from '../examples/aggregation-and-grouping';
import CustomHeadlessExample from '../examples/custom-headless';

const BasicExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '1rem' }}>
        <Tabs
          value={isPage ? pathname.split('/').pop() : activeTab}
          onTabChange={(newPath) =>
            isPage ? push(newPath as string) : setActiveTab(newPath as string)
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
