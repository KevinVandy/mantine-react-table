import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_FI } from 'mantine-react-table/locales/fi';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'Etunimi',
  },
  {
    accessorKey: 'lastName',
    header: 'Sukunimi',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Ikä',
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
      enableColumnPinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_FI}
    />
  );
};

export default Example;
