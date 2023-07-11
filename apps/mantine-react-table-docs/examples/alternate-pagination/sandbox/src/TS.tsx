import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { columns, data } from './makeData';

const Example = () => {
  const table = useMantineReactTable({
    columns,
    data,
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: 'pages',
  });

  return <MantineReactTable table={table} />;
};

export default Example;
