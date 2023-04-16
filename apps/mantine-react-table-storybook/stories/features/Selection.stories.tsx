import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
} from 'mantine-react-table';
import { faker } from '@faker-js/faker';
import { Button } from '@mantine/core';

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
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
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

export const SelectCheckboxSecondaryColor = () => (
  <MantineReactTable
    columns={columns}
    data={data}
    enableRowSelection
    mantineSelectCheckboxProps={{ color: 'orange' }}
  />
);

export const SelectionWithInstanceRef = () => {
  const tableInstanceRef = useRef<MRT_TableInstance<(typeof data)[0]>>(null);

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowSelection
      tableInstanceRef={tableInstanceRef}
      renderTopToolbarCustomActions={() => (
        <Button
          onClick={() =>
            console.info(tableInstanceRef.current?.getSelectedRowModel().rows)
          }
        >
          Log Selected Rows
        </Button>
      )}
    />
  );
};
