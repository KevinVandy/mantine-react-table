import React, { useMemo } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_Icons,
} from 'mantine-react-table';
import { data, type Person } from './makeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faBars,
  faBarsStaggered,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
  faColumns,
  faCompress,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faFloppyDisk,
  faGrip,
  faLayerGroup,
  faSearch,
  faSearchMinus,
  faSort,
  faSortDown,
  faSortUp,
  faTextWidth,
  faThumbTack,
  faX,
} from '@fortawesome/free-solid-svg-icons'; //replace free solid with your desired icon set
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const fontAwesomeIcons: Partial<MRT_Icons> = {
  IconArrowAutofitContent: (props: any) => (
    <FontAwesomeIcon icon={faTextWidth} {...props} />
  ),
  IconArrowsSort: (props: any) => <FontAwesomeIcon icon={faSort} {...props} />,
  IconBoxMultiple: (props: any) => (
    <FontAwesomeIcon icon={faLayerGroup} {...props} />
  ),
  IconChevronDown: (props: any) => (
    <FontAwesomeIcon icon={faChevronDown} {...props} />
  ),
  IconChevronLeft: (props: any) => (
    <FontAwesomeIcon icon={faChevronLeft} {...props} />
  ),
  IconChevronRight: (props: any) => (
    <FontAwesomeIcon icon={faChevronRight} {...props} />
  ),
  IconChevronsDown: (props: any) => (
    <FontAwesomeIcon icon={faAnglesDown} {...props} />
  ),
  IconCircleX: (props: any) => (
    <FontAwesomeIcon icon={faCircleXmark} {...props} />
  ),
  IconClearAll: (props: any) => (
    <FontAwesomeIcon icon={faBarsStaggered} {...props} />
  ),
  IconColumns: (props: any) => <FontAwesomeIcon icon={faColumns} {...props} />,
  IconDeviceFloppy: (props: any) => (
    <FontAwesomeIcon icon={faFloppyDisk} {...props} />
  ),
  IconDots: (props: any) => <FontAwesomeIcon icon={faEllipsisH} {...props} />,
  IconDotsVertical: (props: any) => (
    <FontAwesomeIcon icon={faEllipsisV} {...props} />
  ),
  IconEdit: (props: any) => <FontAwesomeIcon icon={faEdit} {...props} />,
  IconEyeOff: (props: any) => <FontAwesomeIcon icon={faEyeSlash} {...props} />,
  IconFilter: (props: any) => <FontAwesomeIcon icon={faFilter} {...props} />,
  IconFilterOff: (props: any) => (
    <FontAwesomeIcon icon={faFilterCircleXmark} {...props} />
  ),
  IconGripHorizontal: (props: any) => (
    <FontAwesomeIcon icon={faGrip} {...props} />
  ),
  IconMaximize: (props: any) => <FontAwesomeIcon icon={faExpand} {...props} />,
  IconMinimize: (props: any) => (
    <FontAwesomeIcon icon={faCompress} {...props} />
  ),
  IconPinned: (props: any) => <FontAwesomeIcon icon={faThumbTack} {...props} />,
  IconPinnedOff: (props: any) => (
    <FontAwesomeIcon icon={faThumbTack} {...props} />
  ),
  IconSearch: (props: any) => <FontAwesomeIcon icon={faSearch} {...props} />,
  IconSearchOff: (props: any) => (
    <FontAwesomeIcon icon={faSearchMinus} {...props} />
  ),
  IconSortAscending: (props: any) => (
    <FontAwesomeIcon icon={faSortUp} {...props} />
  ),
  IconSortDescending: (props: any) => (
    <FontAwesomeIcon icon={faSortDown} {...props} />
  ),
  IconBaselineDensityLarge: (props: any) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconBaselineDensityMedium: (props: any) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconBaselineDensitySmall: (props: any) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconX: (props: any) => <FontAwesomeIcon icon={faX} {...props} />,
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },

      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      editingMode="row"
      enableColumnFilterModes
      enableColumnOrdering
      enableColumnResizing
      enableEditing
      enableGrouping
      enablePinning
      icons={fontAwesomeIcons}
      initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
    />
  );
};

export default Example;
