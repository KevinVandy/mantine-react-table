import { useTableOptions } from './useTableOptions';
import { useMantineReactTableInstance } from './useMantineReactTableInstance';
import { type MRT_TableInstance, type MRT_TableOptions } from './types';

export const useMantineReactTable = <TData extends Record<string, any>>(
  tableOptions: MRT_TableOptions<TData>,
): MRT_TableInstance<TData> => {
  const parsedTableOptions = useTableOptions(tableOptions);
  const tableInstance = useMantineReactTableInstance(parsedTableOptions);
  return tableInstance;
};
