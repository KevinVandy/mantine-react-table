import { useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { columns, data as initialData } from './makeData';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconSend, IconTrash } from '@tabler/icons-react';

export const Example = () => {
  const [data, setData] = useState(initialData);

  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="blue"
          onClick={() =>
            window.open(
              `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
            )
          }
        >
          <IconSend />
        </ActionIcon>
        <ActionIcon
          color="orange"
          onClick={() => {
            table.setEditingRow(row);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() => {
            data.splice(row.index, 1); //assuming simple data table
            setData([...data]);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default Example;
