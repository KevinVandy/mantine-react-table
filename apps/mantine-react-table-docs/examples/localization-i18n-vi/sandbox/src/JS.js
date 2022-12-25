import React from 'react';

//Import Mantine React Table and its Types
import MantineReactTable from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';

//mock data
import { data } from './makeData';

const columns = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Họ của người nào',
  },
  {
    accessorKey: 'lastName',
    header: 'Tên họ',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Tuổi tác',
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
      localization={MRT_Localization_VI}
    />
  );
};

//App.tsx or similar
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { trTR } from '@mui/material/locale';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, trTR)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
