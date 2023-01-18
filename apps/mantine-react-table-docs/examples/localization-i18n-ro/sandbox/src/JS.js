import React from 'react';

//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_RO } from 'mantine-react-table/locales/ro';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Nume',
  },
  {
    accessorKey: 'lastName',
    header: 'Numele de familie',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vârstă',
  },
  //end
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
      localization={MRT_Localization_RO}
    />
  );
};

export default Example;
