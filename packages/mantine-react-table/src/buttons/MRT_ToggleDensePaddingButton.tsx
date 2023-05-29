import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const commonStyles = {
  transform: 'rotate(90deg)',
};

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
        IconTallymark1,
        IconTallymark2,
        IconTallymark3,
        IconTallymark4,
        IconTallymarks,
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
    <Tooltip
      withinPortal
      withArrow
      label={rest?.title ?? localization.toggleDensity}
    >
      <ActionIcon
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        size="lg"
        {...rest}
        title={undefined}
      >
        {density === 'xs' ? (
          <IconTallymarks style={commonStyles} />
        ) : density === 'sm' ? (
          <IconTallymark4 style={commonStyles} />
        ) : density === 'md' ? (
          <IconTallymark3 style={commonStyles} />
        ) : density === 'lg' ? (
          <IconTallymark2 style={commonStyles} />
        ) : (
          <IconTallymark1 style={commonStyles} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
