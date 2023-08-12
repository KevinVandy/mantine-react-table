//Import Mantine React Table and its Types
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_AR } from 'mantine-react-table/locales/ar';

//mock data
import { data, type Person } from './makeData';
import { MantineProvider, useMantineTheme } from '@mantine/core';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'الاسم الأول',
  },
  {
    accessorKey: 'lastName',
    header: 'اسم العائلة',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'عمر',
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
          enablePinning
          enableRowActions
          enableRowSelection
          enableSelectAll={false}
          initialState={{ showColumnFilters: true, showGlobalFilter: true }}
          localization={MRT_Localization_AR}
        />
      </div>
    </MantineProvider>
  );
};

export default Example;
