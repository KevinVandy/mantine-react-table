import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { data, type Person } from './makeData';
import { Button } from '@mantine/core';

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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
  );

  const [progress, setProgress] = useState(0);

  //simulate random progress for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.random() * 20;
        return Math.min(oldProgress + newProgress, 100);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      mantineProgressProps={({ isTopToolbar }) => ({
        color: 'orange',
        variant: 'determinate', //if you want to show exact progress value
        value: progress, //value between 0 and 100
        style: {
          display: isTopToolbar ? 'block' : 'none', //hide bottom progress bar
        },
      })}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => setProgress(0)} variant="filled">
          Reset
        </Button>
      )}
      state={{ showProgressBars: true }}
    />
  );
};

export default Example;
