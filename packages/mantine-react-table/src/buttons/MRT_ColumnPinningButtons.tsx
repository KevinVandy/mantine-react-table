import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { type MRT_Column, type MRT_TableInstance } from '../types';
import classes from './MRT_ColumnPinningButtons.module.css';

interface Props<TData extends Record<string, any> = {}> {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnPinningButtons = <
  TData extends Record<string, any> = {},
>({
  column,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { IconPinned, IconPinnedOff },
      localization,
    },
  } = table;

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  return (
    <Flex className={classes.container}>
      {column.getIsPinned() ? (
        <Tooltip withinPortal label={localization.unpin}>
          <ActionIcon
            color="gray"
            variant="transparent"
            onClick={() => handlePinColumn(false)}
            size="md"
          >
            <IconPinnedOff />
          </ActionIcon>
        </Tooltip>
      ) : (
        <>
          <Tooltip withinPortal label={localization.pinToLeft}>
            <ActionIcon
              color="gray"
              variant="transparent"
              onClick={() => handlePinColumn('left')}
              size="md"
            >
              <IconPinned
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip withinPortal label={localization.pinToRight}>
            <ActionIcon
              onClick={() => handlePinColumn('right')}
              size="md"
              color="gray"
              variant="transparent"
            >
              <IconPinned
                style={{
                  transform: 'rotate(-90deg)',
                }}
              />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Flex>
  );
};
