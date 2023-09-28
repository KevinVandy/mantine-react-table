import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { ActionIcon, type ActionIconProps } from '@mantine/core';

import classes from './MRT_ActionIcon.module.css';
import { type PolymorphicComponentProps } from '@mantine/core/lib/core/factory/create-polymorphic-component';

type Props<C = 'button'> = PropsWithChildren<
  PolymorphicComponentProps<C, ActionIconProps>
>;

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
