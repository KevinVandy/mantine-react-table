import {
  type Dispatch,
  type DragEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Menu,
  Switch,
  Tooltip,
  Text,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { getPrimaryColor, reorderColumn } from '../column.utils';
import { type MRT_Column, type MRT_TableInstance } from '../types';

import classes from './MRT_ShowHideColumnsMenuItems.module.css';

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
  const theme = useMantineTheme();
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
        __vars={{
          '--_column-depth': rem(column.depth),
          '--_hover-color': getPrimaryColor(theme),
        }}
        onDragEnter={handleDragEnter}
        className={classes.root}
        data-dragging={isDragging || undefined}
        data-hovered={
          (!isDragging && hoveredColumn?.id === column.id) || undefined
        }
      >
        <Box className={classes.menu}>
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
              <Box className={classes.grab} />
            ))}
          {!isSubMenu &&
            enablePinning &&
            (column.getCanPin() ? (
              <MRT_ColumnPinningButtons column={column} table={table} />
            ) : (
              <Box className={classes.pin} />
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
                className={classes.switch}
              />
            </Tooltip>
          ) : (
            <Text className={classes.header}>{columnDef.header}</Text>
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
