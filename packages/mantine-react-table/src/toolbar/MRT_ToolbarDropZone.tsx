import { type DragEvent, useEffect } from 'react';
import { Flex, ScaleFade, Text } from '@chakra-ui/react';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarDropZone = <TData extends Record<string, any>>({
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
    <ScaleFade in={showToolbarDropZone}>
      <Flex
        className="mantine-ToolbarDropZone"
        alignItems="center"
        backgroundColor={
          hoveredColumn?.id === 'drop-zone' ? 'gray.700' : 'gray.900'
        }
        border="2px dashed"
        justifyContent="center"
        height="calc(100%)"
        position="absolute"
        width="calc(100%)"
        zIndex={2}
        style={
          {
            // backgroundColor: theme.fn.rgba(
            //   getPrimaryColor(theme),
            //   hoveredColumn?.id === 'drop-zone' ? 0.2 : 0.1,
            // ),
          }
        }
        onDragEnter={handleDragEnter}
      >
        <Text>
          {localization.dropToGroupBy.replace(
            '{column}',
            draggingColumn?.columnDef?.header ?? '',
          )}
        </Text>
      </Flex>
    </ScaleFade>
  );
};
