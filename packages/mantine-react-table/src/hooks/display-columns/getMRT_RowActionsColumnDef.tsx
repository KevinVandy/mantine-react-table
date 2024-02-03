import { MRT_ToggleRowActionMenuButton } from '../../components/buttons/MRT_ToggleRowActionMenuButton';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const getMRT_RowActionsColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  return {
    Cell: ({ cell, row, table }) => (
      <MRT_ToggleRowActionMenuButton cell={cell} row={row} table={table} />
    ),
    ...defaultDisplayColumnProps({
      header: 'actions',
      id: 'mrt-row-actions',
      size: 70,
      tableOptions,
    }),
  };
};
