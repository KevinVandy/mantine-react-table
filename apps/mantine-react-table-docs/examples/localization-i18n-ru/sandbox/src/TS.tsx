import React, { FC } from 'react';

//Import Mantine React Table and its Types
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_RU } from 'mantine-react-table/locales/ru';

//mock data
import { data, Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Имя',
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Возраст',
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
      localization={MRT_Localization_RU}
    />
  );
};

export default Example;
