import clsx from 'clsx';
import { type DragEvent, useEffect } from 'react';
import { Flex, Text, Transition } from '@mantine/core';

import { type MRT_RowData, type MRT_TableInstance } from '../types';

import classes from './MRT_ToolbarDropZone.module.css';

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarDropZone = <TData extends MRT_RowData>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { enableGrouping, localization },
    setHoveredColumn,
    setShowToolbarDropZone,
  } = table;

  const { draggingColumn, hoveredColumn, grouping, showToolbarDropZone } =
    getState();

  const handleDragEnter = (_event: DragEvent<HTMLDivElement>) => {
    setHoveredColumn({ id: 'drop-zone' });
  };

  useEffect(() => {
    if (table.options.state?.showToolbarDropZone !== undefined) {
      setShowToolbarDropZone(
        !!enableGrouping &&
          !!draggingColumn &&
          draggingColumn.columnDef.enableGrouping !== false &&
          !grouping.includes(draggingColumn.id),
      );
    }
  }, [enableGrouping, draggingColumn, grouping]);

  return (
    <Transition mounted={showToolbarDropZone} transition="fade">
      {() => (
        <Flex
          className={clsx(
            'mrt-toolbar-dropzone',
            classes.root,
            hoveredColumn?.id === 'drop-zone' && classes.hovered,
          )}
          onDragEnter={handleDragEnter}
        >
          <Text>
            {localization.dropToGroupBy.replace(
              '{column}',
              draggingColumn?.columnDef?.header ?? '',
            )}
          </Text>
        </Flex>
      )}
    </Transition>
  );
};
