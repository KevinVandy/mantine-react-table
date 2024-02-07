import clsx from 'clsx';
import classes from './MRT_ExpandButton.module.css';
import { type MouseEvent } from 'react';
import {
  ActionIcon,
  type ActionIconProps,
  Tooltip,
  useDirection,
} from '@mantine/core';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

interface Props<TData extends MRT_RowData> extends ActionIconProps {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ExpandButton = <TData extends MRT_RowData>({
  row,
  table,
  ...rest
}: Props<TData>) => {
  const direction = useDirection();
  const {
    options: {
      icons: { IconChevronDown },
      localization,
      mantineExpandButtonProps,
      positionExpandColumn,
      renderDetailPanel,
    },
  } = table;

  const actionIconProps = {
    ...parseFromValuesOrFunc(mantineExpandButtonProps, {
      row,
      table,
    }),
    ...rest,
  };
  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const DetailPanel = !!renderDetailPanel?.({ row, table });

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    actionIconProps?.onClick?.(event);
  };

  const rtl = direction.dir === 'rtl' || positionExpandColumn === 'last';

  return (
    <Tooltip
      disabled={!canExpand && !DetailPanel}
      label={
        actionIconProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
      openDelay={1000}
      withinPortal
    >
      <ActionIcon
        aria-label={localization.expand}
        color="gray"
        disabled={!canExpand && !DetailPanel}
        variant="subtle"
        {...actionIconProps}
        __vars={{
          '--mrt-row-depth': `${row.depth}`,
        }}
        className={clsx(
          'mrt-expand-button',
          classes.root,
          classes[`root-${rtl ? 'rtl' : 'ltr'}`],
          actionIconProps?.className,
        )}
        onClick={handleToggleExpand}
        title={undefined}
      >
        {actionIconProps?.children ?? (
          <IconChevronDown
            className={clsx(
              'mrt-expand-button-chevron',
              classes.chevron,
              !canExpand && !renderDetailPanel
                ? classes.right
                : isExpanded
                  ? classes.up
                  : undefined,
            )}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
