import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

const sizes = ['xs', 'md', 'xl'] as const;

export const MRT_ToggleDensePaddingButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: {
        IconBaselineDensityLarge,
        IconBaselineDensityMedium,
        IconBaselineDensitySmall,
      },
      localization,
    },
    setDensity,
  } = table;
  const { density } = getState();

  const handleToggleDensePadding = () => {
    setDensity(sizes[(sizes.indexOf(density) - 1) % sizes.length] ?? 'xl');
  };

  return (
    <Tooltip withinPortal label={rest?.title ?? localization.toggleDensity}>
      <ActionIcon
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        size="lg"
        {...rest}
        title={undefined}
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
