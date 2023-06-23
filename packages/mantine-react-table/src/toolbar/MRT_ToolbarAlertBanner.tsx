import { Fragment } from 'react';
import { ActionIcon, Alert, Badge, Box, Collapse, Flex } from '@mantine/core';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  stackAlertBanner: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends Record<string, any>>({
  stackAlertBanner,
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      icons: { IconX },
      localization,
      mantineToolbarAlertBannerProps,
      mantineToolbarAlertBannerBadgeProps,
      positionToolbarAlertBanner,
      rowCount,
    },
  } = table;
  const { grouping, showAlertBanner } = getState();

  const alertProps =
    mantineToolbarAlertBannerProps instanceof Function
      ? mantineToolbarAlertBannerProps({ table })
      : mantineToolbarAlertBannerProps;

  const badgeProps =
    mantineToolbarAlertBannerBadgeProps instanceof Function
      ? mantineToolbarAlertBannerBadgeProps({ table })
      : mantineToolbarAlertBannerBadgeProps;

  const selectMessage =
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

  const groupedByMessage =
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
              sx={{ marginLeft: '1ch' }}
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
      in={showAlertBanner || !!selectMessage || !!groupedByMessage}
      transitionDuration={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="blue"
        icon={false}
        {...alertProps}
        sx={(theme) => ({
          borderRadius: 0,
          fontSize: '16px',
          left: 0,
          position: 'relative',
          marginBottom: stackAlertBanner
            ? 0
            : positionToolbarAlertBanner === 'bottom'
            ? '-16px'
            : undefined,
          padding: '8px',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 2,
          ...(alertProps?.sx instanceof Function
            ? alertProps.sx(theme)
            : (alertProps?.sx as any)),
        })}
      >
        {alertProps?.title && <Box>{alertProps.title}</Box>}
        <Flex sx={{ padding: '8px 16px' }}>
          {alertProps?.children}
          {alertProps?.children && (selectMessage || groupedByMessage) && (
            <br />
          )}
          {selectMessage}
          {selectMessage && groupedByMessage && <br />}
          {groupedByMessage}
        </Flex>
      </Alert>
    </Collapse>
  );
};
