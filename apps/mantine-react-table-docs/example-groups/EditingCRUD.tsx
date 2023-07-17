import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ModalExample from '../examples/editing-crud-modal';
import InlineRowExample from '../examples/editing-crud-row';
import InlineCellExample from '../examples/editing-crud-cell';
import InlineTableExample from '../examples/editing-crud-table';

const EditingCRUD = () => {
  const { pathname, push } = useRouter();

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '1rem' }}>
        <Tabs
          value={pathname.split('/').pop()}
          onTabChange={(newPath) => push(newPath as string)}
          keepMounted={false}
        >
          <Tabs.List>
            <Tabs.Tab value="editing-crud">Modals</Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-row">Inline Row</Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-cell">
              Inline Cell (Double Click to Edit)
            </Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-table">
              Inline Table (All Rows Editable)
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="editing-crud">
            <ModalExample />
          </Tabs.Panel>
          <Tabs.Panel value="editing-crud-inline-row">
            <InlineRowExample />
          </Tabs.Panel>
          <Tabs.Panel value="editing-crud-inline-cell">
            <InlineCellExample />
          </Tabs.Panel>
          <Tabs.Panel value="editing-crud-inline-table">
            <InlineTableExample />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default EditingCRUD;
