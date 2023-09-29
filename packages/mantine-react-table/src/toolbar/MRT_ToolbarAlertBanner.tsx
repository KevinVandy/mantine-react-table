import { Fragment } from 'react';
import { ActionIcon, Alert, Badge, Collapse, Flex, Stack } from '@mantine/core';
import clsx from 'clsx';
import { type MRT_TableInstance } from '../types';
import { MRT_SelectCheckbox } from '../inputs';
import classes from './MRT_ToolbarAlertBanner.module.css';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any> = {}> {
  stackAlertBanner?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends Record<string, any> = {}>({
  stackAlertBanner,
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      enableRowSelection,
      enableSelectAll,
      icons: { IconX },
      localization,
      mantineToolbarAlertBannerBadgeProps,
      mantineToolbarAlertBannerProps,
      positionToolbarAlertBanner,
      renderToolbarAlertBannerContent,
      rowCount,
    },
  } = table;
  const { grouping, showAlertBanner, density } = getState();

  const alertProps = parseFromValuesOrFunc(mantineToolbarAlertBannerProps, {
    table,
  });
  const badgeProps = parseFromValuesOrFunc(
    mantineToolbarAlertBannerBadgeProps,
    { table },
  );

  const selectedAlert =
    getSelectedRowModel().rows.length > 0
      ? localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            getSelectedRowModel().rows.length.toString(),
          )
          ?.replace(
            '{rowCount}',
            (rowCount ?? getPrePaginationRowModel().rows.length).toString(),
          )
      : null;

  const groupedAlert =
    grouping.length > 0 ? (
      <Flex>
        {localization.groupedBy}{' '}
        {grouping.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenBy : ''}
            <Badge
              rightSection={
                <ActionIcon
                  onClick={() => table.getColumn(columnId).toggleGrouping()}
                  size="xs"
                >
                  <IconX />
                </ActionIcon>
              }
              style={{ marginLeft: '1ch' }}
              variant="filled"
              {...badgeProps}
            >
              {table.getColumn(columnId).columnDef.header}{' '}
            </Badge>
          </Fragment>
        ))}
      </Flex>
    ) : null;

  return (
    <Collapse
      in={showAlertBanner || !!selectedAlert || !!groupedAlert}
      transitionDuration={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="blue"
        icon={false}
        {...alertProps}
        className={clsx(
          classes['alert'],
          stackAlertBanner &&
            !positionToolbarAlertBanner &&
            classes['alert-stacked'],
          !stackAlertBanner &&
            positionToolbarAlertBanner &&
            classes['alert-bottom'],
          alertProps?.className,
        )}
        style={(theme) => ({
          ...parseFromValuesOrFunc(alertProps, theme),
        })}
        __vars={alertProps?.__vars}
      >
        {renderToolbarAlertBannerContent?.({
          groupedAlert,
          selectedAlert,
          table,
        }) ?? (
          <Flex
            className={classes['toolbar-alert']}
            style={{
              '--mrt-toolbar-alert-padding':
                positionToolbarAlertBanner === 'head-overlay'
                  ? density === 'xl'
                    ? '16px'
                    : density === 'md'
                    ? '8px'
                    : '2px'
                  : '8px 16px',
            }}
          >
            {enableRowSelection &&
              enableSelectAll &&
              positionToolbarAlertBanner === 'head-overlay' && (
                <MRT_SelectCheckbox selectAll table={table} />
              )}
            <Stack>
              {alertProps?.children}
              {alertProps?.children && (selectedAlert || groupedAlert) && (
                <br />
              )}
              {selectedAlert}
              {selectedAlert && groupedAlert && <br />}
              {groupedAlert}
            </Stack>
          </Flex>
        )}
      </Alert>
    </Collapse>
  );
};
