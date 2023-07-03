//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_DE } from 'mantine-react-table/locales/de';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'Vorname',
  },
  {
    accessorKey: 'lastName',
    header: 'Nachname',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Das Alter',
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
      localization={MRT_Localization_DE}
    />
  );
};

export default Example;
