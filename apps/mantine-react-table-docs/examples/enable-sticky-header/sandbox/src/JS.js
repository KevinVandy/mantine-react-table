import React, { useMemo } from 'react';
import MantineReactTable from 'mantine-react-table';
import { ContentCopy } from '@mui/icons-material';
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
        accessorKey: 'email',
        header: 'Email',
        enableClickToCopy: true,
        mantineCopyButtonProps: {
          fullWidth: true,
          leftIcon: <ContentCopy />,
          sx: { justifyContent: 'flex-start' },
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
  );

  return <MantineReactTable columns={columns} data={data} />;
};

export default Example;
