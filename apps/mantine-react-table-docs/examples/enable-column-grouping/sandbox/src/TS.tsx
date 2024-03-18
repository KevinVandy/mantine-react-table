import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine component features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from 'mantine-react-table';
import { data, type Person } from './makeData';
import { Group, Radio, Stack, Text } from '@mantine/core';

type ColumnMode = 'false' | 'remove' | 'reorder';

const ExampleGrouping = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
      },
    ],
    [],
    //end
  );

  //demo state
  const [groupedColumnMode, setGroupedColumnMode] =
    useState<ColumnMode>('reorder'); //default is 'reorder

  const table = useMantineReactTable({
    columns,
    data,
    enableGrouping: true,
    groupedColumnMode:
      groupedColumnMode === 'false' ? false : groupedColumnMode,
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ['state', 'gender'], //an array of columns to group by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  });

  return (
    <Stack gap="1rem">
      <DemoRadioGroup
        groupedColumnMode={groupedColumnMode}
        setGroupedColumnMode={setGroupedColumnMode}
      />
      <MantineReactTable table={table} />
    </Stack>
  );
};

export default ExampleGrouping;

//demo...
const DemoRadioGroup = ({
  groupedColumnMode,
  setGroupedColumnMode,
}: {
  groupedColumnMode: 'false' | 'remove' | 'reorder';
  setGroupedColumnMode: (
    groupedColumnMode: 'false' | 'remove' | 'reorder',
  ) => void;
}) => {
  return (
    <Stack m={'auto'} align={'center'}>
      <Text>Grouped Column Mode</Text>
      <Radio.Group
        value={groupedColumnMode}
        onChange={(event) => setGroupedColumnMode(event as ColumnMode)}
      >
        <Group>
          <Radio value={'reorder'} label={'Reorder (default)'} />
          <Radio value={'remove'} label={'Remove'} />
          <Radio value={'false'} label={'False'} />
        </Group>
      </Radio.Group>
    </Stack>
  );
};
//end
