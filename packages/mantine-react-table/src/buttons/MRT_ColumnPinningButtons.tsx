import React from 'react';
import { ActionIcon, Box, Tooltip } from '@mantine/core';
import type { MRT_Column, MRT_TableInstance } from '..';

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
      icons: { PushPinIcon },
      localization,
    },
  } = table;

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  return (
    <Box sx={{ minWidth: '70px', textAlign: 'center' }}>
      {column.getIsPinned() ? (
        <Tooltip withArrow label={localization.unpin}>
          <ActionIcon onClick={() => handlePinColumn(false)} size="sm">
            <PushPinIcon />
          </ActionIcon>
        </Tooltip>
      ) : (
        <>
          <Tooltip withArrow label={localization.pinToLeft}>
            <ActionIcon onClick={() => handlePinColumn('left')} size="sm">
              <PushPinIcon
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label={localization.pinToRight}>
            <ActionIcon onClick={() => handlePinColumn('right')} size="sm">
              <PushPinIcon
                style={{
                  transform: 'rotate(-90deg)',
                }}
              />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
