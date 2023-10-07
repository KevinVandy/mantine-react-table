# Mantine React Table <sup>V1</sup>

View the [Docs Site](https://www.mantine-react-table.com/)

An official fork of [Material React Table](https://www.material-react-table.com)

V1 released July 18, 2023

<a href="https://npmjs.com/package/mantine-react-table" target="_blank">
  <img alt="" src="https://badgen.net/npm/v/mantine-react-table?color=blue" />
</a>
<a href="https://npmtrends.com/mantine-react-table" target="_blank">
  <img alt="" src="https://badgen.net/npm/dt/mantine-react-table?label=installs&icon=npm&color=blue" />
</a>
<a href="https://bundlephobia.com/result?p=mantine-react-table" target="_blank">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/mantine-react-table@latest?color=blue" />
</a>
<a href="https://star-history.com/#kevinvandy/mantine-react-table&Date" target="_blank">
  <img alt="" src="https://badgen.net/github/stars/KevinVandy/mantine-react-table?color=blue" />
</a>
<a href="https://github.com/KevinVandy/mantine-react-table/blob/v1/LICENSE" target="_blank">
  <img alt="" src="https://badgen.net/github/license/KevinVandy/mantine-react-table?color=blue" />
</a>
<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

## About

### _Quickly Create React Data Tables with Mantine_

### __Built with [Mantine <sup>V6</sup>](https://mantine.dev/) and [TanStack Table <sup>V8</sup>](https://tanstack.com/table/v8)__

<img src="https://mantine-react-table.com/banner.png" alt="MRT" height="50"/>

## Learn More

- Join the [Discord](https://discord.gg/5wqyRx6fnm) server to join in on the development discussion or ask questions
- View the [Docs Website](https://www.mantine-react-table.com/)
- See all [Props, Options, and APIs](https://www.mantine-react-table.com/docs/api)

### Quick Examples

 - [Basic Table](https://www.mantine-react-table.com/docs/examples/basic/) (See Default Features)
 - [Minimal Table](https://www.mantine-react-table.com/docs/examples/minimal/) (Turn off Features like Pagination, Sorting, Filtering, and Toolbars)
 - [Advanced Table](https://www.mantine-react-table.com/docs/examples/advanced/) (See some of the Advanced Features)
 - [Aggregation/Grouping](https://www.mantine-react-table.com/docs/examples/aggregation-and-grouping/) (Aggregation features such as Sum, Average, Count, etc.)
 - [Data Export Table](https://www.mantine-react-table.com/docs/examples/data-export/) (Export to CSV, Excel, etc.)
 - [Editing CRUD Table](https://www.mantine-react-table.com/docs/examples/editing-crud/) (Create, Edit, and Delete Rows)
 - [Remote Data](https://www.mantine-react-table.com/docs/examples/remote/) (Server-side Pagination, Sorting, and Filtering)
 - [React Query](https://www.mantine-react-table.com/docs/examples/react-query/) (Server-side Pagination, Sorting, and Filtering, simplified)
 - [Virtualized Rows](https://www.mantine-react-table.com/docs/examples/virtualized/) (10,000 rows at once!)
 - [Infinite Scrolling](https://www.mantine-react-table.com/docs/examples/infinite-scrolling/) (Fetch data as you scroll)
 - [Localization (i18n)](https://www.mantine-react-table.com/docs/guides/localization#built-in-locale-examples) (Over a dozen languages built-in)

View additional [storybook examples](https://www.mantine-react-table.dev/)

## Features

_All features can easily be enabled/disabled_

_**Fully Fleshed out [Docs](https://www.mantine-react-table.com/docs/guides#guides) are available for all features**_

- [x] < 44kb gzipped - [Bundlephobia](https://bundlephobia.com/package/mantine-react-table)
- [x] Advanced TypeScript Generics Support (TypeScript Optional)
- [x] Aggregation and Grouping (Sum, Average, Count, etc.)
- [x] Click To Copy Cell Values
- [x] Column Action Dropdown Menu
- [x] Column Hiding
- [x] Column Ordering via Drag'n'Drop
- [x] Column Pinning (Freeze Columns)
- [x] Column Resizing
- [x] Customize Icons
- [x] Customize Styling of internal Mantine Components
- [x] Data Editing (4 different editing modes)
- [x] Density Toggle
- [x] Detail Panels (Expansion)
- [x] Filtering (supports client-side and server-side)
- [x] Filter Match Highlighting
- [x] Full Screen Mode
- [x] Global Filtering (Search across all columns, rank by best match)
- [x] Header Groups & Footers
- [x] Localization (i18n) support
- [x] Manage your own state or let the table manage it internally for you
- [x] Pagination (supports client-side and server-side)
- [x] Row Actions (Your Custom Action Buttons)
- [x] Row Numbers
- [x] Row Ordering via Drag'n'Drop
- [x] Row Selection (Checkboxes)
- [x] SSR compatible
- [x] Sorting (supports client-side and server-side)
- [x] Theming (Respects your Mantine Theme)
- [x] Toolbars (Add your own action buttons)
- [x] Tree Data / Expanding Sub-rows
- [x] Virtualization (@tanstack/react-virtual)

## Getting Started

### Installation

View the full [Installation Docs](https://www.mantine-react-table.com/docs/getting-started/install)

1. Ensure that you have React 17 or later installed

2. Install Peer Dependencies (Mantine V6 and Tabler Icons)

```bash
npm install @mantine/core @mantine/hooks @mantine/dates @emotion/react @tabler/icons-react dayjs
```

3. Install mantine-react-table

```bash
npm install mantine-react-table
```

> _`@tanstack/react-table`, `@tanstack/react-virtual`, `@tanstack/match-sorter-utils`,_ are internal dependencies, so you do NOT need to install them yourself.

### Usage

> Read the full usage docs [here](https://www.mantine-react-table.com/docs/getting-started/usage/)

```jsx
import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
]

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        mantineTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorFn: (row) => row.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: () => <i>Age</i>, //optional custom header render
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: true,
    enablePagination: false, //disable a default feature
    onRowSelectionChange: setRowSelection, //hoist row selection state to your state
    state: { rowSelection },
  });
  
  return <MantineReactTable table={table} />;
}
```

_Open in [Code Sandbox](https://codesandbox.io/s/simple-mantine-react-table-example-t5c3ji)_

## Contributors

<a href="https://github.com/kevinvandy/mantine-react-table/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kevinvandy/mantine-react-table" />
</a>

PRs are Welcome, but please discuss in [GitHub Discussions](https://github.com/KevinVandy/mantine-react-table/discussions) or the [Discord Server](https://discord.gg/5wqyRx6fnm) first if it is a large change!

Read the [Contributing Guide](https://github.com/KevinVandy/mantine-react-table/blob/v1/CONTRIBUTING.md) to learn how to run this project locally.

<!-- Use the FORCE Luke! -->
