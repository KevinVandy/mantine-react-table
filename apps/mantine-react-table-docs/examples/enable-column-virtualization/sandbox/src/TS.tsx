import { useRef } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnVirtualizer,
} from 'mantine-react-table';
import { fakeColumns, fakeData } from './makeData';

const Example = () => {
  //optionally access the underlying virtualizer instance
  const columnVirtualizerInstanceRef = useRef<MRT_ColumnVirtualizer>(null);

  const table = useMantineReactTable({
    columnVirtualizerInstanceRef, //optional
    columnVirtualizerOptions: { overscan: 4 }, //optionally customize the virtualizer
    columns: fakeColumns, //500 columns
    data: fakeData,
    enableColumnVirtualization: true,
    enableColumnPinning: true,
    enableRowNumbers: true,
  });

  return <MantineReactTable table={table} />;
};

export default Example;
