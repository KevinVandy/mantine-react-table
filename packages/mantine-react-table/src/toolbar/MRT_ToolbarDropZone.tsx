import React, { DragEvent, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Text, Transition } from '@mantine/core';
import { MRT_TableInstance } from '..';

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
        <Box
          className="Mui-ToolbarDropZone"
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: alpha(
              theme.colors.blue[7],
              hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
            ),
            border: `dashed ${theme.colors.blue[7]} 2px`,
            display: 'flex',
            justifyContent: 'center',
            height: 'calc(100% - 4px)',
            position: 'absolute',
            width: 'calc(100% - 4px)',
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
        </Box>
      )}
    </Transition>
  );
};
