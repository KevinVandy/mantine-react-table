import {
  type RankingInfo,
  rankings,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { filterFns, type Row } from '@tanstack/react-table';

import {
  type MRT_FilterOption,
  type MRT_Localization,
  type MRT_RowData,
} from '../types';

const parseComparableNumber = (value: unknown): null | number => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value;
  }

  if (value instanceof Date) {
    const timestamp = value.getTime();
    return Number.isNaN(timestamp) ? null : timestamp;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    const asNumber = Number(trimmed);
    if (!Number.isNaN(asNumber)) {
      return asNumber;
    }

    const timestamp = Date.parse(trimmed);
    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }

    return null;
  }

  if (typeof value === 'object') {
    const primitive = (value as { valueOf?: () => unknown }).valueOf?.();
    if (primitive !== undefined && primitive !== value) {
      return parseComparableNumber(primitive);
    }
  }

  return null;
};

const normalizeStringValue = (value: unknown): string =>
  value?.toString?.().toLowerCase().trim() ?? '';

const compareValues = (a: unknown, b: unknown): number => {
  const aNumber = parseComparableNumber(a);
  const bNumber = parseComparableNumber(b);

  if (aNumber !== null && bNumber !== null) {
    if (aNumber === bNumber) return 0;
    return aNumber > bNumber ? 1 : -1;
  }

  const aString = normalizeStringValue(a);
  const bString = normalizeStringValue(b);

  if (aString === bString) return 0;
  return aString > bString ? 1 : -1;
};

const isNullishFilterValue = (value: unknown) =>
  value === undefined || value === null || value === '';

const fuzzy = <TData extends MRT_RowData>(
  row: Row<TData>,
  columnId: string,
  filterValue: number | string,
  addMeta: (item: RankingInfo) => void,
) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue as string, {
    threshold: rankings.MATCHES,
  });
  addMeta(itemRank);
  return itemRank.passed;
};

fuzzy.autoRemove = (val: any) => !val;

const contains = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) =>
  normalizeStringValue(row.getValue(id)).includes(
    normalizeStringValue(filterValue),
  );

contains.autoRemove = (val: any) => !val;

const startsWith = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) =>
  normalizeStringValue(row.getValue(id)).startsWith(
    normalizeStringValue(filterValue),
  );

startsWith.autoRemove = (val: any) => !val;

const endsWith = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) =>
  normalizeStringValue(row.getValue(id)).endsWith(
    normalizeStringValue(filterValue),
  );

endsWith.autoRemove = (val: any) => !val;

const equals = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => compareValues(row.getValue(id), filterValue) === 0;

equals.autoRemove = (val: any) => !val;

const notEquals = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => normalizeStringValue(row.getValue(id)) !== normalizeStringValue(filterValue);

notEquals.autoRemove = (val: any) => !val;

const greaterThan = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => compareValues(row.getValue(id), filterValue) > 0;

greaterThan.autoRemove = (val: any) => !val;

const greaterThanOrEqualTo = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => compareValues(row.getValue(id), filterValue) >= 0;

greaterThanOrEqualTo.autoRemove = (val: any) => !val;

const lessThan = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => compareValues(row.getValue(id), filterValue) < 0;

lessThan.autoRemove = (val: any) => !val;

const lessThanOrEqualTo = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValue: number | string,
) => compareValues(row.getValue(id), filterValue) <= 0;

lessThanOrEqualTo.autoRemove = (val: any) => !val;

const between = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValues: [number | string, number | string],
) => {
  const [min, max] = filterValues;

  if (isNullishFilterValue(min) && isNullishFilterValue(max)) {
    return true;
  }

  if (!isNullishFilterValue(min) && compareValues(row.getValue(id), min) <= 0) {
    return false;
  }

  if (!isNullishFilterValue(max) && compareValues(row.getValue(id), max) >= 0) {
    return false;
  }

  return true;
};

between.autoRemove = (val: any) => !val;

const betweenInclusive = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  filterValues: [number | string, number | string],
) => {
  const [min, max] = filterValues;

  if (isNullishFilterValue(min) && isNullishFilterValue(max)) {
    return true;
  }

  if (
    !isNullishFilterValue(min) &&
    compareValues(row.getValue(id), min) < 0
  ) {
    return false;
  }

  if (
    !isNullishFilterValue(max) &&
    compareValues(row.getValue(id), max) > 0
  ) {
    return false;
  }

  return true;
};

betweenInclusive.autoRemove = (val: any) => !val;

const empty = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  _filterValue: number | string,
) => !row.getValue<number | string>(id)?.toString().trim();

empty.autoRemove = (val: any) => !val;

const notEmpty = <TData extends MRT_RowData>(
  row: Row<TData>,
  id: string,
  _filterValue: number | string,
) => !!row.getValue<number | string>(id)?.toString().trim();

notEmpty.autoRemove = (val: any) => !val;

export const MRT_FilterFns = {
  ...filterFns,
  between,
  betweenInclusive,
  contains,
  empty,
  endsWith,
  equals,
  fuzzy,
  greaterThan,
  greaterThanOrEqualTo,
  lessThan,
  lessThanOrEqualTo,
  notEmpty,
  notEquals,
  startsWith,
};

export function localizedFilterOption(
  localization: MRT_Localization,
  option: MRT_FilterOption,
) {
  if (!option) {
    return '';
  }
  const key = `filter${option[0].toUpperCase()}${option.slice(1)}`;
  return localization[key as keyof MRT_Localization] ?? '';
}
