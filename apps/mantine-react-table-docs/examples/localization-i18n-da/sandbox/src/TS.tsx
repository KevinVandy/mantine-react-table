import React, { FC } from 'react';

//Import Mantine React Table and its Types
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_DA } from 'mantine-react-table/locales/da';

//mock data
import { data, Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Fornavn',
  },
  {
    accessorKey: 'lastName',
    header: 'Efternavn',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Alder',
  },
  //end
];

const Example: FC = () => {
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
      localization={MRT_Localization_DA}
    />
  );
};

export default Example;
