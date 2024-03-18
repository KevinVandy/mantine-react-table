import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ExampleGrouping from '../examples/enable-column-grouping';
import MinimalExample from '../examples/minimal';
import AdvancedExample from '../examples/advanced';
import AggregationAndGroupingExample from '../examples/aggregation-and-grouping';
import CustomHeadlessExample from '../examples/custom-headless';

const ExpandingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('column-grouping');

  return (
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
          <Tabs.Tab value="column-grouping">Column Grouping</Tabs.Tab>
          <Tabs.Tab value="customized-grouping">Customized Grouping</Tabs.Tab>
          <Tabs.Tab value="aggregation-and-grouping">Aggregation</Tabs.Tab>
          <Tabs.Tab value="detail-panel">Detail Panel</Tabs.Tab>
          <Tabs.Tab value="chart-detail-panel">Chart Detail Panel</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="column-grouping">
          <ExampleGrouping showTopRow={isPage} />
        </Tabs.Panel>
        <Tabs.Panel value="customized-grouping">
          <MinimalExample showTopRow={isPage} />
        </Tabs.Panel>
        <Tabs.Panel value="detail-panel">
          <AdvancedExample showTopRow={isPage} />
        </Tabs.Panel>
        <Tabs.Panel value="detail-panel">
          <AggregationAndGroupingExample showTopRow={isPage} />
        </Tabs.Panel>
        <Tabs.Panel value="chart-detail-panel">
          <CustomHeadlessExample showTopRow={isPage} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default ExpandingExamples;
