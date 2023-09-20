import { useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ],
    [],
  );

  //optionally, you can manage the row selection state yourself
  const [rowSelection, setRowSelection] = useState({});

  const table = useMantineReactTable({
    columns,
    data,
    enableMultiRowSelection: false, //use radio buttons instead of checkboxes
    enableRowSelection: true,
    positionToolbarAlertBanner: 'none', //don't show the toolbar alert banner
    getRowId: (row) => row.userId, //give each row a more useful id
    mantineTableBodyRowProps: ({ row }) => ({
      //add onClick to row to select upon clicking anywhere in the row
      onClick: row.getToggleSelectedHandler(),
      style: { cursor: 'pointer' },
    }),
    onRowSelectionChange: setRowSelection, //connect internal row selection state to your own
    state: { rowSelection }, //pass our managed row selection state to the table to use
  });

  return <MantineReactTable table={table} />;
};

export default Example;
