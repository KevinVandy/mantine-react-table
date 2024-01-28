import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { Box, Title } from '@mantine/core';
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
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
  );

  const [data1, setData1] = useState(() => data.slice(0, 3));
  const [data2, setData2] = useState(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  const commonTableProps = {
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
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        overflow: 'auto',
        padding: '4px',
        '@media (max-width: 960px)': {
          gridTemplateColumns: 'auto',
        },
      }}
    >
      <MantineReactTable
        {...commonTableProps}
        data={data1}
        defaultColumn={{
          size: 100,
        }}
        getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-2') {
              setData2((data2) => [...data2, draggingRow.original]);
              setData1((data1) =>
                data1.filter((d) => d !== draggingRow.original),
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
          <Title color="green" order={4}>
            Nice List
          </Title>
        )}
      />
      <MantineReactTable
        {...commonTableProps}
        data={data2}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-1') {
              setData1((data1) => [...data1, draggingRow.original]);
              setData2((data2) =>
                data2.filter((d) => d !== draggingRow.original),
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
          <Title color="red" order={4}>
            Naughty List
          </Title>
        )}
      />
    </Box>
  );
};

export default Example;
