import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
//Import Mantine React Table and its Types
import { MantineReactTable } from 'mantine-react-table';

//Import Mantine React Table Translations
import { MRT_Localization_KO } from 'mantine-react-table/locales/ko';

//mock data
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: '이름',
  },
  {
    accessorKey: 'lastName',
    header: '성',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: '나이',
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
      localization={MRT_Localization_KO}
    />
  );
};

export default Example;
