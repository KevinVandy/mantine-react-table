import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ColumnOrdering from '../examples/enable-column-ordering';
import RowOrdering from '../examples/enable-row-ordering';
import RowDragging from '../examples/enable-row-dragging';
import { useState } from 'react';

const DraggingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'column-ordering',
  );
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
            <Tabs.Tab value="column-ordering">Column Ordering</Tabs.Tab>
            <Tabs.Tab value="row-ordering">Row Ordering</Tabs.Tab>
            <Tabs.Tab value="row-dragging">Row Dragging</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="column-ordering">
            <ColumnOrdering />
          </Tabs.Panel>
          <Tabs.Panel value="row-ordering">
            <RowOrdering />
          </Tabs.Panel>
          <Tabs.Panel value="row-dragging">
            <RowDragging />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default DraggingExamples;
