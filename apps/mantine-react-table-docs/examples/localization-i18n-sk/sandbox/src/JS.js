//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_SK } from 'mantine-react-table/locales/sk';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'Meno',
  },
  {
    accessorKey: 'lastName',
    header: 'Priezvisko',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vek',
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
      localization={MRT_Localization_SK}
    />
  );
};

export default Example;
