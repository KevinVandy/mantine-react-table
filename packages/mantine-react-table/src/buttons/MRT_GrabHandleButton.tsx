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
        color="gray"
        size="sm"
        variant="transparent"
        {...actionIconProps}
        onClick={(e) => {
          e.stopPropagation();
          actionIconProps?.onClick?.(e);
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={(theme) => ({
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
          // ...styleValue(actionIconProps, theme),
        })}
        title={undefined}
      >
        <IconGripHorizontal />
      </ActionIcon>
    </Tooltip>
  );
};
