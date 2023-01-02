import React from 'react';
import { ActionIcon, Flex, Select, Sx, Text } from '@mantine/core';
import type { MRT_TableInstance } from '..';

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
      rowCount,
    },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const showFirstLastPageButtons = totalRowCount / pageSize > 2;
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
    >
      <Select
        data={['5', '10', '15', '20', '25', '30', '50', '100']}
        label={localization.rowsPerPage}
        onChange={(value: string) => setPageSize(+value)}
        value={pageSize.toString()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '& .mantine-Select-input': {
            width: '80px',
          },
        }}
      />
      <Text>{`${firstRowIndex + 1}-${lastRowIndex} ${
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
            <b style={{ transform: 'translate(4px, -1.5px)' }}>|</b>
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
            <b style={{ transform: 'translate(-4px, -1.5px)' }}>|</b>
          </ActionIcon>
        )}
      </Flex>
    </Flex>
  );
};
