import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { columns, data } from './makeData';
import { Menu } from '@mantine/core';

export const Example = () => {
  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item onClick={() => console.info('Deactivate')}>
          Deactivate
        </Menu.Item>
        <Menu.Item onClick={() => console.info('Delete')}>Delete</Menu.Item>
      </>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default Example;
