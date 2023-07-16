import { useEffect, useRef, useState } from 'react';
import { RangeSlider, type RangeSliderProps } from '@mantine/core';
import { type MRT_TableInstance, type MRT_Header } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeSlider = <TData extends Record<string, any> = {}>({
  header,
  table,
}: Props<TData>) => {
  const {
    options: { mantineFilterRangeSliderProps },
    refs: { filterInputRefs },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const mFilterRangeSliderProps =
    mantineFilterRangeSliderProps instanceof Function
      ? mantineFilterRangeSliderProps({
          column,
          table,
        })
      : mantineFilterRangeSliderProps;

  const mcFilterRangeSliderProps =
    columnDef.mantineFilterRangeSliderProps instanceof Function
      ? columnDef.mantineFilterRangeSliderProps({
          column,
          table,
        })
      : columnDef.mantineFilterRangeSliderProps;

  const rangeSliderProps = {
    ...mFilterRangeSliderProps,
    ...mcFilterRangeSliderProps,
  } as RangeSliderProps;

  let [min, max] =
    rangeSliderProps.min !== undefined && rangeSliderProps.max !== undefined
      ? [rangeSliderProps.min, rangeSliderProps.max]
      : column.getFacetedMinMaxValues() ?? [0, 1];

  //fix potential TanStack Table bugs where min or max is an array
  if (Array.isArray(min)) min = min[0];
  if (Array.isArray(max)) max = max[0];
  if (min === null) min = 0;
  if (max === null) max = 1;

  const [filterValues, setFilterValues] = useState<[number, number]>([
    min,
    max,
  ]);
  const columnFilterValue = column.getFilterValue() as
    | [number, number]
    | undefined;

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (columnFilterValue === undefined) {
        setFilterValues([min, max]);
      } else if (Array.isArray(columnFilterValue)) {
        setFilterValues(columnFilterValue);
      }
    }
    isMounted.current = true;
  }, [columnFilterValue, min, max]);

  return (
    <RangeSlider
      min={min}
      max={max}
      onChange={(values) => {
        setFilterValues(values as [number, number]);
      }}
      onChangeEnd={(values) => {
        if (Array.isArray(values)) {
          if (values[0] <= min && values[1] >= max) {
            //if the user has selected the entire range, remove the filter
            column.setFilterValue(undefined);
          } else {
            column.setFilterValue(values as [number, number]);
          }
        }
      }}
      value={filterValues}
      {...rangeSliderProps}
      ref={(node) => {
        if (node) {
          //@ts-ignore
          filterInputRefs.current[`${column.id}-0`] = node;
          // @ts-ignore
          if (rangeSliderProps?.ref) {
            //@ts-ignore
            rangeSliderProps.ref = node;
          }
        }
      }}
      sx={(theme) => ({
        margin: 'auto',
        marginTop: '16px',
        marginBottom: '6px',
        width: 'calc(100% - 8px)',
        ...(rangeSliderProps?.sx instanceof Function
          ? rangeSliderProps.sx(theme)
          : (rangeSliderProps?.sx as any)),
      })}
    />
  );
};
