import clsx from 'clsx';
import { Flex, Tooltip } from '@mantine/core';

import { type MRT_Column, type MRT_TableInstance } from '../types';
import { MRT_ActionIcon } from './MRT_ActionIcon';

import classes from './MRT_ColumnPinningButtons.module.css';

interface Props<TData extends Record<string, any> = {}> {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnPinningButtons = <
  TData extends Record<string, any> = {},
>({
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
          <MRT_ActionIcon onClick={() => column.pin(false)} size="md">
            <IconPinnedOff />
          </MRT_ActionIcon>
        </Tooltip>
      ) : (
        <>
          <Tooltip withinPortal label={localization.pinToLeft}>
            <MRT_ActionIcon onClick={() => column.pin('left')} size="md">
              <IconPinned className={classes.left} />
            </MRT_ActionIcon>
          </Tooltip>
          <Tooltip withinPortal label={localization.pinToRight}>
            <MRT_ActionIcon onClick={() => column.pin('right')} size="md">
              <IconPinned className={classes.right} />
            </MRT_ActionIcon>
          </Tooltip>
        </>
      )}
    </Flex>
  );
};
