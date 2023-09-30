import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import ModalExample from '../examples/editing-crud-modal';
import InlineRowExample from '../examples/editing-crud-row';
import InlineCellExample from '../examples/editing-crud-cell';
import InlineTableExample from '../examples/editing-crud-table';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const EditingCRUD = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('editing-crud');

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
            <Tabs.Tab value="editing-crud">Modals</Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-row">Inline Row</Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-cell">
              Inline Cell (Double Click to Edit)
            </Tabs.Tab>
            <Tabs.Tab value="editing-crud-inline-table">
              Inline Table (All Rows Editable)
            </Tabs.Tab>
            <Link href="/docs/examples">
              <Tabs.Tab value="more">
                More Examples <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
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
