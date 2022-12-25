import React, { FC } from 'react';

//Import Mantine React Table and its Types
import MantineReactTable, { MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_EN } from 'mantine-react-table/locales/en';

//mock data
import { data, Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Age',
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
      localization={MRT_Localization_EN}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { enUS } from '@mui/material/locale';

const ExampleWithThemeProvider: FC = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, enUS)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
