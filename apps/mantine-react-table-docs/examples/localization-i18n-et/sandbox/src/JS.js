//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_ET } from 'mantine-react-table/locales/et';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'Eesnimi',
  },
  {
    accessorKey: 'lastName',
    header: 'Perekonnanimi',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Vanus',
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
      localization={MRT_Localization_ET}
    />
  );
};

export default Example;
