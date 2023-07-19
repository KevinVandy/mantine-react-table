import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';
import { useState } from 'react';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFullScreenButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { IconMinimize, IconMaximize },
      localization,
    },
    setIsFullScreen,
  } = table;
  const { isFullScreen } = getState();

  const [tooltipOpened, setTooltipOpened] = useState(false);

  const handleToggleFullScreen = () => {
    setTooltipOpened(false);
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Tooltip
      opened={tooltipOpened}
      withinPortal
      label={rest?.title ?? localization.toggleFullScreen}
    >
      <ActionIcon
        aria-label={localization.toggleFullScreen}
        onClick={handleToggleFullScreen}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        size="lg"
        {...rest}
        title={undefined}
      >
        {isFullScreen ? <IconMinimize /> : <IconMaximize />}
      </ActionIcon>
    </Tooltip>
  );
};
