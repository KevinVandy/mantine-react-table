import React from 'react';

//Import Mantine React Table and its Types
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_FA } from 'mantine-react-table/locales/fa';

//mock data
import { data, Person } from './makeData';
import { MantineProvider, useMantineTheme } from '@mantine/core';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'نام',
  },
  {
    accessorKey: 'lastName',
    header: 'نام خانوادگی',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'سن',
  },
  //end
];

const Example = () => {
  const theme = useMantineTheme();
  return (
    <MantineProvider
      theme={{
        ...theme,
        dir: 'rtl',
      }}
    >
      <div style={{ direction: 'rtl' }}>
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
          localization={MRT_Localization_FA}
        />
      </div>
    </MantineProvider>
  );
};

export default Example;
