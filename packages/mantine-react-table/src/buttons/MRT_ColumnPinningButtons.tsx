import clsx from 'clsx';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';

import {
  type MRT_RowData,
  type MRT_Column,
  type MRT_TableInstance,
  type MRT_CellValue,
} from '../types';

import classes from './MRT_ColumnPinningButtons.module.css';

interface Props<TData extends MRT_RowData, TValue = MRT_CellValue> {
  column: MRT_Column<TData, TValue>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnPinningButtons = <TData extends MRT_RowData>({
  column,
  table: {
    options: {
      icons: { IconPinned, IconPinnedOff },
      localization,
    },
  },
}: Props<TData>) => {
  return (
    <Flex className={clsx('mrt-column-pinning-buttons', classes.root)}>
      {column.getIsPinned() ? (
        <Tooltip withinPortal label={localization.unpin}>
          <ActionIcon
            onClick={() => column.pin(false)}
            color="gray"
            variant="default"
            size="md"
          >
            <IconPinnedOff />
          </ActionIcon>
        </Tooltip>
      ) : (
        <>
          <Tooltip withinPortal label={localization.pinToLeft}>
            <ActionIcon
              onClick={() => column.pin('left')}
              color="gray"
              variant="default"
              size="md"
            >
              <IconPinned className={classes.left} />
            </ActionIcon>
          </Tooltip>
          <Tooltip withinPortal label={localization.pinToRight}>
            <ActionIcon
              onClick={() => column.pin('right')}
              color="gray"
              variant="default"
              size="md"
            >
              <IconPinned className={classes.right} />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Flex>
  );
};
