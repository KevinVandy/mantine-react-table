import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { MantineReactTable, MantineReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';
// import { Menu } from '@mantine/core';

const meta: Meta = {
  title: 'Features/Editing Examples',
};

export default meta;

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const EditingEnabledEditModeModalDefault = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
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
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeRow = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
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
      editingMode="row"
      onEditingRowSave={handleSaveRow}
    />
  );
};

export const EditingEnabledEditModeCell = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell, value) => {
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
      editingMode="cell"
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

  const handleSaveCell = (cell, value) => {
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
      editingMode="table"
      enableEditing
      mantineEditTextInputProps={({ cell }) => ({
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
    />
  );
};

export const EditingCustomizeInput = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ row, values }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
  };

  // const usStates = [
  //   'Alabama',
  //   'Alaska',
  //   'American Samoa',
  //   'Arizona',
  //   'Arkansas',
  //   'California',
  //   'Colorado',
  //   'Connecticut',
  //   'Delaware',
  //   'Florida',
  //   'Georgia',
  //   'Guam',
  //   'Hawaii',
  //   'Idaho',
  //   'Illinois',
  //   'Indiana',
  //   'Iowa',
  //   'Kansas',
  //   'Kentucky',
  //   'Louisiana',
  //   'Maine',
  //   'Maryland',
  //   'Massachusetts',
  //   'Michigan',
  //   'Minnesota',
  //   'Mississippi',
  //   'Missouri',
  //   'Montana',
  //   'Nebraska',
  //   'Nevada',
  //   'New Hampshire',
  //   'New Jersey',
  //   'New Mexico',
  //   'New York',
  //   'North Carolina',
  //   'North Dakota',
  //   'Ohio',
  //   'Oklahoma',
  //   'Oregon',
  //   'Palau',
  //   'Pennsylvania',
  //   'Rhode Island',
  //   'South Carolina',
  //   'South Dakota',
  //   'Tennessee',
  //   'Texas',
  //   'Utah',
  //   'Vermont',
  //   'Virgin Island',
  //   'Virginia',
  //   'Washington',
  //   'West Virginia',
  //   'Wisconsin',
  //   'Wyoming',
  // ];

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
          // mantineEditTextInputProps: () => ({
          //   children: usStates.map((state) => (
          //     <Menu.Item key={state} value={state}>
          //       {state}
          //     </Menu.Item>
          //   )),
          //   select: true,
          // }),
        },
        {
          header: 'Phone Number',
          accessorKey: 'phoneNumber',
        },
      ]}
      data={tableData}
      enableRowActions
      enableEditing
      mantineEditTextInputProps={{ variant: 'filled' }}
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
//             helperText: firstNameError,
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
//             helperText: lastNameError,
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
//             helperText: phoneNumberError,
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

  const handleSaveRow = ({ row, values }) => {
    setIsSaving(true);
    setTimeout(() => {
      tableData[row.index] = values;
      setTableData([...tableData]);
      setIsSaving(false);
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
        showProgressBars: isSaving,
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
      onEditingRowSave={({ row, values }) => {
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
      }}
    />
  );
};

export const EditingEnabledEditModeTableWithGroupedRows = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
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
      editingMode="table"
      onEditingRowSave={handleSaveRow}
    />
  );
};
