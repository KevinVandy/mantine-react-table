import { useState } from 'react';
import { type Meta } from '@storybook/react';
import {
  MantineReactTable,
  MRT_EditActionButtons,
  type MRT_Cell,
  type MRT_TableOptions,
  type MRT_ColumnOrderState,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Flex, Stack, Switch, Title } from '@mantine/core';

const meta: Meta = {
  title: 'Features/Editing Examples',
};

export default meta;

const usStates = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

const data: Person[] = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingEnabledEditModeModalDefault = () => {
  const [tableData, setTableData] = useState(data);
  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  const columns = [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Phone Number',
      accessorKey: 'phoneNumber',
      enableEditing: false,
    },
  ];

  return (
    <MantineReactTable
      columns={columns}
      data={tableData}
      enableEditing
      enableRowNumbers
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeRow = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      enableEditing
      editDisplayMode="row"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeCell = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    //@ts-ignore
    tableData[cell.row.index][cell.column.id] = value;
    setTableData([...tableData]);
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      editDisplayMode="cell"
      enableEditing
      mantineEditTextInputProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
    />
  );
};

export const EditingEnabledEditModeTable = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: string) => {
    //@ts-ignore
    tableData[+cell.row.index][cell.column.id] = value;
    setTableData([...tableData]);
    console.info('saved cell with value: ', value);
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="table"
      enableEditing
      mantineEditTextInputProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
    />
  );
};

export const EditingEnabledEditModeCustom = () => {
  const [tableData] = useState(data);

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="custom"
      enableEditing
    />
  );
};

export const CustomEditModal = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: string) => {
    //@ts-ignore
    tableData[+cell.row.index][cell.column.id] = value;
    setTableData([...tableData]);
    console.info('saved cell with value: ', value);
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="modal"
      enableEditing
      mantineEditTextInputProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
      renderEditRowModalContent={({ internalEditComponents, row, table }) => {
        return (
          <Stack>
            <Title order={5}>My Custom Edit Modal</Title>
            {internalEditComponents}
            <Flex justify="flex-end">
              <MRT_EditActionButtons row={row} table={table} variant="text" />
            </Flex>
          </Stack>
        );
      }}
    />
  );
};

export const EditSelectVariant = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    row,
    values,
    exitEditingMode,
  }) => {
    tableData[+row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
          editVariant: 'select',
          mantineEditSelectProps: {
            data: usStates as any,
          },
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="row"
      enableRowActions
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditSelectVariantAlternate = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    row,
    values,
    exitEditingMode,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
          editVariant: 'select',
          mantineEditSelectProps: {
            data: [
              { value: 'Alabama', label: 'AL' },
              { value: 'Alaska', label: 'AK' },
              { value: 'American Samoa', label: 'AS' },
              { value: 'Arizona', label: 'AZ' },
              { value: 'Arkansas', label: 'AR' },
              { value: 'California', label: 'CA' },
              { value: 'Colorado', label: 'CO' },
              { value: 'Connecticut', label: 'CT' },
              { value: 'Delaware', label: 'DE' },
              { value: 'Florida', label: 'FL' },
              { value: 'Georgia', label: 'GA' },
              { value: 'Guam', label: 'GU' },
              { value: 'Hawaii', label: 'HI' },
              { value: 'Idaho', label: 'ID' },
              { value: 'Illinois', label: 'IL' },
              { value: 'Indiana', label: 'IN' },
              { value: 'Iowa', label: 'IA' },
              { value: 'Kansas', label: 'KS' },
              { value: 'Kentucky', label: 'KY' },
              { value: 'Louisiana', label: 'LA' },
              { value: 'Maine', label: 'ME' },
              { value: 'Maryland', label: 'MD' },
              { value: 'Massachusetts', label: 'MA' },
              { value: 'Michigan', label: 'MI' },
              { value: 'Minnesota', label: 'MN' },
              { value: 'Mississippi', label: 'MS' },
              { value: 'Missouri', label: 'MO' },
              { value: 'Montana', label: 'MT' },
              { value: 'Nebraska', label: 'NE' },
              { value: 'Nevada', label: 'NV' },
              { value: 'New Hampshire', label: 'NH' },
              { value: 'New Jersey', label: 'NJ' },
              { value: 'New Mexico', label: 'NM' },
              { value: 'New York', label: 'NY' },
              { value: 'North Carolina', label: 'NC' },
              { value: 'North Dakota', label: 'ND' },
              { value: 'Northern Mariana Islands', label: 'MP' },
              { value: 'Ohio', label: 'OH' },
              { value: 'Oklahoma', label: 'OK' },
              { value: 'Oregon', label: 'OR' },
              { value: 'Pennsylvania', label: 'PA' },
              { value: 'Puerto Rico', label: 'PR' },
              { value: 'Rhode Island', label: 'RI' },
              { value: 'South Carolina', label: 'SC' },
            ] as any,
          },
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="row"
      enableRowActions
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingCustomizeInput = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    row,
    values,
    exitEditingMode,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  const usStates = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
          editVariant: 'select',
          mantineEditSelectProps: {
            data: usStates.map((state) => ({ value: state, label: state })),
            variant: 'filled',
            description: 'Select state (optional)',
          },
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      mantineEditTextInputProps={{
        withAsterisk: true,
      }}
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};

// export const EditingWithValidation = () => {
//   const [tableData, setTableData] = useState(data);
//   const [firstNameError, setFirstNameError] = useState<string | boolean>(false);
//   const [lastNameError, setLastNameError] = useState<string | boolean>(false);
//   const [phoneNumberError, setPhoneNumberError] = useState<string | boolean>(
//     false,
//   );

//   const handleSaveRow = ({ row, values }) => {
//     tableData[row.index] = values;
//     setTableData([...tableData]);
//   };

//   const validateFirstName = (value: string) => {
//     if (value.length === 0) return 'First name is required';
//     return false;
//   };

//   const validateLastName = (value: string) => {
//     if (value.length === 0) return 'Last name is required';
//     return false;
//   };

//   const validatePhoneNumber = (value: string) => {
//     if (value.length === 0) return 'Phone number is required';
//     if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/))
//       return 'Invalid phone number';
//     return false;
//   };

//   return (
//     <MantineReactTable
//       columns={[
//         {
//           header: 'First Name',
//           accessorKey: 'firstName',
//           mantineEditTextInputProps: {
//             error: !!firstNameError,
//             helperlabel: firstNameError,
//           },
//           onCellEditChange: ({ event }) => {
//             setFirstNameError(validateFirstName(event.target.value));
//           },
//         },
//         {
//           header: 'Last Name',
//           accessorKey: 'lastName',
//           mantineEditTextInputProps: {
//             error: !!lastNameError,
//             helperlabel: lastNameError,
//           },
//           onCellEditChange: ({ event }) => {
//             setLastNameError(validateLastName(event.target.value));
//           },
//         },
//         {
//           header: 'Phone Number',
//           accessorKey: 'phoneNumber',
//           mantineEditTextInputProps: {
//             error: !!phoneNumberError,
//             helperlabel: phoneNumberError,
//           },
//           onCellEditChange: ({ event }) => {
//             setPhoneNumberError(validatePhoneNumber(event.target.value));
//           },
//         },
//       ]}
//       data={tableData}
//       enableRowActions
//       enableEditing
//       onEditingRowSave={handleSaveRow}
//     />
//   );
// };

export const EditingEnabledAsync = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    row,
    values,
    exitEditingMode,
  }) => {
    setIsSaving(true);
    setTimeout(() => {
      tableData[row.index] = values;
      setTableData([...tableData]);
      setIsSaving(false);
      exitEditingMode();
    }, 1500);
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      onEditingRowSave={handleSaveRow}
      state={{
        isSaving,
      }}
    />
  );
};

export const EditingEnabledAsyncRow = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    row,
    values,
    exitEditingMode,
  }) => {
    setIsSaving(true);
    setTimeout(() => {
      tableData[row.index] = values;
      setTableData([...tableData]);
      setIsSaving(false);
      exitEditingMode();
    }, 1500);
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      editDisplayMode="row"
      enableEditing
      enableRowActions
      onEditingRowSave={handleSaveRow}
      state={{
        isSaving,
      }}
    />
  );
};

const nestedData = [...Array(10)].map(() => ({
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingNestedData = () => {
  const [tableData, setTableData] = useState(() => nestedData);

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorFn: (row) => row.name.firstName,
          id: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'name.lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      enableEditing
      onEditingRowSave={({ row, values, exitEditingMode }) => {
        tableData[row.index] = {
          name: {
            firstName: values.firstName,
            lastName: values['name.lastName'],
          },
          address: row._valuesCache.address,
          state: row._valuesCache.state,
          phoneNumber: row._valuesCache.phoneNumber,
        };
        setTableData([...tableData]);
        exitEditingMode();
      }}
    />
  );
};

export const EditingEnabledEditModeTableWithGroupedRows = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: false,
        },
      ]}
      data={tableData}
      enableEditing
      enableGrouping
      editDisplayMode="table"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionally = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editDisplayMode="row"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionallyCell = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editDisplayMode="cell"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EnableEditingConditionallyTable = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MantineReactTable
      columns={[
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
          enableEditing: (row) => row.original.state.includes('N'),
        },
      ]}
      data={tableData}
      enableEditing={(row) => row.index % 2 === 0}
      editDisplayMode="table"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingTurnedOnDynamically = () => {
  const [tableData, setTableData] = useState(data);
  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  const columns = [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Phone Number',
      accessorKey: 'phoneNumber',
      enableEditing: false,
    },
  ];

  const [enableRowNumbers, _setEnableRowNumbers] = useState(false);
  const [enableEditing, _setEnableEditing] = useState(false);

  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(() => {
    return [
      enableEditing && 'mrt-row-actions',
      enableRowNumbers && 'mrt-row-numbers',
      ...columns.map((c) => c.accessorKey),
    ].filter(Boolean) as MRT_ColumnOrderState;
  });

  const updateColumnOrder = ({
    enableEditing,
    enableRowNumbers,
  }: {
    enableEditing: boolean;
    enableRowNumbers: boolean;
  }) => {
    let newColumnOrder = columnOrder;
    if (enableRowNumbers) {
      newColumnOrder = ['mrt-row-numbers', ...newColumnOrder];
    } else {
      newColumnOrder = newColumnOrder.filter(
        (col) => col !== 'mrt-row-numbers',
      );
    }
    if (enableEditing) {
      newColumnOrder = ['mrt-row-actions', ...newColumnOrder];
    } else {
      newColumnOrder = newColumnOrder.filter(
        (col) => col !== 'mrt-row-actions',
      );
    }
    setColumnOrder(newColumnOrder);
  };

  const setEnableEditing = (value: boolean) => {
    _setEnableEditing(value);
    updateColumnOrder({
      enableEditing: value,
      enableRowNumbers,
    });
  };

  const setEnableRowNumbers = (value: boolean) => {
    _setEnableRowNumbers(value);
    updateColumnOrder({
      enableEditing,
      enableRowNumbers: value,
    });
  };

  return (
    <Stack>
      <Switch
        checked={enableEditing}
        onChange={(e) => setEnableEditing(e.currentTarget.checked)}
        label="Enable Editing"
      />{' '}
      <Switch
        checked={enableRowNumbers}
        onChange={(e) => setEnableRowNumbers(e.currentTarget.checked)}
        label="Enable Row Numbers"
      />
      <MantineReactTable
        columns={columns}
        data={tableData}
        enableEditing={enableEditing}
        enableRowNumbers={enableRowNumbers}
        onEditingRowSave={handleSaveRow}
        state={{ columnOrder }}
        onColumnOrderChange={setColumnOrder}
      />
    </Stack>
  );
};
