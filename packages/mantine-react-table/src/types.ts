import {
  type Dispatch,
  type HTMLProps,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';
import {
  type AccessorFn,
  type AggregationFn,
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingInfoState,
  type ColumnSizingState,
  type DeepKeys,
  type DeepValue,
  type ExpandedState,
  type FilterFn,
  type GroupingState,
  type Header,
  type HeaderGroup,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingFn,
  type SortingState,
  type Table,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  type VirtualItem,
  type Virtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';
import {
  type ActionIconProps,
  type AlertProps,
  type AutocompleteProps,
  type BadgeProps,
  type BoxProps,
  type CheckboxProps,
  type HighlightProps,
  type LoadingOverlayProps,
  type ModalProps,
  type MultiSelectProps,
  type PaginationProps,
  type PaperProps,
  type ProgressProps,
  type RadioProps,
  type RangeSliderProps,
  type SelectProps,
  type SkeletonProps,
  type SwitchProps,
  type TableProps,
  type TextInputProps,
  type UnstyledButtonProps,
} from '@mantine/core';
import { type DateInputProps } from '@mantine/dates';
import { type MRT_AggregationFns } from './fns/aggregationFns';
import { type MRT_FilterFns } from './fns/filterFns';
import { type MRT_SortingFns } from './fns/sortingFns';
import { type MRT_Icons } from './icons';

export type { MRT_Icons };

export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & Record<never, never>);

export type Prettify<T> = { [K in keyof T]: T[K] } & unknown;

export type Xor<A, B> =
  | Prettify<A & { [k in keyof B]?: never }>
  | Prettify<B & { [k in keyof A]?: never }>;

export type HTMLPropsRef<T extends HTMLElement> = Omit<
  HTMLProps<T>,
  'color' | 'data' | 'label' | 'ref' | 'size' | 'style' | 'type'
> & {
  ref?: MutableRefObject<T | null> | null;
};

export type MantineShade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ColumnAlignment = {
  align?: 'center' | 'left' | 'right';
};

export type MRT_PaginationProps = Partial<PaginationProps> & {
  rowsPerPageOptions?: string[];
  showRowsPerPage?: boolean;
};

export type MRT_DensityState = 'md' | 'xl' | 'xs';

export type MRT_ColumnFilterFnsState = Record<string, MRT_FilterOption>;

export type MRT_RowData = Record<string, any>;

export type MRT_CellValue = unknown;

export type MRT_ColumnFiltersState = ColumnFiltersState;
export type MRT_ColumnOrderState = ColumnOrderState;
export type MRT_ColumnPinningState = ColumnPinningState;
export type MRT_ColumnSizingInfoState = ColumnSizingInfoState;
export type MRT_ColumnSizingState = ColumnSizingState;
export type MRT_ExpandedState = ExpandedState;
export type MRT_GroupingState = GroupingState;
export type MRT_PaginationState = PaginationState;
export type MRT_RowSelectionState = RowSelectionState;
export type MRT_SortingState = SortingState;
export type MRT_Updater<T> = Updater<T>;
export type MRT_VirtualItem = VirtualItem;
export type MRT_VisibilityState = VisibilityState;

export type MRT_VirtualizerOptions<
  TScrollElement extends Element | Window = Element | Window,
  TItemElement extends Element = Element,
> = VirtualizerOptions<TScrollElement, TItemElement>;

export type MRT_ColumnVirtualizer<
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableCellElement,
> = Virtualizer<TScrollElement, TItemElement> & {
  virtualColumns: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
};

export type MRT_RowVirtualizer<
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableRowElement,
> = Virtualizer<TScrollElement, TItemElement> & {
  virtualRows: MRT_VirtualItem[];
};

export type MRT_ColumnHelper<TData extends MRT_RowData> = {
  accessor: <
    TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
    TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
      ? TReturn
      : TAccessor extends DeepKeys<TData>
        ? DeepValue<TData, TAccessor>
        : never,
  >(
    accessor: TAccessor,
    column: MRT_DisplayColumnDef<TData, TValue>,
  ) => MRT_ColumnDef<TData, TValue>;
  display: (column: MRT_DisplayColumnDef<TData>) => MRT_ColumnDef<TData>;
  group: (column: MRT_GroupColumnDef<TData>) => MRT_ColumnDef<TData>;
};

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
  create?: string;
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
  pin: string;
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
}

export interface MRT_RowModel<TData extends MRT_RowData> {
  flatRows: MRT_Row<TData>[];
  rows: MRT_Row<TData>[];
  rowsById: { [key: string]: MRT_Row<TData> };
}

export type MRT_TableInstance<TData extends MRT_RowData> = Omit<
  Table<TData>,
  | 'getAllColumns'
  | 'getAllFlatColumns'
  | 'getAllLeafColumns'
  | 'getBottomRows'
  | 'getCenterLeafColumns'
  | 'getCenterRows'
  | 'getColumn'
  | 'getExpandedRowModel'
  | 'getFlatHeaders'
  | 'getHeaderGroups'
  | 'getLeftLeafColumns'
  | 'getPaginationRowModel'
  | 'getPreFilteredRowModel'
  | 'getPrePaginationRowModel'
  | 'getRightLeafColumns'
  | 'getRowModel'
  | 'getSelectedRowModel'
  | 'getState'
  | 'getTopRows'
  | 'options'
> & {
  getAllColumns: () => MRT_Column<TData>[];
  getAllFlatColumns: () => MRT_Column<TData>[];
  getAllLeafColumns: () => MRT_Column<TData>[];
  getBottomRows: () => MRT_Row<TData>[];
  getCenterLeafColumns: () => MRT_Column<TData>[];
  getCenterRows: () => MRT_Row<TData>[];
  getColumn: (columnId: string) => MRT_Column<TData>;
  getExpandedRowModel: () => MRT_RowModel<TData>;
  getFlatHeaders: () => MRT_Header<TData>[];
  getHeaderGroups: () => MRT_HeaderGroup<TData>[];
  getLeftLeafColumns: () => MRT_Column<TData>[];
  getPaginationRowModel: () => MRT_RowModel<TData>;
  getPreFilteredRowModel: () => MRT_RowModel<TData>;
  getPrePaginationRowModel: () => MRT_RowModel<TData>;
  getRightLeafColumns: () => MRT_Column<TData>[];
  getRowModel: () => MRT_RowModel<TData>;
  getSelectedRowModel: () => MRT_RowModel<TData>;
  getState: () => MRT_TableState<TData>;
  getTopRows: () => MRT_Row<TData>[];
  options: MRT_StatefulTableOptions<TData>;
  refs: {
    bottomToolbarRef: MutableRefObject<HTMLDivElement>;
    editInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
    filterInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
    searchInputRef: MutableRefObject<HTMLInputElement>;
    tableContainerRef: MutableRefObject<HTMLDivElement>;
    tableFooterRef: MutableRefObject<HTMLTableSectionElement>;
    tableHeadCellRefs: MutableRefObject<Record<string, HTMLTableCellElement>>;
    tableHeadRef: MutableRefObject<HTMLTableSectionElement>;
    tablePaperRef: MutableRefObject<HTMLDivElement>;
    topToolbarRef: MutableRefObject<HTMLDivElement>;
  };
  setColumnFilterFns: Dispatch<SetStateAction<MRT_ColumnFilterFnsState>>;
  setCreatingRow: Dispatch<SetStateAction<MRT_Row<TData> | null | true>>;
  setDensity: Dispatch<SetStateAction<MRT_DensityState>>;
  setDraggingColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
  setDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
  setEditingCell: Dispatch<SetStateAction<MRT_Cell<TData> | null>>;
  setEditingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
  setGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
  setHoveredColumn: Dispatch<SetStateAction<Partial<MRT_Column<TData>> | null>>;
  setHoveredRow: Dispatch<SetStateAction<Partial<MRT_Row<TData>> | null>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
  setShowColumnFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
  setShowToolbarDropZone: Dispatch<SetStateAction<boolean>>;
};

export type MRT_DefinedTableOptions<TData extends MRT_RowData> =
  MRT_TableOptions<TData> & {
    icons: MRT_Icons;
    localization: MRT_Localization;
  };

export type MRT_StatefulTableOptions<TData extends MRT_RowData> =
  MRT_DefinedTableOptions<TData> & {
    state: Pick<
      MRT_TableState<TData>,
      | 'columnFilterFns'
      | 'columnOrder'
      | 'columnSizingInfo'
      | 'creatingRow'
      | 'density'
      | 'draggingColumn'
      | 'draggingRow'
      | 'editingCell'
      | 'editingRow'
      | 'globalFilterFn'
      | 'grouping'
      | 'hoveredColumn'
      | 'hoveredRow'
      | 'isFullScreen'
      | 'pagination'
      | 'showAlertBanner'
      | 'showColumnFilters'
      | 'showGlobalFilter'
      | 'showToolbarDropZone'
    >;
  };

export type MRT_TableState<TData extends MRT_RowData> = Prettify<
  TableState & {
    columnFilterFns: MRT_ColumnFilterFnsState;
    creatingRow: MRT_Row<TData> | null;
    density: MRT_DensityState;
    draggingColumn: MRT_Column<TData> | null;
    draggingRow: MRT_Row<TData> | null;
    editingCell: MRT_Cell<TData> | null;
    editingRow: MRT_Row<TData> | null;
    globalFilterFn: MRT_FilterOption;
    hoveredColumn: Partial<MRT_Column<TData>> | null;
    hoveredRow: Partial<MRT_Row<TData>> | null;
    isFullScreen: boolean;
    isLoading: boolean;
    isSaving: boolean;
    showAlertBanner: boolean;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    showLoadingOverlay: boolean;
    showProgressBars: boolean;
    showSkeletons: boolean;
    showToolbarDropZone: boolean;
  }
>;

export type MRT_ColumnDef<TData extends MRT_RowData, TValue = unknown> = Omit<
  ColumnDef<TData, TValue>,
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
  AggregatedCell?: (props: {
    cell: MRT_Cell<TData, TValue>;
    column: MRT_Column<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Cell?: (props: {
    cell: MRT_Cell<TData, TValue>;
    column: MRT_Column<TData, TValue>;
    renderedCellValue: ReactNode | number | string;
    row: MRT_Row<TData>;
    rowRef?: RefObject<HTMLTableRowElement>;
    staticRowIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Edit?: (props: {
    cell: MRT_Cell<TData, TValue>;
    column: MRT_Column<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Filter?: (props: {
    column: MRT_Column<TData, TValue>;
    header: MRT_Header<TData>;
    rangeFilterIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Footer?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        footer: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode)
    | ReactNode;
  GroupedCell?: (props: {
    cell: MRT_Cell<TData, TValue>;
    column: MRT_Column<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Header?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        header: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode)
    | ReactNode;
  PlaceholderCell?: (props: {
    cell: MRT_Cell<TData, TValue>;
    column: MRT_Column<TData, TValue>;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
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
  accessorKey?: DeepKeys<TData> | (string & {});
  aggregationFn?: Array<MRT_AggregationFn<TData>> | MRT_AggregationFn<TData>;
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
  editVariant?: 'select' | 'text';
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnDragging?: boolean;
  enableColumnFilterModes?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: ((row: MRT_Row<TData>) => boolean) | boolean;
  enableFilterMatchHighlighting?: boolean;
  filterFn?: MRT_FilterFn<TData>;
  filterVariant?:
    | 'autocomplete'
    | 'checkbox'
    | 'date'
    | 'date-range'
    | 'multi-select'
    | 'range'
    | 'range-slider'
    | 'select'
    | 'text';
  /**
   * footer must be a string. If you want custom JSX to render the footer, you can also specify a `Footer` option. (Capital F)
   */
  footer?: string;
  /**
   * If `layoutMode` is `'grid'` or `'grid-no-grow'`, you can specify the flex grow value for individual columns to still grow and take up remaining space, or set to `false`/0 to not grow.
   */
  grow?: boolean | number;
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
    | ((props: {
        column: MRT_Column<TData, TValue>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineColumnDragHandleProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineCopyButtonProps?:
    | ((props: {
        cell: MRT_Cell<TData, TValue>;
        column: MRT_Column<TData, TValue>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>);
  mantineEditSelectProps?:
    | ((props: {
        cell: MRT_Cell<TData, TValue>;
        column: MRT_Column<TData, TValue>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>);
  mantineEditTextInputProps?:
    | ((props: {
        cell: MRT_Cell<TData, TValue>;
        column: MRT_Column<TData, TValue>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineFilterAutocompleteProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>);
  mantineFilterCheckboxProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineFilterDateInputProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>);
  mantineFilterMultiSelectProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>);
  mantineFilterRangeSliderProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>);
  mantineFilterSelectProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
  mantineFilterTextInputProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineTableBodyCellProps?:
    | ((props: {
        cell: MRT_Cell<TData, TValue>;
        column: MRT_Column<TData, TValue>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  mantineTableFooterCellProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  mantineTableHeadCellProps?:
    | ((props: {
        column: MRT_Column<TData, TValue>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  renderColumnActionsMenuItems?: (props: {
    column: MRT_Column<TData, TValue>;
    internalColumnMenuItems: ReactNode;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderColumnFilterModeMenuItems?: (props: {
    column: MRT_Column<TData, TValue>;
    internalFilterOptions: MRT_InternalFilterOption[];
    onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  sortingFn?: MRT_SortingFn<TData>;
  visibleInShowHideMenu?: boolean;
};

export type MRT_DisplayColumnDef<
  TData extends MRT_RowData,
  TValue = unknown,
> = Omit<MRT_ColumnDef<TData, TValue>, 'accessorFn' | 'accessorKey'>;

export type MRT_GroupColumnDef<TData extends MRT_RowData> =
  MRT_DisplayColumnDef<TData, any> & {
    columns: MRT_ColumnDef<TData>[];
  };

export type MRT_DefinedColumnDef<
  TData extends MRT_RowData,
  TValue = unknown,
> = Omit<MRT_ColumnDef<TData, TValue>, 'defaultDisplayColumn' | 'id'> & {
  _filterFn: MRT_FilterOption;
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData, TValue>>;
  id: string;
};

export type MRT_Column<TData extends MRT_RowData, TValue = unknown> = Omit<
  Column<TData, unknown>,
  'columnDef' | 'columns' | 'filterFn' | 'footer' | 'header'
> & {
  columnDef: MRT_DefinedColumnDef<TData, TValue>;
  columns?: MRT_Column<TData>[];
  filterFn?: MRT_FilterFn<TData>;
  footer: string;
  header: string;
};

export type MRT_Header<TData extends MRT_RowData, TValue = unknown> = Omit<
  Header<TData, unknown>,
  'column'
> & {
  column: MRT_Column<TData, TValue>;
};

export type MRT_HeaderGroup<TData extends MRT_RowData> = Omit<
  HeaderGroup<TData>,
  'headers'
> & {
  headers: MRT_Header<TData>[];
};

export type MRT_Row<TData extends MRT_RowData> = Omit<
  Row<TData>,
  '_valuesCache' | 'getAllCells' | 'getVisibleCells' | 'subRows'
> & {
  _valuesCache: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
  getAllCells: () => MRT_Cell<TData>[];
  getVisibleCells: () => MRT_Cell<TData>[];
  subRows?: MRT_Row<TData>[];
};

export type MRT_Cell<TData extends MRT_RowData, TValue = unknown> = Omit<
  Cell<TData, TValue>,
  'column' | 'row'
> & {
  column: MRT_Column<TData, TValue>;
  row: MRT_Row<TData>;
};

export type MRT_AggregationOption = string & keyof typeof MRT_AggregationFns;

export type MRT_AggregationFn<TData extends MRT_RowData> =
  | AggregationFn<TData>
  | MRT_AggregationOption;

export type MRT_SortingOption = LiteralUnion<
  string & keyof typeof MRT_SortingFns
>;

export type MRT_SortingFn<TData extends MRT_RowData> =
  | MRT_SortingOption
  | SortingFn<TData>;

export type MRT_FilterOption = LiteralUnion<
  string & keyof typeof MRT_FilterFns
>;

export type MRT_FilterFn<TData extends MRT_RowData> =
  | FilterFn<TData>
  | MRT_FilterOption;

export type MRT_InternalFilterOption = {
  divider: boolean;
  label: string;
  option: string;
  symbol: string;
};

export type MRT_DisplayColumnIds =
  | 'mrt-row-actions'
  | 'mrt-row-drag'
  | 'mrt-row-expand'
  | 'mrt-row-numbers'
  | 'mrt-row-pin'
  | 'mrt-row-select'
  | 'mrt-row-spacer';

export type MRT_CreateTableFeature<
  TData extends MRT_RowData,
  TFeature = any,
> = (table: MRT_TableInstance<TData>) => TFeature;

/**
 * `columns` and `data` props are the only required props, but there are over 150 other optional props.
 *
 * See more info on creating columns and data on the official docs site:
 * @link https://www.mantine-react-table.com/docs/getting-started/usage
 *
 * See the full props list on the official docs site:
 * @link https://www.mantine-react-table.com/docs/api/table-options
 */
export type MRT_TableOptions<TData extends MRT_RowData> = Omit<
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
  columnFilterDisplayMode?: 'custom' | 'popover' | 'subheader';
  columnFilterModeOptions?: Array<
    LiteralUnion<string & MRT_FilterOption>
  > | null;
  columnVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  > | null>;
  columnVirtualizerOptions?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>)
    | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>;
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
  createDisplayMode?: 'custom' | 'modal' | 'row';
  /**
   * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
   *
   * See the usage guide for more info on creating columns and data:
   * @link https://www.mantine-react-table.com/docs/getting-started/usage
   */
  data: TData[];
  /**
   * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
   */
  defaultColumn?: Partial<MRT_ColumnDef<TData>>;
  /**
   * Change the default options for display columns.
   */
  defaultDisplayColumn?: Partial<MRT_DisplayColumnDef<TData>>;
  displayColumnDefOptions?: Partial<{
    [key in MRT_DisplayColumnIds]: Partial<MRT_DisplayColumnDef<TData>>;
  }>;
  editDisplayMode?: 'cell' | 'custom' | 'modal' | 'row' | 'table';
  enableBottomToolbar?: boolean;
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnDragging?: boolean;
  enableColumnFilterModes?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnVirtualization?: boolean;
  enableDensityToggle?: boolean;
  enableEditing?: ((row: MRT_Row<TData>) => boolean) | boolean;
  enableExpandAll?: boolean;
  enableFacetedValues?: boolean;
  enableFilterMatchHighlighting?: boolean;
  enableFullScreenToggle?: boolean;
  enableGlobalFilterModes?: boolean;
  enableGlobalFilterRankedResults?: boolean;
  enableIMEMode?: boolean;
  enablePagination?: boolean;
  enableRowActions?: boolean;
  enableRowDragging?: boolean;
  enableRowNumbers?: boolean;
  enableRowOrdering?: boolean;
  enableRowSelection?: ((row: MRT_Row<TData>) => boolean) | boolean;
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
  ) => string | undefined;
  globalFilterFn?: MRT_FilterOption;
  globalFilterModeOptions?: MRT_FilterOption[] | null;
  icons?: Partial<MRT_Icons>;
  initialState?: Partial<MRT_TableState<TData>>;
  /**
   * Changes which kind of CSS layout is used to render the table. `semantic` uses default semantic HTML elements, while `grid` adds CSS grid and flexbox styles
   */
  layoutMode?: 'grid' | 'grid-no-grow' | 'semantic';
  /**
   * Pass in either a locale imported from `mantine-react-table/locales/*` or a custom locale object.
   *
   * See the localization (i18n) guide for more info:
   * @link https://www.mantine-react-table.com/docs/guides/localization
   */
  localization?: Partial<MRT_Localization>;
  mantineBottomToolbarProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
    | (HTMLPropsRef<HTMLDivElement> & BoxProps);
  mantineColumnActionsButtonProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineColumnDragHandleProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineCopyButtonProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<UnstyledButtonProps>);
  mantineCreateRowModalProps?:
    | ((props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>)
    | (HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>);
  mantineDetailPanelProps?:
    | ((props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps);
  mantineEditRowModalProps?:
    | ((props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>)
    | (HTMLPropsRef<HTMLDivElement> & Partial<ModalProps>);
  mantineEditSelectProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
  mantineEditTextInputProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineExpandAllButtonProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineExpandButtonProps?:
    | ((props: {
        row: MRT_Row<TData>;
        staticRowIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineFilterAutocompleteProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>);
  mantineFilterCheckboxProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<CheckboxProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<CheckboxProps>);
  mantineFilterDateInputProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>);
  mantineFilterMultiSelectProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>);
  mantineFilterRangeSliderProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>);
  mantineFilterSelectProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
  mantineFilterTextInputProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        rangeFilterIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineHighlightProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLSpanElement> & Partial<HighlightProps>)
    | (HTMLPropsRef<HTMLSpanElement> & Partial<HighlightProps>);
  mantineLoadingOverlayProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & Partial<LoadingOverlayProps>)
    | (HTMLPropsRef<HTMLDivElement> & Partial<LoadingOverlayProps>);
  mantinePaginationProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => Partial<HTMLPropsRef<HTMLDivElement> & MRT_PaginationProps>)
    | Partial<HTMLPropsRef<HTMLDivElement> & MRT_PaginationProps>;
  mantinePaperProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & PaperProps)
    | (HTMLPropsRef<HTMLDivElement> & PaperProps);
  mantineProgressProps?:
    | ((props: {
        isTopToolbar: boolean;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & ProgressProps)
    | (HTMLPropsRef<HTMLDivElement> & ProgressProps);
  mantineRowDragHandleProps?:
    | ((props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>)
    | (HTMLPropsRef<HTMLButtonElement> & Partial<ActionIconProps>);
  mantineSearchTextInputProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>)
    | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  mantineSelectAllCheckboxProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> &
        (CheckboxProps | RadioProps | SwitchProps))
    | (HTMLPropsRef<HTMLInputElement> &
        (CheckboxProps | RadioProps | SwitchProps));
  mantineSelectCheckboxProps?:
    | ((props: {
        row: MRT_Row<TData>;
        staticRowIndex?: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLInputElement> &
        (CheckboxProps | RadioProps | SwitchProps))
    | (HTMLPropsRef<HTMLInputElement> &
        (CheckboxProps | RadioProps | SwitchProps));
  mantineSkeletonProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & SkeletonProps)
    | (HTMLPropsRef<HTMLDivElement> & SkeletonProps);
  mantineTableBodyCellProps?:
    | ((props: {
        cell: MRT_Cell<TData, unknown>;
        column: MRT_Column<TData, unknown>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  mantineTableBodyProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableSectionElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableSectionElement> & BoxProps);
  mantineTableBodyRowProps?:
    | ((props: {
        isDetailPanel?: boolean;
        row: MRT_Row<TData>;
        staticRowIndex: number;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableRowElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableRowElement> & BoxProps);
  mantineTableContainerProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
    | (HTMLPropsRef<HTMLDivElement> & BoxProps);
  mantineTableFooterCellProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  mantineTableFooterProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableSectionElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableSectionElement> & BoxProps);
  mantineTableFooterRowProps?:
    | ((props: {
        footerGroup: MRT_HeaderGroup<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableRowElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableRowElement> & BoxProps);
  mantineTableHeadCellProps?:
    | ((props: {
        column: MRT_Column<TData, unknown>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment)
    | (HTMLPropsRef<HTMLTableCellElement> & BoxProps & ColumnAlignment);
  mantineTableHeadProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableSectionElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableSectionElement> & BoxProps);
  mantineTableHeadRowProps?:
    | ((props: {
        headerGroup: MRT_HeaderGroup<TData>;
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableRowElement> & BoxProps)
    | (HTMLPropsRef<HTMLTableRowElement> & BoxProps);
  mantineTableProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLTableElement> & TableProps)
    | (HTMLPropsRef<HTMLTableElement> & TableProps);
  mantineToolbarAlertBannerBadgeProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & Partial<BadgeProps>)
    | (HTMLPropsRef<HTMLDivElement> & Partial<BadgeProps>);
  mantineToolbarAlertBannerProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & Partial<AlertProps>)
    | (HTMLPropsRef<HTMLDivElement> & Partial<AlertProps>);
  mantineTopToolbarProps?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => HTMLPropsRef<HTMLDivElement> & BoxProps)
    | (HTMLPropsRef<HTMLDivElement> & BoxProps);
  /**
   * Memoize cells, rows, or the entire table body to potentially improve render performance.
   *
   * @warning This will break some dynamic rendering features. See the memoization guide for more info:
   * @link https://www.mantine-react-table.com/docs/guides/memoize-components
   */
  memoMode?: 'cells' | 'rows' | 'table-body';
  onColumnFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterOption }>;
  onCreatingRowCancel?: (props: {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => void;
  onCreatingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
  onCreatingRowSave?: (props: {
    exitCreatingMode: () => void;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
    values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
  }) => void;
  onDensityChange?: OnChangeFn<MRT_DensityState>;
  onDraggingColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
  onDraggingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
  onEditingCellChange?: OnChangeFn<MRT_Cell<TData> | null>;
  onEditingRowCancel?: (props: {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => void;
  onEditingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
  onEditingRowSave?: (props: {
    exitEditingMode: () => void;
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
    values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
  }) => Promise<void> | void;
  onGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
  onHoveredColumnChange?: OnChangeFn<Partial<MRT_Column<TData>> | null>;
  onHoveredRowChange?: OnChangeFn<Partial<MRT_Row<TData>> | null>;
  onIsFullScreenChange?: OnChangeFn<boolean>;
  onShowAlertBannerChange?: OnChangeFn<boolean>;
  onShowColumnFiltersChange?: OnChangeFn<boolean>;
  onShowGlobalFilterChange?: OnChangeFn<boolean>;
  onShowToolbarDropZoneChange?: OnChangeFn<boolean>;
  paginationDisplayMode?: 'custom' | 'default' | 'pages';
  positionActionsColumn?: 'first' | 'last';
  positionCreatingRow?: 'bottom' | 'top' | number;
  positionExpandColumn?: 'first' | 'last';
  positionGlobalFilter?: 'left' | 'none' | 'right';
  positionPagination?: 'both' | 'bottom' | 'none' | 'top';
  positionToolbarAlertBanner?: 'bottom' | 'head-overlay' | 'none' | 'top';
  positionToolbarDropZone?: 'both' | 'bottom' | 'none' | 'top';
  renderBottomToolbar?:
    | ((props: { table: MRT_TableInstance<TData> }) => ReactNode)
    | ReactNode;
  renderBottomToolbarCustomActions?: (props: {
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderColumnActionsMenuItems?: (props: {
    column: MRT_Column<TData, unknown>;
    internalColumnMenuItems: ReactNode;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderColumnFilterModeMenuItems?: (props: {
    column: MRT_Column<TData, unknown>;
    internalFilterOptions: MRT_InternalFilterOption[];
    onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderCreateRowModalContent?: (props: {
    internalEditComponents: ReactNode[];
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderDetailPanel?: (props: {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderEditRowModalContent?: (props: {
    internalEditComponents: ReactNode[];
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderEmptyRowsFallback?: (props: {
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderGlobalFilterModeMenuItems?: (props: {
    internalFilterOptions: MRT_InternalFilterOption[];
    onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderRowActionMenuItems?: (props: {
    row: MRT_Row<TData>;
    staticRowIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderRowActions?: (props: {
    cell: MRT_Cell<TData, unknown>;
    row: MRT_Row<TData>;
    staticRowIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderToolbarAlertBannerContent?: (props: {
    groupedAlert: ReactNode | null;
    selectedAlert: ReactNode | null;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderToolbarInternalActions?: (props: {
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  renderTopToolbar?:
    | ((props: { table: MRT_TableInstance<TData> }) => ReactNode)
    | ReactNode;
  renderTopToolbarCustomActions?: (props: {
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  rowCount?: number;
  rowNumberDisplayMode?: 'original' | 'static';
  rowPinningDisplayMode?:
    | 'bottom'
    | 'select-bottom'
    | 'select-sticky'
    | 'select-top'
    | 'sticky'
    | 'top'
    | 'top-and-bottom';
  rowVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
    HTMLDivElement,
    HTMLTableRowElement
  > | null>;
  rowVirtualizerOptions?:
    | ((props: {
        table: MRT_TableInstance<TData>;
      }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>)
    | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>;
  selectAllMode?: 'all' | 'page';
  selectDisplayMode?: 'checkbox' | 'radio' | 'switch';
  /**
   * Manage state externally any way you want, then pass it back into MRT.
   */
  state?: Partial<MRT_TableState<TData>>;
};
