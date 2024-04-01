import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Tabs } from '@mantine/core';
import FilterVariantsExample from '../examples/customize-filter-variants';
import FacetedValuesExample from '../examples/enable-filter-facet-values';
import FilterModesExample from '../examples/customize-filter-modes';
import PopoverFiltersExample from '../examples/alternate-column-filtering';
import CustomFilteringUI from '../examples/custom-column-filtering-ui';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const FilteringExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'export-csv',
  );

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
            <Tabs.Tab value="filter-variants">Filter Variants</Tabs.Tab>
            <Tabs.Tab value="faceted-values">Faceted Values</Tabs.Tab>
            <Tabs.Tab value="filter-switching">Filter Switching</Tabs.Tab>
            <Tabs.Tab value="popover-filters">Popover Filters</Tabs.Tab>
            <Tabs.Tab value="custom-filter-ui">Custom Filter UI</Tabs.Tab>
            <Link href="/docs/examples/react-query">
              <Tabs.Tab value="more">
                Server-Side Filtering <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
          </Tabs.List>
          <Tabs.Panel value="filter-variants">
            <FilterVariantsExample />
          </Tabs.Panel>
          <Tabs.Panel value="faceted-values">
            <FacetedValuesExample />
          </Tabs.Panel>
          <Tabs.Panel value="filter-switching">
            <FilterModesExample />
          </Tabs.Panel>
          <Tabs.Panel value="popover-filters">
            <PopoverFiltersExample />
          </Tabs.Panel>
          <Tabs.Panel value="custom-filter-ui">
            <CustomFilteringUI />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default FilteringExamples;
