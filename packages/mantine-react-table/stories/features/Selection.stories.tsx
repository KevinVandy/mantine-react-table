import { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import {
  type MRT_ColumnDef,
  MRT_SelectCheckbox,
  MantineReactTable,
  getMRT_RowSelectionHandler,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';
import { IconSend, IconTrash } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Features/Selection Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(15)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const SelectionEnabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableRowSelection
  />
);

export const SelectionEnabledGrid = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableRowSelection
    layoutMode="grid"
  />
);

export const SelectionEnabledGridNoGrow = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableRowSelection
    layoutMode="grid-no-grow"
  />
);

export const BatchSelectionDisabled = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableBatchRowSelection={false}
    enableRowNumbers
    enableRowSelection
  />
);

export const SelectionEnabledConditionally = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
  />
);

export const SelectionEnabledConditionallyWithInitial = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
    initialState={{
      rowSelection: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
      },
    }}
  />
);

export const SelectionEnabledWithRowClick = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    mantineTableBodyRowProps={({ renderedRowIndex, row, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler()({ event, renderedRowIndex, row, table }),
      style: {
        cursor: 'pointer',
        userSelect: 'none',
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
        style: {
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
    enableMultiRowSelection={false}
    enableRowSelection
  />
);

export const SingleSelectionRadioWithRowClick = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableMultiRowSelection={false}
    enableRowSelection
    mantineTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      style: {
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
    mantineToolbarAlertBannerProps={{
      color: 'cyan',
    }}
    positionToolbarAlertBanner="head-overlay"
    renderToolbarAlertBannerContent={({ selectedAlert, table }) => (
      <Flex justify="space-between">
        <Flex gap="xl" p="6px">
          <MRT_SelectCheckbox table={table} /> {selectedAlert}{' '}
        </Flex>
        <Flex gap="md">
          <Button color="blue" leftSection={<IconSend />}>
            Email Selected
          </Button>
          <Button color="red" leftSection={<IconTrash />}>
            Remove Selected
          </Button>
        </Flex>
      </Flex>
    )}
  />
);
