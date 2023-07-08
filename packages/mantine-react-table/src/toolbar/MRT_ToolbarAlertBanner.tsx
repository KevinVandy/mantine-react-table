import { Fragment } from 'react';
import {
  IconButton,
  Alert,
  Badge,
  Box,
  Collapse,
  Flex,
} from '@chakra-ui/react';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  stackAlertBanner: boolean | boolean[];
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
  console.log({ IconX });
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
                <IconButton
                  aria-label="close"
                  onClick={() => table.getColumn(columnId).toggleGrouping()}
                  size="xs"
                  icon={<IconX />}
                />
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
      // TODO: figure it out how to set duration transition for the collapse component
      // transitionDuration={stackAlertBanner ? 200 : 0}
    >
      <Alert
        colorScheme="blue"
        {...alertProps}
        style={{
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
          ...(alertProps?.sx as any),
          // ...(alertProps?.sx instanceof Function
          //   ? alertProps.sx(theme)
          //   : (alertProps?.sx as any)),
        }}
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
