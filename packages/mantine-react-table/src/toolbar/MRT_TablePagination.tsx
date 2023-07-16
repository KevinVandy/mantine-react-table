import {
  ActionIcon,
  Flex,
  Pagination,
  Select,
  Text,
  type Sx,
} from '@mantine/core';
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
      icons: {
        IconChevronLeftPipe,
        IconChevronRightPipe,
        IconChevronLeft,
        IconChevronRight,
      },
      localization,
      mantinePaginationProps,
      paginationDisplayMode,
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
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons =
    numberOfPages > 2 && paginationProps?.withEdges !== false;
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
              width: '80px',
            },
          }}
          withinPortal
        />
      )}
      {paginationDisplayMode === 'pages' ? (
        <Pagination
          onChange={(newPageIndex) => setPageIndex(newPageIndex - 1)}
          total={numberOfPages}
          value={pageIndex + 1}
          withEdges={showFirstLastPageButtons}
          nextIcon={IconChevronRight}
          previousIcon={IconChevronLeft}
          firstIcon={IconChevronLeftPipe}
          lastIcon={IconChevronRightPipe}
          {...paginationProps}
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Text>{`${
            lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
          }-${lastRowIndex.toLocaleString()} ${
            localization.of
          } ${totalRowCount.toLocaleString()}`}</Text>
          <Flex gap="xs">
            {showFirstLastPageButtons && (
              <ActionIcon
                aria-label={localization.goToFirstPage}
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex(0)}
                sx={commonActionButtonStyles}
              >
                <IconChevronLeftPipe />
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
                onClick={() => setPageIndex(numberOfPages - 1)}
                sx={commonActionButtonStyles}
              >
                <IconChevronRightPipe />
              </ActionIcon>
            )}
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};
