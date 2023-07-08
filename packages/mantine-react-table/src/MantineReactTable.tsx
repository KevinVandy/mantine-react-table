import { useMantineReactTable } from './useMantineReactTable';
import { MRT_TableWrapper } from './table/MRT_TableWrapper';
import { type MRT_TableOptions, type MRT_TableInstance } from './types';

type Prettify<T> = { [K in keyof T]: T[K] } & unknown;

type Xor<A, B> =
  | Prettify<A & { [k in keyof B]?: never }>
  | Prettify<B & { [k in keyof A]?: never }>;

type TableInstanceProp<TData extends Record<string, any>> = {
  table: MRT_TableInstance<TData>;
};

type Props<TData extends Record<string, any>> = Xor<
  TableInstanceProp<TData>,
  MRT_TableOptions<TData>
>;

const isTableInstanceProp = <TData extends Record<string, any>>(
  props: Props<TData>,
): props is TableInstanceProp<TData> =>
  (props as TableInstanceProp<TData>).table !== undefined;

export const MantineReactTable = <TData extends Record<string, any>>(
  props: Props<TData>,
) => {
  let table: MRT_TableInstance<TData>;

  if (isTableInstanceProp(props)) {
    table = props.table;
  } else {
    table = useMantineReactTable(props);
  }

  return <MRT_TableWrapper table={table} />;
};
