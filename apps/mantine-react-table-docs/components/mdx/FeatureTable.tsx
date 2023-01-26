import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';
import React from 'react';

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    id: 'feature',
    accessorKey: 'feature',
    header: 'Feature',
  },
  {
    accessorKey: 'mrt',
    header: 'Mantine React Table',
    mantineTableHeadCellProps: {
      align: 'center',
      sx: (theme) => ({
        color: getPrimaryColor(theme),
      }),
    },
    mantineTableBodyCellProps: {
      align: 'center',
    },
    Cell: ({ cell }) =>
      cell.getValue() === true ? '✅' : cell.getValue() === false ? '❌' : '⚠️',
  },
  {
    accessorKey: 'mdt',
    header: 'Mantine DataTable',
    mantineTableHeadCellProps: {
      align: 'center',
    },
    mantineTableBodyCellProps: {
      align: 'center',
    },
    Cell: ({ cell }) =>
      cell.getValue() === true ? '✅' : cell.getValue() === false ? '❌' : '⚠️',
  },
];

const data = [
  {
    feature: 'Click to copy',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Action Dropdown',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column/Row Grouping and Aggregation',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Hiding',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Ordering (DnD)',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Pinning (Freezing)',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Resizing',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Column Spanning',
    mrt: false,
    mdt: false,
  },
  {
    feature: 'Column Virtualization',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Custom Icons',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Data Editing',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Density Toggle',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Detail Panels',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Export to CSV',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Filtering',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Filter Modes',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Fullscreen Mode',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Global Filtering Search',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Header Groups and Footers',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Localization (i18n)',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Manage your own state',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Pagination',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Row Action Buttons',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Row Context Menu',
    mrt: false,
    mdt: true,
  },
  {
    feature: 'Row Numbers',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Row Ordering (DnD)',
    mrt: true,
    mdt: false,
  },
  {
    feature: 'Row Selection',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'SSR Compatibility',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Sorting',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Theming',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Customize Toolbars',
    mrt: true,
    mdt: null,
  },
  {
    feature: 'Expanding Rows (Tree Data)',
    mrt: true,
    mdt: true,
  },
  {
    feature: 'Virtualization',
    mrt: true,
    mdt: false,
  },
];

export const FeatureTable = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enablePagination={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      enablePinning
      initialState={{
        sorting: [{ id: 'feature', desc: false }],
        density: 'xs',
        columnPinning: { left: ['feature'] },
      }}
    />
  );
};
