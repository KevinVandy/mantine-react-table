import {
  type Dispatch,
  type DragEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react';
import { Box, Menu, Switch, Tooltip, Text } from '@mantine/core';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { getPrimaryColor, reorderColumn } from '../column.utils';
import { type MRT_Column, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}> {
  allColumns: MRT_Column<TData>[];
  column: MRT_Column<TData>;
  hoveredColumn: MRT_Column<TData> | null;
  isSubMenu?: boolean;
  setHoveredColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsMenuItems = <
  TData extends Record<string, any> = {},
>({
  allColumns,
  hoveredColumn,
  setHoveredColumn,
  column,
  isSubMenu,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableColumnOrdering,
      enableHiding,
      enablePinning,
      localization,
    },
    setColumnOrder,
  } = table;
  const { columnOrder } = getState();
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const switchChecked =
    (columnDefType !== 'group' && column.getIsVisible()) ||
    (columnDefType === 'group' &&
      column.getLeafColumns().some((col) => col.getIsVisible()));

  const handleToggleColumnHidden = (column: MRT_Column<TData>) => {
    if (columnDefType === 'group') {
      column?.columns?.forEach?.((childColumn: MRT_Column<TData>) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
  };

  const menuItemRef = useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(menuItemRef.current as HTMLElement, 0, 0);
  };

  const handleDragEnd = (_e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    setHoveredColumn(null);
    if (hoveredColumn) {
      setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
    }
  };

  const handleDragEnter = (_e: DragEvent) => {
    if (!isDragging && columnDef.enableColumnOrdering !== false) {
      setHoveredColumn(column);
    }
  };

  return (
    <>
      <Menu.Item
        component="span"
        ref={menuItemRef as any}
        onDragEnter={handleDragEnter}
        sx={(theme) => ({
          alignItems: 'center',
          cursor: 'default',
          justifyContent: 'flex-start',
          opacity: isDragging ? 0.5 : 1,
          outline: isDragging
            ? `1px dashed ${theme.colors.gray[7]}`
            : hoveredColumn?.id === column.id
            ? `2px dashed ${getPrimaryColor(theme)}`
            : 'none',
          paddingLeft: `${(column.depth + 0.5) * 2}rem`,
          paddingTop: '6px',
          paddingBottom: '6px',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '8px',
          }}
        >
          {!isSubMenu &&
            columnDefType !== 'group' &&
            enableColumnOrdering &&
            !allColumns.some(
              (col) => col.columnDef.columnDefType === 'group',
            ) &&
            (columnDef.enableColumnOrdering !== false ? (
              <MRT_GrabHandleButton
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                table={table}
              />
            ) : (
              <Box sx={{ width: '22px' }} />
            ))}
          {!isSubMenu &&
            enablePinning &&
            (column.getCanPin() ? (
              <MRT_ColumnPinningButtons column={column} table={table} />
            ) : (
              <Box sx={{ width: '70px' }} />
            ))}
          {enableHiding ? (
            <Tooltip
              withinPortal
              openDelay={1000}
              label={localization.toggleVisibility}
            >
              <Switch
                checked={switchChecked}
                disabled={(isSubMenu && switchChecked) || !column.getCanHide()}
                label={columnDef.header}
                onChange={() => handleToggleColumnHidden(column)}
                sx={{
                  cursor: 'pointer !important',
                }}
              />
            </Tooltip>
          ) : (
            <Text sx={{ alignSelf: 'center' }}>{columnDef.header}</Text>
          )}
        </Box>
      </Menu.Item>
      {column.columns?.map((c: MRT_Column<TData>, i) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          column={c}
          hoveredColumn={hoveredColumn}
          isSubMenu={isSubMenu}
          key={`${i}-${c.id}`}
          setHoveredColumn={setHoveredColumn}
          table={table}
        />
      ))}
    </>
  );
};
