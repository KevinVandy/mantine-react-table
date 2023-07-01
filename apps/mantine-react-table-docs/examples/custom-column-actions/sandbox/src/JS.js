import React, { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Menu, Divider } from '@mantine/core';

const data = [
  {
    id: 1,
    firstName: 'Dylan',
    lastName: 'Murray',
  },
  {
    id: 2,
    firstName: 'Raquel',
    lastName: 'Kohler',
  },
];

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        renderColumnActionsMenuItems: () => (
          <>
            <Menu.Item
              onClick={() => {
                console.log('Item 1 clicked');
              }}
            >
              Item 1
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                console.log('Item 2 clicked');
              }}
            >
              Item 2
            </Menu.Item>
          </>
        ),
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
          <>
            {internalColumnMenuItems}
            <Divider />
            <Menu.Item
              onClick={() => {
                console.log('Item 1 clicked');
              }}
            >
              Item 1
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                console.log('Item 2 clicked');
              }}
            >
              Item 2
            </Menu.Item>
          </>
        ),
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => (
          <>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
            <Divider />
            {internalColumnMenuItems}
          </>
        ),
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    //renderColumnActionsMenuItems //or you could define the menu items here for all columns
  });

  return <MantineReactTable table={table} />;
};

export default Example;
