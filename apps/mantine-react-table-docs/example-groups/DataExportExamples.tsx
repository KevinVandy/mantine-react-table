import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import CSVExport from '../examples/export-to-csv';
import PDFExport from '../examples/export-to-pdf';
import { useState } from 'react';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const RemoteFetching = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('export-csv');

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '1rem' }}>
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
            <Tabs.Tab value="export-csv">CSV</Tabs.Tab>
            <Tabs.Tab value="export-pdf">PDF</Tabs.Tab>
            <Link href="/docs/examples">
              <Tabs.Tab value="more">
                More Examples <IconExternalLink size="1rem" />
              </Tabs.Tab>
            </Link>
          </Tabs.List>
          <Tabs.Panel value="export-csv">
            <CSVExport />
          </Tabs.Panel>
          <Tabs.Panel value="export-pdf">
            <PDFExport />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default RemoteFetching;
