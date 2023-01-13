import React, {
  Dispatch,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useMemo,
} from 'react';
import type {
  ActionIconProps,
  BoxProps,
  ProgressProps,
  AlertProps,
  CheckboxProps,
  ChipProps,
  PaperProps,
  RadioProps,
  SkeletonProps,
  TableProps,
  TextInputProps,
  MantineSize,
  UnstyledButtonProps,
} from '@mantine/core';
import type {
  AggregationFn,
  Cell,
  Column,
  ColumnDef,
  DeepKeys,
  FilterFn,
  Header,
  HeaderGroup,
  OnChangeFn,
  Row,
  SortingFn,
  Table,
  TableOptions,
  TableState,
} from '@tanstack/react-table';
import type { VirtualizerOptions, Virtualizer } from '@tanstack/react-virtual';
import { MRT_AggregationFns } from './aggregationFns';
import { MRT_DefaultColumn, MRT_DefaultDisplayColumn } from './column.utils';
import { MRT_FilterFns } from './filterFns';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_SortingFns } from './sortingFns';
import { MRT_TableRoot } from './table/MRT_TableRoot';
import { MRT_Localization_EN } from './_locales/en';

/**
 * Most of this file is just TypeScript types
 */

export type HTMLPropsRef<T extends HTMLElement> = Omit<
  HTMLProps<T>,
  'color' | 'size' | 'type'
> & {
  ref?: MutableRefObject<T>;
};

export type ColumnAlignment = { align?: 'left' | 'center' | 'right' };

export interface MRT_PaginationProps {
  rowsPerPageOptions?: string[];
  showFirstLastPageButtons?: boolean;
  showRowsPerPage?: boolean;
}

export type DensityState = MantineSize;

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export interface MRT_Localization {
  actions: string;
  and: string;
  cancel: string;
  changeFilterMode: string;
  changeSearchMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSort: string;
  clickToCopy: string;
  collapse: string;
  collapseAll: string;
  columnActions: string;
  copiedToClipboard: string;
  dropToGroupBy: string;
  edit: string;
  expand: string;
  expandAll: string;
  filterArrIncludes: string;
  filterArrIncludesAll: string;
  filterArrIncludesSome: string;
  filterBetween: string;
  filterBetweenInclusive: string;
  filterByColumn: string;
  filterContains: string;
  filterEmpty: string;
  filterEndsWith: string;
  filterEquals: string;
  filterEqualsString: string;
  filterFuzzy: string;
  filterGreaterThan: string;
  filterGreaterThanOrEqualTo: string;
  filterInNumberRange: string;
  filterIncludesString: string;
  filterIncludesStringSensitive: string;
  filterLessThan: string;
  filterLessThanOrEqualTo: string;
  filterMode: string;
  filterNotEmpty: string;
  filterNotEquals: string;
  filterStartsWith: string;
  filterWeakEquals: string;
  filteringByColumn: string;
  goToFirstPage: string;
  goToLastPage: string;
  goToNextPage: string;
  goToPreviousPage: string;
  grab: string;
  groupByColumn: string;
  groupedBy: string;
  hideAll: string;
  hideColumn: string;
  max: string;
  min: string;
  move: string;
  noRecordsToDisplay: string;
  noResultsFound: string;
  of: string;
  or: string;
  pinToLeft: string;
  pinToRight: string;
  resetColumnSize: string;
  resetOrder: string;
  rowActions: string;
  rowNumber: string;
  rowNumbers: string;
  rowsPerPage: string;
  save: string;
  search: string;
  select: string;
  selectedCountOfRowCountRowsSelected: string;
  showAll: string;
  showAllColumns: string;
  showHideColumns: string;
  showHideFilters: string;
  showHideSearch: string;
  sortByColumnAsc: string;
  sortByColumnDesc: string;
  sortedByColumnAsc: string;
  sortedByColumnDesc: string;
  thenBy: string;
  toggleDensity: string;
  toggleFullScreen: string;
  toggleSelectAll: string;
  toggleSelectRow: string;
  toggleVisibility: string;
  ungroupByColumn: string;
  unpin: string;
  unpinAll: string;
  unsorted: string;
}

export interface MRT_RowModel<TData extends Record<string, any> = {}> {
  flatRows: MRT_Row<TData>[];
  rows: MRT_Row<TData>[];
  rowsById: { [key: string]: MRT_Row<TData> };
}

export type MRT_TableInstance<TData extends Record<string, any> = {}> = Omit<
  Table<TData>,
  | 'getAllColumns'
  | 'getAllFlatColumns'
  | 'getAllLeafColumns'
  | 'getCenterLeafColumns'
  | 'getColumn'
  | 'getExpandedRowModel'
  | 'getFlatHeaders'
  | 'getLeftLeafColumns'
  | 'getPaginationRowModel'
  | 'getPreFilteredRowModel'
  | 'getPrePaginationRowModel'
  | 'getRightLeafColumns'
  | 'getRowModel'
  | 'getSelectedRowModel'
  | 'getState'
  | 'options'
> & {
  getAllColumns: () => MRT_Column<TData>[];
  getAllFlatColumns: () => MRT_Column<TData>[];
  getAllLeafColumns: () => MRT_Column<TData>[];
  getCenterLeafColumns: () => MRT_Column<TData>[];
  getColumn: (columnId: string) => MRT_Column<TData>;
  getExpandedRowModel: () => MRT_RowModel<TData>;
  getFlatHeaders: () => MRT_Header<TData>[];
  getLeftLeafColumns: () => MRT_Column<TData>[];
  getPaginationRowModel: () => MRT_RowModel<TData>;
  getPreFilteredRowModel: () => MRT_RowModel<TData>;
  getPrePaginationRowModel: () => MRT_RowModel<TData>;
  getRightLeafColumns: () => MRT_Column<TData>[];
  getRowModel: () => MRT_RowModel<TData>;
  getSelectedRowModel: () => MRT_RowModel<TData>;
  getState: () => MRT_TableState<TData>;
  options: MantineReactTableProps<TData> & {
    icons: MRT_Icons;
    localization: MRT_Localization;
  };
  refs: {
    bottomToolbarRef: MutableRefObject<HTMLDivElement>;
    editInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
    filterInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
    searchInputRef: MutableRefObject<HTMLInputElement>;
    tableContainerRef: MutableRefObject<HTMLDivElement>;
    tableHeadCellRefs: MutableRefObject<Record<string, HTMLTableCellElement>>;
    tablePaperRef: MutableRefObject<HTMLDivElement>;
    topToolbarRef: MutableRefObject<HTMLDivElement>;
  };
  setColumnFilterFns: Dispatch<
    SetStateAction<{ [key: string]: MRT_FilterOption }>
  >;
  setDensity: Dispatch<SetStateAction<DensityState>>;
  setDraggingColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
  setDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
  setEditingCell: Dispatch<SetStateAction<MRT_Cell<TData> | null>>;
  setEditingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
  setGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
  setHoveredColumn: Dispatch<
    SetStateAction<MRT_Column<TData> | { id: string } | null>
  >;
  setHoveredRow: Dispatch<
    SetStateAction<MRT_Row<TData> | { id: string } | null>
  >;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
  setShowToolbarDropZone: Dispatch<SetStateAction<boolean>>;
};

export type MRT_TableState<TData extends Record<string, any> = {}> =
  TableState & {
    columnFilterFns: Record<string, MRT_FilterOption>;
    density: DensityState;
    draggingColumn: MRT_Column<TData> | null;
    draggingRow: MRT_Row<TData> | null;
    editingCell: MRT_Cell<TData> | null;
    editingRow: MRT_Row<TData> | null;
    globalFilterFn: MRT_FilterOption;
    hoveredColumn: MRT_Column<TData> | { id: string } | null;
    hoveredRow: MRT_Row<TData> | { id: string } | null;
    isFullScreen: boolean;
    isLoading: boolean;
    showAlertBanner: boolean;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    showProgressBars: boolean;
    showSkeletons: boolean;
    showToolbarDropZone: boolean;
  };

export type MRT_ColumnDef<TData extends Record<string, any> = {}> = Omit<
  ColumnDef<TData, unknown>,
  | 'accessorKey'
  | 'aggregatedCell'
  | 'aggregationFn'
  | 'cell'
  | 'columns'
  | 'filterFn'
  | 'footer'
  | 'header'
  | 'id'
  | 'sortingFn'
> & {
  AggregatedCell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Cell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Edit?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Filter?: ({
    column,
    header,
    rangeFilterIndex,
    table,
  }: {
    column: MRT_Column<TData>;
    header: MRT_Header<TData>;
    rangeFilterIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Footer?:
    | ReactNode
    | (({
        column,
        footer,
        table,
      }: {
        column: MRT_Column<TData>;
        footer: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode);
  GroupedCell?: ({
    cell,
    column,
    row,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Header?:
    | ReactNode
    | (({
        column,
        header,
        table,
      }: {
        column: MRT_Column<TData>;
        header: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode);
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify a function here to point to the correct property in the data object.
   *
   * @example accessorFn: (row) => row.username
   */
  accessorFn?: (originalRow: TData) => any;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify which key in the row this column should use to access the correct data.
   * Also supports Deep Key Dot Notation.
   *
   * @example accessorKey: 'username' //simple
   * @example accessorKey: 'name.firstName' //deep key dot notation
   */
  accessorKey?: DeepKeys<TData>;
  aggregationFn?: MRT_AggregationFn<TData> | Array<MRT_AggregationFn<TData>>;
  /**
   * Specify what type of column this is. Either `data`, `display`, or `group`. Defaults to `data`.
   * Leave this blank if you are just creating a normal data column.
   *
   * @default 'data'
   *
   * @example columnDefType: 'display'
   */
  columnDefType?: 'data' | 'display' | 'group';
  columnFilterModeOptions?: Array<
    LiteralUnion<string & MRT_FilterOption>
  > | null;
  columns?: MRT_ColumnDef<TData>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnDragging?: boolean;
  enableColumnFilterModes?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  filterFn?: MRT_FilterFn<TData>;
  filterSelectOptions?: (string | { text: string; value: any })[];
  filterVariant?: 'text' | 'select' | 'multi-select' | 'range' | 'checkbox';
  /**
   * footer must be a string. If you want custom JSX to render the footer, you can also specify a `Footer` option. (Capital F)
   */
  footer?: string;
  /**
   * header must be a string. If you want custom JSX to render the header, you can also specify a `Header` option. (Capital H)
   */
  header: string;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   *
   * If you have also specified an `accessorFn`, MRT still needs to have a valid `id` to be able to identify the column uniquely.
   *
   * `id` defaults to the `accessorKey` or `header` if not specified.
   *
   * @default gets set to the same value as `accessorKey` by default
   */
  id?: LiteralUnion<string & keyof TData>;
  mantineColumnActionsButtonProps?:
    | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
  mantineColumnDragHandleProps?:
    | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
  mantineCopyButtonProps?:
    | (UnstyledButtonProps & HTMLPropsRef<HTMLButtonElement>)
    | (({
        cell,
        column,
        row,
        table,
      }: {
        cell: MRT_Cell<TData>;
        column: MRT_Column<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => UnstyledButtonProps & HTMLPropsRef<HTMLButtonElement>);
  mantineEditTextInputProps?:
    | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
    | (({
        cell,
        column,
        row,
        table,
      }: {
        cell: MRT_Cell<TData>;
        column: MRT_Column<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
  mantineFilterCheckboxProps?:
    | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
    | (({
        column,
        table,
      }: {
        column: MRT_Column<TData>;
        table: MRT_TableInstance<TData>;
      }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
  mantineFilterTextInputProps?:
    | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
    | (({
        table,
        column,
        rangeFilterIndex,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
        rangeFilterIndex?: number;
      }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
  mantineTableBodyCellProps?:
    | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
    | (({
        cell,
        column,
        row,
        table,
      }: {
        cell: MRT_Cell<TData>;
        column: MRT_Column<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
  mantineTableFooterCellProps?:
    | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
  mantineTableHeadCellProps?:
    | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
  renderColumnActionsMenuItems?: ({
    column,
    table,
  }: {
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderColumnFilterModeMenuItems?: ({
    column,
    internalFilterOptions,
    onSelectFilterMode,
    table,
  }: {
    column: MRT_Column<TData>;
    internalFilterOptions: MRT_InternalFilterOption[];
    onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  sortingFn?: MRT_SortingFn<TData>;
};

export type MRT_DefinedColumnDef<TData extends Record<string, any> = {}> = Omit<
  MRT_ColumnDef<TData>,
  'id' | 'defaultDisplayColumn'
> & {
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
  id: string;
  _filterFn: MRT_FilterOption;
};

export type MRT_Column<TData extends Record<string, any> = {}> = Omit<
  Column<TData, unknown>,
  'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
> & {
  columnDef: MRT_DefinedColumnDef<TData>;
  columns?: MRT_Column<TData>[];
  filterFn?: MRT_FilterFn<TData>;
  footer: string;
  header: string;
};

export type MRT_Header<TData extends Record<string, any> = {}> = Omit<
  Header<TData, unknown>,
  'column'
> & {
  column: MRT_Column<TData>;
};

export type MRT_HeaderGroup<TData extends Record<string, any> = {}> = Omit<
  HeaderGroup<TData>,
  'headers'
> & {
  headers: MRT_Header<TData>[];
};

export type MRT_Row<TData extends Record<string, any> = {}> = Omit<
  Row<TData>,
  'getVisibleCells' | 'getAllCells' | 'subRows' | '_valuesCache'
> & {
  getAllCells: () => MRT_Cell<TData>[];
  getVisibleCells: () => MRT_Cell<TData>[];
  subRows?: MRT_Row<TData>[];
  _valuesCache: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
};

export type MRT_Cell<TData extends Record<string, any> = {}> = Omit<
  Cell<TData, unknown>,
  'column' | 'row'
> & {
  column: MRT_Column<TData>;
  row: MRT_Row<TData>;
};

export type MRT_AggregationOption = string & keyof typeof MRT_AggregationFns;

export type MRT_AggregationFn<TData extends Record<string, any> = {}> =
  | AggregationFn<TData>
  | MRT_AggregationOption;

export type MRT_SortingOption = LiteralUnion<
  string & keyof typeof MRT_SortingFns
>;

export type MRT_SortingFn<TData extends Record<string, any> = {}> =
  | SortingFn<TData>
  | MRT_SortingOption;

export type MRT_FilterOption = LiteralUnion<
  string & keyof typeof MRT_FilterFns
>;

export type MRT_FilterFn<TData extends Record<string, any> = {}> =
  | FilterFn<TData>
  | MRT_FilterOption;

export type MRT_InternalFilterOption = {
  option: string;
  symbol: string;
  label: string;
  divider: boolean;
};

export type MRT_DisplayColumnIds =
  | 'mrt-row-actions'
  | 'mrt-row-drag'
  | 'mrt-row-expand'
  | 'mrt-row-numbers'
  | 'mrt-row-select';

/**
 * `columns` and `data` props are the only required props, but there are over 150 other optional props.
 *
 * See more info on creating columns and data on the official docs site:
 * @link https://www.mantine-react-table.com/docs/getting-started/usage
 *
 * See the full props list on the official docs site:
 * @link https://www.mantine-react-table.com/docs/api/props
 */
export type MantineReactTableProps<TData extends Record<string, any> = {}> =
  Omit<
    Partial<TableOptions<TData>>,
    | 'columns'
    | 'data'
    | 'defaultColumn'
    | 'enableRowSelection'
    | 'expandRowsFn'
    | 'getRowId'
    | 'globalFilterFn'
    | 'initialState'
    | 'onStateChange'
    | 'state'
  > & {
    columnFilterModeOptions?: Array<
      LiteralUnion<string & MRT_FilterOption>
    > | null;
    /**
     * The columns to display in the table. `accessorKey`s or `accessorFn`s must match keys in the `data` prop.
     *
     * See more info on creating columns on the official docs site:
     * @link https://www.mantine-react-table.com/docs/guides/data-columns
     * @link https://www.mantine-react-table.com/docs/guides/display-columns
     *
     * See all Columns Options on the official docs site:
     * @link https://www.mantine-react-table.com/docs/api/column-options
     */
    columns: MRT_ColumnDef<TData>[];
    /**
     * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
     *
     * See the usage guide for more info on creating columns and data:
     * @link https://www.mantine-react-table.com/docs/getting-started/usage
     */
    columnVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
      HTMLDivElement,
      HTMLTableCellElement
    > | null>;
    columnVirtualizerProps?:
      | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<
          VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>
        >);
    data: TData[];
    /**
     * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
     */
    defaultColumn?: Partial<MRT_ColumnDef<TData>>;
    /**
     * Change the default options for display columns.
     */
    defaultDisplayColumn?: Partial<MRT_ColumnDef<TData>>;
    displayColumnDefOptions?: Partial<{
      [key in MRT_DisplayColumnIds]: Partial<MRT_ColumnDef>;
    }>;
    editingMode?: 'table' | 'modal' | 'row' | 'cell';
    enableBottomToolbar?: boolean;
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterModes?: boolean;
    enableColumnOrdering?: boolean;
    enableColumnVirtualization?: boolean;
    enableDensityToggle?: boolean;
    enableEditing?: boolean;
    enableExpandAll?: boolean;
    enableFullScreenToggle?: boolean;
    enableGlobalFilterModes?: boolean;
    enableGlobalFilterRankedResults?: boolean;
    enablePagination?: boolean;
    enableRowActions?: boolean;
    enableRowDragging?: boolean;
    enableRowNumbers?: boolean;
    enableRowOrdering?: boolean;
    enableRowSelection?: boolean | ((row: MRT_Row<TData>) => boolean);
    enableRowVirtualization?: boolean;
    enableSelectAll?: boolean;
    enableStickyFooter?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarInternalActions?: boolean;
    enableTopToolbar?: boolean;
    expandRowsFn?: (dataRow: TData) => TData[];
    getRowId?: (
      originalRow: TData,
      index: number,
      parentRow: MRT_Row<TData>,
    ) => string;
    globalFilterFn?: MRT_FilterOption;
    globalFilterModeOptions?: MRT_FilterOption[] | null;
    icons?: Partial<MRT_Icons>;
    initialState?: Partial<MRT_TableState<TData>>;
    /**
     * Changes which kind of CSS layout is used to render the table. `semantic` uses default semantic HTML elements, while `grid` adds CSS grid and flexbox styles
     */
    layoutMode?: 'semantic' | 'grid';
    /**
     * Pass in either a locale imported from `mantine-react-table/locales/*` or a custom locale object.
     *
     * See the localization (i18n) guide for more info:
     * @link https://www.mantine-react-table.com/docs/guides/localization
     */
    localization?: Partial<MRT_Localization>;
    mantineBottomToolbarProps?:
      | (BoxProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLDivElement>);
    mantineColumnActionsButtonProps?:
      | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
    mantineColumnDragHandleProps?:
      | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
    mantineCopyButtonProps?:
      | (UnstyledButtonProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          cell,
          column,
          row,
          table,
        }: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => UnstyledButtonProps & HTMLPropsRef<HTMLButtonElement>);
    mantineDetailPanelProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableCellElement>)
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableCellElement>);
    mantineEditTextInputProps?:
      | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
      | (({
          cell,
          column,
          row,
          table,
        }: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
    mantineExpandAllButtonProps?:
      | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
    mantineExpandButtonProps?:
      | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          row,
          table,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
    mantineFilterCheckboxProps?:
      | (CheckboxProps & HTMLPropsRef<HTMLInputElement>)
      | (({
          column,
          table,
        }: {
          column: MRT_Column<TData>;
          table: MRT_TableInstance<TData>;
        }) => CheckboxProps & HTMLPropsRef<HTMLInputElement>);
    mantineFilterTextInputProps?:
      | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
      | (({
          table,
          column,
          rangeFilterIndex,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
          rangeFilterIndex?: number;
        }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
    mantineLinearProgressProps?:
      | (ProgressProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          isTopToolbar,
          table,
        }: {
          isTopToolbar: boolean;
          table: MRT_TableInstance<TData>;
        }) => ProgressProps & HTMLPropsRef<HTMLDivElement>);
    mantinePaginationProps?:
      | Partial<MRT_PaginationProps & BoxProps & HTMLPropsRef<HTMLDivElement>>
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<
          MRT_PaginationProps & BoxProps & HTMLPropsRef<HTMLDivElement>
        >);
    mantinePaperProps?:
      | (PaperProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => PaperProps & HTMLPropsRef<HTMLDivElement>);
    mantineRowDragHandleProps?:
      | (ActionIconProps & HTMLPropsRef<HTMLButtonElement>)
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => ActionIconProps & HTMLPropsRef<HTMLButtonElement>);
    mantineSearchTextInputProps?:
      | (TextInputProps & HTMLPropsRef<HTMLInputElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => TextInputProps & HTMLPropsRef<HTMLInputElement>);
    mantineSelectAllCheckboxProps?:
      | (CheckboxProps & HTMLPropsRef<HTMLInputElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => CheckboxProps & HTMLPropsRef<HTMLInputElement>);
    mantineSelectCheckboxProps?:
      | ((CheckboxProps | RadioProps) & HTMLPropsRef<HTMLInputElement>)
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => (CheckboxProps | RadioProps) & HTMLPropsRef<HTMLInputElement>);
    mantineSkeletonProps?:
      | (SkeletonProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          cell,
          column,
          row,
          table,
        }: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => SkeletonProps & HTMLPropsRef<HTMLDivElement>);
    mantineTableBodyCellProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
      | (({
          cell,
          column,
          row,
          table,
        }: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
    mantineTableBodyProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableSectionElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableSectionElement>);
    mantineTableBodyRowProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableRowElement>)
      | (({
          isDetailPanel = false,
          row,
          table,
        }: {
          isDetailPanel?: boolean;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableRowElement>);
    mantineTableContainerProps?:
      | (BoxProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLDivElement>);
    mantineTableFooterCellProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
    mantineTableFooterProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableSectionElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableSectionElement>);
    mantineTableFooterRowProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableRowElement>)
      | (({
          table,
          footerGroup,
        }: {
          table: MRT_TableInstance<TData>;
          footerGroup: MRT_HeaderGroup<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableRowElement>);
    mantineTableHeadCellProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment)
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableCellElement> & ColumnAlignment);
    mantineTableHeadProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableSectionElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableSectionElement>);
    mantineTableHeadRowProps?:
      | (BoxProps & HTMLPropsRef<HTMLTableRowElement>)
      | (({
          table,
          headerGroup,
        }: {
          table: MRT_TableInstance<TData>;
          headerGroup: MRT_HeaderGroup<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLTableRowElement>);
    mantineTableProps?:
      | (TableProps & HTMLPropsRef<HTMLTableElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => TableProps & HTMLPropsRef<HTMLTableElement>);
    mantineToolbarAlertBannerChipProps?:
      | (Partial<ChipProps> & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<ChipProps> & HTMLPropsRef<HTMLDivElement>);
    mantineToolbarAlertBannerProps?:
      | (AlertProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => AlertProps & HTMLPropsRef<HTMLDivElement>);
    mantineTopToolbarProps?:
      | (BoxProps & HTMLPropsRef<HTMLDivElement>)
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => BoxProps & HTMLPropsRef<HTMLDivElement>);
    /**
     * Memoize cells, rows, or the entire table body to potentially improve render performance.
     *
     * @warning This will break some dynamic rendering features. See the memoization guide for more info:
     * @link https://www.mantine-react-table.com/docs/guides/memoize-components
     */
    memoMode?: 'cells' | 'rows' | 'table-body';
    onColumnFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterOption }>;
    onDensityChange?: OnChangeFn<DensityState>;
    onDraggingColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
    onDraggingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onEditingCellChange?: OnChangeFn<MRT_Cell<TData> | null>;
    onEditingRowCancel?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => void;
    onEditingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onEditingRowSave?: ({
      exitEditingMode,
      row,
      table,
      values,
    }: {
      exitEditingMode: () => void;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
      values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
    }) => Promise<void> | void;
    onGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
    onHoveredColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
    onHoveredRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onShowAlertBannerChange?: OnChangeFn<boolean>;
    onShowFiltersChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    onShowToolbarDropZoneChange?: OnChangeFn<boolean>;
    positionActionsColumn?: 'first' | 'last';
    positionExpandColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right' | 'none';
    positionPagination?: 'bottom' | 'top' | 'both' | 'none';
    positionToolbarAlertBanner?: 'bottom' | 'top' | 'none';
    positionToolbarDropZone?: 'bottom' | 'top' | 'none' | 'both';
    renderBottomToolbar?:
      | ReactNode
      | (({ table }: { table: MRT_TableInstance<TData> }) => ReactNode);
    renderBottomToolbarCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderColumnActionsMenuItems?: ({
      column,
      table,
    }: {
      column: MRT_Column<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderColumnFilterModeMenuItems?: ({
      column,
      internalFilterOptions,
      onSelectFilterMode,
      table,
    }: {
      column: MRT_Column<TData>;
      internalFilterOptions: MRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderDetailPanel?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderGlobalFilterModeMenuItems?: ({
      internalFilterOptions,
      onSelectFilterMode,
      table,
    }: {
      internalFilterOptions: MRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderRowActionMenuItems?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderRowActions?: ({
      cell,
      row,
      table,
    }: {
      cell: MRT_Cell<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderToolbarInternalActions?: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderTopToolbar?:
      | ReactNode
      | (({ table }: { table: MRT_TableInstance<TData> }) => ReactNode);
    renderTopToolbarCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    rowCount?: number;
    rowNumberMode?: 'original' | 'static';
    rowVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
      HTMLDivElement,
      HTMLTableRowElement
    > | null>;
    rowVirtualizerProps?:
      | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>);
    selectAllMode?: 'all' | 'page';
    state?: Partial<MRT_TableState<TData>>;
    tableInstanceRef?: MutableRefObject<MRT_TableInstance<TData> | null>;
  };

const MantineReactTable = <TData extends Record<string, any> = {}>({
  aggregationFns,
  autoResetExpanded = false,
  columnResizeMode = 'onEnd',
  defaultColumn,
  defaultDisplayColumn,
  editingMode = 'modal',
  enableBottomToolbar = true,
  enableColumnActions = true,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensityToggle = true,
  enableExpandAll = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGlobalFilterRankedResults = true,
  enableGrouping = false,
  enableHiding = true,
  enableMultiRowSelection = true,
  enableMultiSort = true,
  enablePagination = true,
  enablePinning = false,
  enableRowSelection = false,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = false,
  enableTableFooter = true,
  enableTableHead = true,
  enableToolbarInternalActions = true,
  enableTopToolbar = true,
  filterFns,
  icons,
  layoutMode = 'semantic',
  localization,
  manualFiltering,
  manualGrouping,
  manualPagination,
  manualSorting,
  positionActionsColumn = 'first',
  positionExpandColumn = 'first',
  positionGlobalFilter = 'right',
  positionPagination = 'bottom',
  positionToolbarAlertBanner = 'top',
  positionToolbarDropZone = 'top',
  rowNumberMode = 'original',
  selectAllMode = 'page',
  sortingFns,
  ...rest
}: MantineReactTableProps<TData>) => {
  const _icons = useMemo(() => ({ ...MRT_Default_Icons, ...icons }), [icons]);
  const _localization = useMemo(
    () => ({
      ...MRT_Localization_EN,
      ...localization,
    }),
    [localization],
  );
  const _aggregationFns = useMemo(
    () => ({ ...MRT_AggregationFns, ...aggregationFns }),
    [],
  );
  const _filterFns = useMemo(() => ({ ...MRT_FilterFns, ...filterFns }), []);
  const _sortingFns = useMemo(() => ({ ...MRT_SortingFns, ...sortingFns }), []);
  const _defaultColumn = useMemo<Partial<MRT_ColumnDef<TData>>>(
    () => ({ ...MRT_DefaultColumn, ...defaultColumn }),
    [defaultColumn],
  );
  const _defaultDisplayColumn = useMemo<Partial<MRT_ColumnDef<TData>>>(
    () => ({
      ...(MRT_DefaultDisplayColumn as Partial<MRT_ColumnDef<TData>>),
      ...defaultDisplayColumn,
    }),
    [defaultDisplayColumn],
  );

  if (rest.enableRowVirtualization || rest.enableColumnVirtualization) {
    layoutMode = 'grid';
  }

  if (rest.enableRowVirtualization) {
    enableStickyHeader = true;
  }

  if (enablePagination === false && manualPagination === undefined) {
    manualPagination = true;
  }

  if (!rest.data?.length) {
    manualFiltering = true;
    manualGrouping = true;
    manualPagination = true;
    manualSorting = true;
  }

  return (
    <MRT_TableRoot
      aggregationFns={_aggregationFns}
      autoResetExpanded={autoResetExpanded}
      columnResizeMode={columnResizeMode}
      defaultColumn={_defaultColumn}
      defaultDisplayColumn={_defaultDisplayColumn}
      editingMode={editingMode}
      enableBottomToolbar={enableBottomToolbar}
      enableColumnActions={enableColumnActions}
      enableColumnFilters={enableColumnFilters}
      enableColumnOrdering={enableColumnOrdering}
      enableColumnResizing={enableColumnResizing}
      enableDensityToggle={enableDensityToggle}
      enableExpandAll={enableExpandAll}
      enableFilters={enableFilters}
      enableFullScreenToggle={enableFullScreenToggle}
      enableGlobalFilter={enableGlobalFilter}
      enableGlobalFilterRankedResults={enableGlobalFilterRankedResults}
      enableGrouping={enableGrouping}
      enableHiding={enableHiding}
      enableMultiRowSelection={enableMultiRowSelection}
      enableMultiSort={enableMultiSort}
      enablePagination={enablePagination}
      enablePinning={enablePinning}
      enableRowSelection={enableRowSelection}
      enableSelectAll={enableSelectAll}
      enableSorting={enableSorting}
      enableStickyHeader={enableStickyHeader}
      enableTableFooter={enableTableFooter}
      enableTableHead={enableTableHead}
      enableToolbarInternalActions={enableToolbarInternalActions}
      enableTopToolbar={enableTopToolbar}
      filterFns={_filterFns}
      icons={_icons}
      layoutMode={layoutMode}
      localization={_localization}
      manualFiltering={manualFiltering}
      manualGrouping={manualGrouping}
      manualPagination={manualPagination}
      manualSorting={manualSorting}
      positionActionsColumn={positionActionsColumn}
      positionExpandColumn={positionExpandColumn}
      positionGlobalFilter={positionGlobalFilter}
      positionPagination={positionPagination}
      positionToolbarAlertBanner={positionToolbarAlertBanner}
      positionToolbarDropZone={positionToolbarDropZone}
      rowNumberMode={rowNumberMode}
      selectAllMode={selectAllMode}
      sortingFns={_sortingFns}
      {...rest}
    />
  );
};

export default MantineReactTable;
