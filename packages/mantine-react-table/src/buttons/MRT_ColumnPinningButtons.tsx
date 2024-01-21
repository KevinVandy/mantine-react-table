import clsx from 'clsx';
import classes from './MRT_ColumnPinningButtons.module.css';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import {
  type MRT_CellValue,
  type MRT_Column,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

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
        <Tooltip label={localization.unpin} withinPortal>
          <ActionIcon
            color="gray"
            onClick={() => column.pin(false)}
            size="md"
            variant="default"
          >
            <IconPinnedOff />
          </ActionIcon>
        </Tooltip>
      ) : (
        <ActionIcon.Group>
          <Tooltip label={localization.pinToLeft} withinPortal>
            <ActionIcon
              color="gray"
              onClick={() => column.pin('left')}
              size="md"
              variant="default"
            >
              <IconPinned className={classes.left} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={localization.pinToRight} withinPortal>
            <ActionIcon
              color="gray"
              onClick={() => column.pin('right')}
              size="md"
              variant="default"
            >
              <IconPinned className={classes.right} />
            </ActionIcon>
          </Tooltip>
        </ActionIcon.Group>
      )}
    </Flex>
  );
};
