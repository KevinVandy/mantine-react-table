import React, { FC, useMemo, useState } from 'react';
import MantineReactTable, {
  MantineReactTableProps,
  MRT_ColumnDef,
  MRT_Row,
} from 'mantine-react-table';
import { Box, Title } from '@mantine/core';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
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
    //end
  );

  const [data1, setData1] = useState<Person[]>(() => data.slice(0, 3));
  const [data2, setData2] = useState<Person[]>(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState<MRT_Row<Person> | null>(null);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const commonTableProps: Partial<MantineReactTableProps<Person>> & {
    columns: MRT_ColumnDef<Person>[];
  } = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    mantineTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'auto', lg: '1fr 1fr' },
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
          sx: {
            outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Title color="green" order={4}>
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
          sx: {
            outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Title color="red" order={4}>
            Naughty List
          </Title>
        )}
      />
    </Box>
  );
};

export default Example;
