import React from 'react';
import { Box } from '@mantine/core';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mantine/core';
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
          <IconButton onClick={() => handlePinColumn(false)} size="small">
            <PushPinIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip withArrow label={localization.pinToLeft}>
            <IconButton onClick={() => handlePinColumn('left')} size="small">
              <PushPinIcon
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip withArrow label={localization.pinToRight}>
            <IconButton onClick={() => handlePinColumn('right')} size="small">
              <PushPinIcon
                style={{
                  transform: 'rotate(-90deg)',
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
