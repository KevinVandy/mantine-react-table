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
