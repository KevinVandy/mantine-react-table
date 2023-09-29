import { ActionIcon, Flex, Pagination, Select, Text } from '@mantine/core';
import { type MRT_TableInstance } from '../types';
import { funcValue } from '../funcValue';
import classes from './MRT_TablePagination.module.css';

interface Props<TData extends Record<string, any> = {}> {
  position?: 'top' | 'bottom';
  table: MRT_TableInstance<TData>;
}

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

  const paginationProps = funcValue(mantinePaginationProps, { table });

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons =
    numberOfPages > 2 && paginationProps?.withEdges !== false;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  return (
    <Flex
      className={classes['paginator-container']}
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
          className={classes['paginator-select']}
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
                className={classes['action-buttons']}
                variant="transparent"
              >
                <IconChevronLeftPipe />
              </ActionIcon>
            )}
            <ActionIcon
              aria-label={localization.goToPreviousPage}
              disabled={pageIndex <= 0}
              onClick={() => setPageIndex(pageIndex - 1)}
              className={classes['action-buttons']}
              variant="transparent"
            >
              <IconChevronLeft />
            </ActionIcon>
            <ActionIcon
              aria-label={localization.goToNextPage}
              disabled={lastRowIndex >= totalRowCount}
              onClick={() => setPageIndex(pageIndex + 1)}
              className={classes['action-buttons']}
              variant="transparent"
            >
              <IconChevronRight />
            </ActionIcon>
            {showFirstLastPageButtons && (
              <ActionIcon
                aria-label={localization.goToLastPage}
                disabled={lastRowIndex >= totalRowCount}
                onClick={() => setPageIndex(numberOfPages - 1)}
                className={classes['action-buttons']}
                variant="transparent"
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
