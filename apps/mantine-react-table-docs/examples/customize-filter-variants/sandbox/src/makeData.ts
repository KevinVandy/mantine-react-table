export type Person = {
  isActive: boolean;
  name: string;
  hireDate: string;
  age: number;
  city: string;
  state: string;
};

export const data: Person[] = [
  {
    isActive: true,
    name: 'Tanner Linsley',
    hireDate: '2016-02-23T18:25:43.511Z',
    age: 42,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Kevin Vandy',
    hireDate: '2019-02-23T18:21:43.335',
    age: 51,
    city: 'Richmond',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'John Doe',
    hireDate: '2014-02-23T18:25:43.511Z',
    age: 27,
    city: 'Riverside',
    state: 'South Carolina',
  },
  {
    isActive: true,
    name: 'Jane Doe',
    hireDate: '2015-02-25T18:25:43.511Z',
    age: 32,
    city: 'San Francisco',
    state: 'California',
  },
  {
    isActive: false,
    name: 'John Smith',
    hireDate: '2023-06-11T18:25:43.511Z',
    age: 42,
    city: 'Los Angeles',
    state: 'California',
  },
  {
    isActive: true,
    name: 'Jane Smith',
    hireDate: '2019-02-23T18:21:43.335',
    age: 51,
    city: 'Blacksburg',
    state: 'Virginia',
  },
  {
    isActive: false,
    name: 'Samuel Jackson',
    hireDate: '2010-02-23T18:25:43.511Z',
    age: 27,
    city: 'New York',
    state: 'New York',
  },
];

export const citiesList = [
  'San Francisco',
  'Richmond',
  'Riverside',
  'Los Angeles',
  'Blacksburg',
  'New York',
];

export const usStateList = [
  'California',
  'Virginia',
  'South Carolina',
  'New York',
  'Texas',
];
