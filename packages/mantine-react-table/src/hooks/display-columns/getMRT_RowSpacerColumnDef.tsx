import { MRT_DefaultDisplayColumn } from '../useMRT_TableOptions';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import {
  defaultDisplayColumnProps,
  showRowSpacerColumn,
} from '../../utils/displayColumn.utils';

const blankColProps = {
  children: null,
  style: {
    flex: '1 0 auto', //TODO remove after grow is implemented
    minWidth: 0,
    padding: 0,
    width: 0,
  },
};

export const getMRT_RowSpacerColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  if (!showRowSpacerColumn(tableOptions)) {
    return null;
  }

  return {
    ...defaultDisplayColumnProps({
      id: 'mrt-row-spacer',
      size: 0,
      tableOptions,
    }),
    grow: true,
    ...MRT_DefaultDisplayColumn,
    mantineTableBodyCellProps: blankColProps,
    mantineTableFooterCellProps: blankColProps,
    mantineTableHeadCellProps: blankColProps,
  };
};
