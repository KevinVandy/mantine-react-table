import React from 'react';

//Import Mantine React Table and its Types
import MantineReactTable from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_CS } from 'mantine-react-table/locales/cs';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Jméno',
  },
  {
    accessorKey: 'lastName',
    header: 'Příjmení',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Stáří',
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
      localization={MRT_Localization_CS}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { csCZ } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, csCZ)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;