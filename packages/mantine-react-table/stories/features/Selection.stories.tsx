import { useState } from 'react';
import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  MRT_SelectCheckbox,
  type MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Button, Flex } from '@mantine/core';
import { IconSend, IconTrash } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Features/Selection Examples',
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
];
const data = [...Array(15)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(80),
  address: faker.location.streetAddress(),
}));

export const SelectionEnabled = () => (
  <MantineReactTable columns={columns} data={data} enableRowSelection />
);

export const SelectionEnabledConditionally = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
  />
);

export const SelectionEnabledWithRowClick = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    mantineTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    })}
  />
);

export const ManualSelection = () => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  console.info(rowSelection);

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      mantineTableBodyRowProps={({ row }) => ({
        onClick: () =>
          setRowSelection((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          })),
        selected: rowSelection[row.id],
        sx: {
          cursor: 'pointer',
        },
      })}
      state={{ rowSelection }}
    />
  );
};

export const SelectAllModeAll = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="all"
  />
);

export const SelectAllModeAllConditionally = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
    selectAllMode="all"
  />
);

export const SelectAllModePage = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="page"
  />
);

export const SelectAllDisabledCustomHeader = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-select': { header: 'Your Custom Header' },
    }}
    enableRowSelection
    enableSelectAll={false}
  />
);

export const SingleSelectionRadio = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableMultiRowSelection={false}
  />
);

export const SingleSelectionRadioWithRowClick = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableMultiRowSelection={false}
    mantineTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    })}
  />
);

export const SelectSwitch = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectDisplayMode="switch"
  />
);

export const SelectCheckboxSecondaryColor = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    mantineSelectCheckboxProps={{ color: 'orange' }}
  />
);

export const AlertBannerBottom = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
  />
);

export const AlertBannerHeadOverlay = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="head-overlay"
  />
);

export const CustomAlertBannerHeadOverlay = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="head-overlay"
    mantineToolbarAlertBannerProps={{
      color: 'cyan',
    }}
    renderToolbarAlertBannerContent={({ selectedAlert, table }) => (
      <Flex justify="space-between">
        <Flex p="6px" gap="xl">
          <MRT_SelectCheckbox selectAll table={table} /> {selectedAlert}{' '}
        </Flex>
        <Flex gap="md">
          <Button leftIcon={<IconSend />} color="blue">
            Email Selected
          </Button>
          <Button leftIcon={<IconTrash />} color="red">
            Remove Selected
          </Button>
        </Flex>
      </Flex>
    )}
  />
);
