import React from 'react';

//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_JA } from 'mantine-react-table/locales/ja';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'ファーストネーム',
  },
  {
    accessorKey: 'lastName',
    header: '苗字',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: '年',
  },
];

const Example = () => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableEditing
      enablePinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_JA}
    />
  );
};

export default Example;
