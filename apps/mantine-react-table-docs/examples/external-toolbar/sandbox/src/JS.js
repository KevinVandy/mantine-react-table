import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
} from 'mantine-react-table';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  rgba,
} from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { data } from './makeData';

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
  },
];

const Example = () => {
  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: { showGlobalFilter: true },
  });

  return (
    <Box style={{ border: 'gray 2px dashed', padding: '16px' }}>
      {/* Our Custom External Top Toolbar */}
      <Flex
        style={(theme) => ({
          backgroundColor: rgba(theme.colors.blue[3], 0.2),
          borderRadius: '4px',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'space-between',
          padding: '24px 16px',
          '@media max-width: 768px': {
            flexDirection: 'column',
          },
        })}
      >
        <Box>
          <Button
            color="lightblue"
            onClick={() => {
              alert('Add User');
            }}
            variant="filled"
          >
            Crete New Account
          </Button>
        </Box>
        <MRT_GlobalFilterTextInput table={table} />
        <Flex gap="xs" align="center">
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <Tooltip label="Print">
            <ActionIcon onClick={() => window.print()}>
              <IconPrinter />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Flex>
      {/* Some Page Content */}
      <Text p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Text>
      {/* The MRT Table with no toolbars built-in */}
      <MRT_TableContainer table={table} />
      {/* Our Custom Bottom Toolbar */}
      <Box>
        <Flex justify="flex-end">
          <MRT_TablePagination table={table} />
        </Flex>
        <Box style={{ display: 'grid', width: '100%' }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default Example;
