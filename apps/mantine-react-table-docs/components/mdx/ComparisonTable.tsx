import { Box, Anchor } from '@mantine/core';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'library',
    header: 'Library',
    size: 250,
    Cell: ({ cell, row }) => (
      <Anchor
        href={row.original.libraryLink}
        target="_blank"
        rel="noopener"
        sx={(theme) => ({
          color:
            cell.getValue() === 'Mantine React Table'
              ? getPrimaryColor(theme)
              : cell.getValue() === 'TanStack Table (React Table)'
              ? theme.colors.blue[7]
              : theme.colorScheme === 'dark'
              ? theme.white
              : theme.black,
          fontWeight: 'bold',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        })}
      >
        <>{cell.getValue()}</>
      </Anchor>
    ),
  },
  {
    accessorKey: 'freeOrLicensed',
    header: 'Free or Licensed',
    size: 80,
  },
  {
    accessorKey: 'bundleSize',
    header: 'Bundle Size',
    Cell: ({ cell, row }) => (
      <Box sx={{ display: 'flex', alignContent: 'center', gap: '1ch' }}>
        {`${cell.getValue<string>()} KB`}
        <a href={row.original.bundlePhobiaLink} target="_blank" rel="noopener">
          <img
            alt={cell.getValue<string>()}
            src={row.original.bundlePhobiaImg}
          />
        </a>
      </Box>
    ),
    size: 250,
    sortDescFirst: false,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 500,
  },
];

const data = [
  {
    library: 'Mantine React Table',
    libraryLink: '#',
    freeOrLicensed: 'Free MIT',
    bundleSize: 45,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/mantine-react-table@latest?color=blue',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/mantine-react-table@latest',
    description:
      'Built on top of TanStack Table V8 and Mantine V6, Mantine React Table (MRT) is a batteries-included React table library that attempts to provide all the table features you need while trying to stay highly performant and relatively lightweight. Customization is treated as a top priority to let you override any styles you need to change. Mantine React Table was forked from Material React Table and is being built in 2023.',
  },
  {
    library: 'Mantine DataTable',
    libraryLink: 'https://icflorescu.github.io/mantine-datatable',
    freeOrLicensed: 'Free MIT',
    bundleSize: 10,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/mantine-datatable?color=green',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/mantine-datatable@latest',
    description:
      "A very close to stock feeling Mantine Data Table component. It is a pretty lightweight library and is more so an extra wrapper for Mantine's built-in Table component, but with way more props, features, and styles built-in. Even though it is so lightweight, the filtering, pagination, sorting, and selection features that come with it might be enough for a lot of projects.",
  },
  {
    library: 'Mantine Data Grid',
    libraryLink: 'https://kuechlin.github.io/mantine-data-grid/#/',
    freeOrLicensed: 'Free MIT',
    bundleSize: 23,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/mantine-data-grid?color=orange',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/mantine-data-grid@latest',
    description:
      'Mantine Data Grid is another project that is being built on top of both Mantine and TanStack Table. It seems to be a smaller project, and it is unclear if it will be as feature-rich or viable as other options on this list, but it is worth keeping an eye on.',
  },
  {
    library: 'TanStack Table (React Table)',
    libraryLink: 'https://tanstack.com/table',
    freeOrLicensed: 'Free MIT',
    bundleSize: 13,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/@tanstack/react-table@latest',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/@tanstack/react-table@latest',
    description:
      'TanStack Table (formerly React Table) is a lightweight Headless UI library for building powerful tables and datagrids. No CSS or components included. You use logic from the useReactTable hook to build your own table components. No batteries included, but you get total control of your markup and styles (Mantine React Table is built on top of TanStack Table).',
  },
  {
    library: 'AG Grid Community/Enterprise',
    libraryLink: 'https://www.ag-grid.com/license-pricing',
    freeOrLicensed: 'MIT or Paid License',
    bundleSize: 271,
    bundlePhobiaImg:
      'https://badgen.net/bundlephobia/minzip/ag-grid-enterprise?color=red',
    bundlePhobiaLink:
      'https://bundlephobia.com/package/ag-grid-enterprise@latest',
    description:
      'If you are looking for the best data grid/table library possible, look no further than AG Grid. It may not exactly be lightweight or made from Mantine components, but it is the best of the best. It does have some drawbacks, as it has a very large bundle size and depending on your feature needs, it may require a paid license.',
  },
];

export const ComparisonTable = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enablePagination={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
    />
  );
};
