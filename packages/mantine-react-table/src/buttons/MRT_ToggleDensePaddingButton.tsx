import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import {
  type MRT_DensityState,
  type HTMLPropsRef,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

const next: Record<MRT_DensityState, MRT_DensityState> = {
  xs: 'xl',
  md: 'xs',
  xl: 'md',
};

export const MRT_ToggleDensePaddingButton = <
  TData extends Record<string, any> = {},
>({
  table: {
    getState,
    options: {
      icons: {
        IconBaselineDensityLarge,
        IconBaselineDensityMedium,
        IconBaselineDensitySmall,
      },
      localization: { toggleDensity },
    },
    setDensity,
  },
  title,
  ...rest
}: Props<TData>) => {
  const { density } = getState();

  return (
    <Tooltip withinPortal label={title ?? toggleDensity}>
      <ActionIcon
        color="gray"
        size="lg"
        variant="subtle"
        aria-label={title ?? toggleDensity}
        onClick={() => setDensity((current) => next[current])}
        {...rest}
      >
        {density === 'xs' ? (
          <IconBaselineDensitySmall />
        ) : density === 'md' ? (
          <IconBaselineDensityMedium />
        ) : (
          <IconBaselineDensityLarge />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
