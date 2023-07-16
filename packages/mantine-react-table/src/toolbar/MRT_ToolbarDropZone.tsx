import { type DragEvent, useEffect } from 'react';
import { Flex, Text, Transition } from '@mantine/core';
import { type MRT_TableInstance } from '../types';
import { getPrimaryColor } from '../column.utils';

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
          draggingColumn.columnDef.enableGrouping !== false &&
          !grouping.includes(draggingColumn.id),
      );
    }
  }, [enableGrouping, draggingColumn, grouping]);

  return (
    <Transition mounted={showToolbarDropZone} transition="fade">
      {(styles) => (
        <Flex
          className="mantine-ToolbarDropZone"
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: theme.fn.rgba(
              getPrimaryColor(theme),
              hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
            ),
            border: `dashed ${getPrimaryColor(theme)} 2px`,
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
