import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { ActionIcon, type ActionIconProps } from '@mantine/core';

import classes from './MRT_ActionIcon.module.css';

type Props = PropsWithChildren<ActionIconProps>;

export function MRT_ActionIcon({
  children,
  className,
  ...actionIconProps
}: Props) {
  return (
    <ActionIcon
      className={clsx(className, classes.ai)}
      size="sm"
      {...actionIconProps}
    >
      {children}
    </ActionIcon>
  );
}
