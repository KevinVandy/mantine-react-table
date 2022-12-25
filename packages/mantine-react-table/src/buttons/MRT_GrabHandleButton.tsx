import React, { DragEventHandler } from 'react';
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  iconButtonProps?: ActionIconProps;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends Record<string, any> = {}>({
  iconButtonProps,
  onDragEnd,
  onDragStart,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { DragHandleIcon },
      localization,
    },
  } = table;

  return (
    <Tooltip
      withArrow
      openDelay={1000}
      position="top"
      label={iconButtonProps?.title ?? localization.move}
    >
      <ActionIcon
        draggable="true"
        size="sm"
        {...iconButtonProps}
        onClick={(e) => {
          e.stopPropagation();
          iconButtonProps?.onClick?.(e);
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sx={(theme) => ({
          cursor: 'grab',
          m: '0 -0.1rem',
          opacity: 0.5,
          p: '2px',
          transition: 'all 150ms ease-in-out',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 1,
          },
          '&:active': {
            cursor: 'grabbing',
          },
          ...(iconButtonProps?.sx instanceof Function
            ? iconButtonProps?.sx(theme)
            : (iconButtonProps?.sx as any)),
        })}
        title={undefined}
      >
        <DragHandleIcon />
      </ActionIcon>
    </Tooltip>
  );
};
