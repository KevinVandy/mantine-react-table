import { useState } from 'react';
import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import {
  type HTMLPropsRef,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFullScreenButton = <TData extends MRT_RowData>({
  table: {
    getState,
    options: {
      icons: { IconMaximize, IconMinimize },
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
      label={title ?? toggleFullScreen}
      opened={tooltipOpened}
      withinPortal
    >
      <ActionIcon
        aria-label={title ?? toggleFullScreen}
        color="gray"
        onClick={handleToggleFullScreen}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        size="lg"
        variant="subtle"
        {...rest}
      >
        {isFullScreen ? <IconMinimize /> : <IconMaximize />}
      </ActionIcon>
    </Tooltip>
  );
};
