import { type DragEventHandler } from 'react';
import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  actionIconProps?: ActionIconProps & HTMLPropsRef<HTMLButtonElement>;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends Record<string, any> = {}>({
  actionIconProps,
  onDragEnd,
  onDragStart,
  table,
}: Props<TData>) => {
  const {
    options: {
      icons: { IconGripHorizontal },
      localization,
    },
  } = table;

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={actionIconProps?.title ?? localization.move}
    >
      <ActionIcon
        draggable="true"
        size="sm"
        aria-label={actionIconProps?.title ?? localization.move}
        {...actionIconProps}
        onClick={(e) => {
          e.stopPropagation();
          actionIconProps?.onClick?.(e);
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sx={(theme) => ({
          cursor: 'grab',
          margin: '0 -0.16px',
          opacity: 0.5,
          padding: '2px',
          transition: 'opacity 100ms ease-in-out',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 1,
          },
          '&:active': {
            cursor: 'grabbing',
          },
          ...(actionIconProps?.sx instanceof Function
            ? actionIconProps?.sx(theme)
            : (actionIconProps?.sx as any)),
        })}
        title={undefined}
      >
        <IconGripHorizontal />
      </ActionIcon>
    </Tooltip>
  );
};
