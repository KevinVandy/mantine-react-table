import React, { DragEvent, useEffect } from 'react';
import { Flex, Text, Transition } from '@mantine/core';
import type { MRT_TableInstance } from '..';
import { getPrimaryShade } from '../column.utils';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarDropZone = <TData extends Record<string, any> = {}>({
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
          !grouping.includes(draggingColumn.id),
      );
    }
  }, [enableGrouping, draggingColumn, grouping]);

  return (
    <Transition mounted={showToolbarDropZone} transition="fade">
      {(styles) => (
        <Flex
          className="Mui-ToolbarDropZone"
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: theme.fn.rgba(
              theme.colors[theme.primaryColor][getPrimaryShade(theme)],
              hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
            ),
            border: `dashed ${
              theme.colors[theme.primaryColor][getPrimaryShade(theme)]
            } 2px`,
            justifyContent: 'center',
            height: 'calc(100%)',
            position: 'absolute',
            width: 'calc(100%)',
            zIndex: 2,
          })}
          onDragEnter={handleDragEnter}
          style={styles}
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
