import clsx from 'clsx';
import { type DragEventHandler } from 'react';
import { type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';
import { MRT_ActionIcon } from './MRT_ActionIcon';

import classes from './MRT_GrabHandleButton.module.css';

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
  table: {
    options: {
      icons: { IconGripHorizontal },
      localization: { move },
    },
  },
}: Props<TData>) => {
  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={actionIconProps?.title ?? move}
    >
      <MRT_ActionIcon
        aria-label={actionIconProps?.title ?? move}
        draggable
        {...actionIconProps}
        onClick={(e) => {
          e.stopPropagation();
          actionIconProps?.onClick?.(e);
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={clsx(
          'mrt-grab-handle-button',
          classes.root,
          actionIconProps?.className,
        )}
        title={undefined}
      >
        <IconGripHorizontal />
      </MRT_ActionIcon>
    </Tooltip>
  );
};
