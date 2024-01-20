import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import {
  type HTMLPropsRef,
  type MRT_DensityState,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';

interface Props<TData extends MRT_RowData>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

const next: Record<MRT_DensityState, MRT_DensityState> = {
  md: 'xs',
  xl: 'md',
  xs: 'xl',
};

export const MRT_ToggleDensePaddingButton = <TData extends MRT_RowData>({
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
    <Tooltip label={title ?? toggleDensity} withinPortal>
      <ActionIcon
        aria-label={title ?? toggleDensity}
        color="gray"
        onClick={() => setDensity((current) => next[current])}
        size="lg"
        variant="subtle"
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
