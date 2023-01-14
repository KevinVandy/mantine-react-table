import React from 'react';
import { Meta, Story } from '@storybook/react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
  MRT_ToggleFullScreenButton,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { Box, Button, ActionIcon, Tooltip, Title } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(5)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.number(),
}));

export const ToolbarEnabledDefault: Story<MantineReactTableProps> = () => (
  <MantineReactTable columns={columns} data={data} enableRowSelection />
);

export const TopToolbarHidden: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableTopToolbar={false}
  />
);

export const BottomToolbarHidden: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableBottomToolbar={false}
  />
);

export const NoToolbars: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableTopToolbar={false}
    enableBottomToolbar={false}
  />
);

export const HideToolbarInternalActions: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableToolbarInternalActions={false}
  />
);

export const CustomToolbarInternalActions: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableGrouping
    renderToolbarInternalActions={({ table }) => {
      return (
        <>
          <MRT_ToggleFullScreenButton table={table} />
        </>
      );
    }}
  />
);

export const TableTitle: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      return <Title order={3}>Table Title</Title>;
    }}
  />
);

export const CustomTopToolbarActions: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip withArrow label="Create New User">
            <ActionIcon onClick={handleCreateNewUser}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const CustomBottomToolbarActions: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderBottomToolbarCustomActions={() => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };

      return (
        <div>
          <Tooltip withArrow label="Create New User">
            <ActionIcon onClick={handleCreateNewUser}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const CustomTopToolbarSelectionActions: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderTopToolbarCustomActions={({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            color="error"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="filled"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="filled"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleContact}
            variant="filled"
          >
            Contact
          </Button>
        </div>
      );
    }}
  />
);

export const CustomBottomToolbarSelectionActions: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    renderBottomToolbarCustomActions={({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.original.firstName);
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.original.firstName);
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.original.firstName);
        });
      };

      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            color="error"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeactivate}
            variant="filled"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleActivate}
            variant="filled"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleContact}
            variant="filled"
          >
            Contact
          </Button>
        </div>
      );
    }}
  />
);

export const ToolbarAlertBannerBottom: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderTopToolbarCustomActions={({ table }) => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };
      const handleRemoveUsers = () => {
        confirm('Are you sure you want to remove the selected users?');
      };

      return (
        <div>
          <Tooltip withArrow label="Create New User">
            <ActionIcon onClick={handleCreateNewUser}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label="Remove Users">
            <span>
              <ActionIcon
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleRemoveUsers}
              >
                <IconTrash />
              </ActionIcon>
            </span>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const ToolbarAlertBannerBottomWithActionsAlsoBottom: Story<
  MantineReactTableProps
> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
    renderBottomToolbarCustomActions={({ table }) => {
      const handleCreateNewUser = () => {
        prompt('Create new user modal');
      };
      const handleRemoveUsers = () => {
        confirm('Are you sure you want to remove the selected users?');
      };

      return (
        <div>
          <Tooltip withArrow label="Create New User">
            <ActionIcon onClick={handleCreateNewUser}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label="Remove Users">
            <span>
              <ActionIcon
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleRemoveUsers}
              >
                <IconTrash />
              </ActionIcon>
            </span>
          </Tooltip>
        </div>
      );
    }}
  />
);

export const renderCustomTopToolbar: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    renderTopToolbar={() => (
      <Box sx={{ padding: '2rem' }}>Custom Top Toolbar</Box>
    )}
  />
);

export const renderCustomBottomToolbar: Story<MantineReactTableProps> = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    renderBottomToolbar={() => (
      <Box sx={{ padding: '2rem' }}>Custom Bottom Toolbar</Box>
    )}
  />
);
