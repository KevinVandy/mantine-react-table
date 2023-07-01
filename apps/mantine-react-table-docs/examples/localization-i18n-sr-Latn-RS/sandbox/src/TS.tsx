import React from 'react';

//Import Mantine React Table and its Types
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_SR_LATN_RS } from 'mantine-react-table/locales/sr-Latn-RS';

//mock data
import { data, Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'Име',
  },
  {
    accessorKey: 'lastName',
    header: 'Презиме',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Старост',
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
      localization={MRT_Localization_SR_LATN_RS}
    />
  );
};

export default Example;
