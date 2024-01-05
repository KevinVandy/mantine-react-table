import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';

//mock data
import { data } from './makeData';

const columns = [
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
      localization={MRT_Localization_VI}
    />
  );
};

export default Example;
