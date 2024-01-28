import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  MRT_TableOptions,
  MRT_ColumnDef,
  MRT_Row,
} from 'mantine-react-table';
import { Box, Title } from '@mantine/core';
import { data, type Person } from './makeData';
import { useMediaQuery } from '@mantine/hooks';

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

  const [data1, setData1] = useState<Person[]>(() => data.slice(0, 3));
  const [data2, setData2] = useState<Person[]>(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const isMobile = useMediaQuery(`(max-width: 960px)`);

  const commonTableProps: Partial<MRT_TableOptions<Person>> & {
    columns: MRT_ColumnDef<Person>[];
  } = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    mantineTableContainerProps: {
      style: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'auto' : '1fr 1fr',
        gap: '16px',
        overflow: 'auto',
        padding: '4px',
      }}
    >
      <MantineReactTable
        {...commonTableProps}
        data={data1}
        getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-2') {
              setData2((data2) => [...data2, draggingRow!.original]);
              setData1((data1) =>
                data1.filter((d) => d !== draggingRow!.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        mantinePaperProps={{
          onDragEnter: () => setHoveredTable('table-1'),
          style: {
            outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Title c="green" order={4}>
            Nice List
          </Title>
        )}
      />
      <MantineReactTable
        {...commonTableProps}
        data={data2}
        defaultColumn={{
          size: 100,
        }}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-1') {
              setData1((data1) => [...data1, draggingRow!.original]);
              setData2((data2) =>
                data2.filter((d) => d !== draggingRow!.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        mantinePaperProps={{
          onDragEnter: () => setHoveredTable('table-2'),
          style: {
            outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Title c="red" order={4}>
            Naughty List
          </Title>
        )}
      />
    </Box>
  );
};

export default Example;
