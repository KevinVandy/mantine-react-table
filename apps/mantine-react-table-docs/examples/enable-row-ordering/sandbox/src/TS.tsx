import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';
import { data as initData, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
  );

  const [data, setData] = useState(() => initData);

  return (
    <MantineReactTable
      autoResetPageIndex={false}
      columns={columns}
      data={data}
      enableRowOrdering
      enableSorting={false}
      mantineRowDragHandleProps={({ table }) => ({
        onDragEnd: () => {
          const { draggingRow, hoveredRow } = table.getState();
          if (hoveredRow && draggingRow) {
            data.splice(
              (hoveredRow as MRT_Row<Person>).index,
              0,
              data.splice(draggingRow.index, 1)[0],
            );
            setData([...data]);
          }
        },
      })}
    />
  );
};

export default Example;
