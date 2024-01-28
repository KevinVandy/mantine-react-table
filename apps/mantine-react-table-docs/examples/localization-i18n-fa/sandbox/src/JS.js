import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_FA } from 'mantine-react-table/locales/fa';

//mock data
import { data } from './makeData';
import { MantineProvider, useMantineTheme } from '@mantine/core';

const columns = [
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
          enableColumnPinning
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
