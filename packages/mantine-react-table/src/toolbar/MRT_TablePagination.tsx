import { ActionIcon, Flex, Select, type Sx, Text } from '@mantine/core';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  position?: 'top' | 'bottom';
  table: MRT_TableInstance<TData>;
}

const commonActionButtonStyles: Sx = {
  userSelect: 'none',
  '&:disabled': {
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export const MRT_TablePagination = <TData extends Record<string, any> = {}>({
  table,
  position = 'bottom',
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: {
      enableToolbarInternalActions,
      icons: { IconChevronLeft, IconChevronRight },
      localization,
      mantinePaginationProps,
      rowCount,
    },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const paginationProps =
    mantinePaginationProps instanceof Function
      ? mantinePaginationProps({ table })
      : mantinePaginationProps;

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const showFirstLastPageButtons =
    totalRowCount / pageSize > 2 &&
    paginationProps?.showFirstLastPageButtons !== false;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="lg"
      py="xs"
      px="sm"
      mt={
        position === 'top' && enableToolbarInternalActions && !showGlobalFilter
          ? '3rem'
          : undefined
      }
      p="relative"
      sx={{ zIndex: 2 }}
      {...paginationProps}
    >
      {paginationProps?.showRowsPerPage !== false && (
        <Select
          data={
            paginationProps?.rowsPerPageOptions ?? [
              '5',
              '10',
              '15',
              '20',
              '25',
              '30',
              '50',
              '100',
            ]
          }
          label={localization.rowsPerPage}
          onChange={(value: string) => setPageSize(+value)}
          value={pageSize.toString()}
          sx={{
            '@media (min-width: 720px)': {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            },
            '& .mantine-Select-input': {
              width: '90px',
            },
          }}
          withinPortal
        />
      )}
      <Text>{`${lastRowIndex === 0 ? 0 : firstRowIndex + 1}-${lastRowIndex} ${
        localization.of
      } ${totalRowCount}`}</Text>
      <Flex gap="xs">
        {showFirstLastPageButtons && (
          <ActionIcon
            aria-label={localization.goToFirstPage}
            disabled={pageIndex <= 0}
            onClick={() => setPageIndex(0)}
            sx={commonActionButtonStyles}
          >
            <b style={{ transform: 'translate(2px, -1.5px)' }}>|</b>
            <IconChevronLeft />
          </ActionIcon>
        )}
        <ActionIcon
          aria-label={localization.goToPreviousPage}
          disabled={pageIndex <= 0}
          onClick={() => setPageIndex(pageIndex - 1)}
          sx={commonActionButtonStyles}
        >
          <IconChevronLeft />
        </ActionIcon>
        <ActionIcon
          aria-label={localization.goToNextPage}
          disabled={lastRowIndex >= totalRowCount}
          onClick={() => setPageIndex(pageIndex + 1)}
          sx={commonActionButtonStyles}
        >
          <IconChevronRight />
        </ActionIcon>
        {showFirstLastPageButtons && (
          <ActionIcon
            aria-label={localization.goToLastPage}
            disabled={lastRowIndex >= totalRowCount}
            onClick={() =>
              setPageIndex(Math.ceil(totalRowCount / pageSize) - 1)
            }
            sx={commonActionButtonStyles}
          >
            <IconChevronRight />
            <b style={{ transform: 'translate(-2px, -1.5px)' }}>|</b>
          </ActionIcon>
        )}
      </Flex>
    </Flex>
  );
};
