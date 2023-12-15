import { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { data } from './makeData';
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

const fontAwesomeIcons = {
  IconArrowAutofitContent: (props) => (
    <FontAwesomeIcon icon={faTextWidth} {...props} />
  ),
  IconArrowsSort: (props) => <FontAwesomeIcon icon={faSort} {...props} />,
  IconBoxMultiple: (props) => (
    <FontAwesomeIcon icon={faLayerGroup} {...props} />
  ),
  IconChevronDown: (props) => (
    <FontAwesomeIcon icon={faChevronDown} {...props} />
  ),
  IconChevronLeft: (props) => (
    <FontAwesomeIcon icon={faChevronLeft} {...props} />
  ),
  IconChevronRight: (props) => (
    <FontAwesomeIcon icon={faChevronRight} {...props} />
  ),
  IconChevronsDown: (props) => (
    <FontAwesomeIcon icon={faAnglesDown} {...props} />
  ),
  IconCircleX: (props) => <FontAwesomeIcon icon={faCircleXmark} {...props} />,
  IconClearAll: (props) => (
    <FontAwesomeIcon icon={faBarsStaggered} {...props} />
  ),
  IconColumns: (props) => <FontAwesomeIcon icon={faColumns} {...props} />,
  IconDeviceFloppy: (props) => (
    <FontAwesomeIcon icon={faFloppyDisk} {...props} />
  ),
  IconDots: (props) => <FontAwesomeIcon icon={faEllipsisH} {...props} />,
  IconDotsVertical: (props) => (
    <FontAwesomeIcon icon={faEllipsisV} {...props} />
  ),
  IconEdit: (props) => <FontAwesomeIcon icon={faEdit} {...props} />,
  IconEyeOff: (props) => <FontAwesomeIcon icon={faEyeSlash} {...props} />,
  IconFilter: (props) => <FontAwesomeIcon icon={faFilter} {...props} />,
  IconFilterOff: (props) => (
    <FontAwesomeIcon icon={faFilterCircleXmark} {...props} />
  ),
  IconGripHorizontal: (props) => <FontAwesomeIcon icon={faGrip} {...props} />,
  IconMaximize: (props) => <FontAwesomeIcon icon={faExpand} {...props} />,
  IconMinimize: (props) => <FontAwesomeIcon icon={faCompress} {...props} />,
  IconPinned: (props) => <FontAwesomeIcon icon={faThumbTack} {...props} />,
  IconPinnedOff: (props) => <FontAwesomeIcon icon={faThumbTack} {...props} />,
  IconSearch: (props) => <FontAwesomeIcon icon={faSearch} {...props} />,
  IconSearchOff: (props) => <FontAwesomeIcon icon={faSearchMinus} {...props} />,
  IconSortAscending: (props) => <FontAwesomeIcon icon={faSortUp} {...props} />,
  IconSortDescending: (props) => (
    <FontAwesomeIcon icon={faSortDown} {...props} />
  ),
  IconBaselineDensityLarge: (props) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconBaselineDensityMedium: (props) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconBaselineDensitySmall: (props) => (
    <FontAwesomeIcon icon={faBars} {...props} />
  ),
  IconX: (props) => <FontAwesomeIcon icon={faX} {...props} />,
};

const Example = () => {
  const columns = useMemo(
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
      editDisplayMode="row"
      enableColumnFilterModes
      enableColumnOrdering
      enableColumnResizing
      enableEditing
      enableGrouping
      enableColumnPinning
      icons={fontAwesomeIcons}
      initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
    />
  );
};

export default Example;
