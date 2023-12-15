import { useState } from 'react';
import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';

import {
  type MRT_RowData,
  type HTMLPropsRef,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFullScreenButton = <TData extends MRT_RowData>({
  table: {
    getState,
    options: {
      icons: { IconMinimize, IconMaximize },
      localization: { toggleFullScreen },
    },
    setIsFullScreen,
  },
  title,
  ...rest
}: Props<TData>) => {
  const { isFullScreen } = getState();
  const [tooltipOpened, setTooltipOpened] = useState(false);

  const handleToggleFullScreen = () => {
    setTooltipOpened(false);
    setIsFullScreen((current) => !current);
  };

  return (
    <Tooltip
      opened={tooltipOpened}
      withinPortal
      label={title ?? toggleFullScreen}
    >
      <ActionIcon
        color="gray"
        size="lg"
        variant="subtle"
        aria-label={title ?? toggleFullScreen}
        onClick={handleToggleFullScreen}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        {...rest}
      >
        {isFullScreen ? <IconMinimize /> : <IconMaximize />}
      </ActionIcon>
    </Tooltip>
  );
};
