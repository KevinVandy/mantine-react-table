import { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Box, Button, Menu, Text, Title } from '@mantine/core';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import { data } from './makeData';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue, row }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Email',
            size: 300,
          },
        ],
      },
      {
        id: 'id',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            header: 'Salary',
            size: 200,
            filterVariant: 'range-slider',
            mantineFilterRangeSliderProps: {
              color: 'indigo',
              label: (value) =>
                value?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
            },
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                style={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.colors.red[9]
                      : cell.getValue<number>() >= 50_000 &&
                        cell.getValue<number>() < 75_000
                      ? theme.colors.yellow[9]
                      : theme.colors.green[9],
                  borderRadius: '4px',
                  color: '#fff',
                  maxWidth: '9ch',
                  padding: '4px',
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: 'jobTitle', //hey a simple column for once
            header: 'Job Title',
            filterVariant: 'multi-select',
            size: 350,
          },
          {
            accessorFn: (row) => {
              //convert to Date for sorting and filtering
              const sDay = new Date(row.startDate);
              sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
              return sDay;
            },
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date-range',
            sortingFn: 'datetime',
            enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          },
        ],
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      initialState={{ showColumnFilters: true }}
      paginationDisplayMode="pages"
      positionToolbarAlertBanner="bottom"
      renderDetailPanel={({ row }) => (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
          }}
        >
          <img
            alt="avatar"
            height={200}
            src={row.original.avatar}
            style={{ borderRadius: '50%' }}
          />
          <Box style={{ textAlign: 'center' }}>
            <Title>Signature Catch Phrase:</Title>
            <Text>&quot;{row.original.signatureCatchPhrase}&quot;</Text>
          </Box>
        </Box>
      )}
      renderRowActionMenuItems={() => (
        <>
          <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
          <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
        </>
      )}
      renderTopToolbarCustomActions={({ table }) => {
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('deactivating ' + row.getValue('name'));
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('activating ' + row.getValue('name'));
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert('contact ' + row.getValue('name'));
          });
        };

        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              color="red"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="filled"
            >
              Deactivate
            </Button>
            <Button
              color="green"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="filled"
            >
              Activate
            </Button>
            <Button
              color="blue"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="filled"
            >
              Contact
            </Button>
          </div>
        );
      }}
    />
  );
};

export default Example;
