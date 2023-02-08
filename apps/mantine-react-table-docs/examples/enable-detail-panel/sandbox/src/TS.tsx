import React, { useMemo } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Box, Text } from '@mantine/core';
import { data, Person } from './makeData';

const Example = () => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'id',
          header: 'ID',
          size: 50,
        },
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'middleName',
          header: 'Middle Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          <Text>Address: {row.original.address}</Text>
          <Text>City: {row.original.city}</Text>
          <Text>State: {row.original.state}</Text>
          <Text>Country: {row.original.country}</Text>
        </Box>
      )}
    />
  );
};

export default Example;
