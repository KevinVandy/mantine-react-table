import React, { FC, useMemo } from 'react';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_Icons,
} from 'mantine-react-table';
import { data, Person } from './makeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownWideShort,
  faBars,
  faBarsStaggered,
  faColumns,
  faCompress,
  faEllipsisH,
  faEllipsisVertical,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faGripLines,
  faSearch,
  faSearchMinus,
  faSortDown,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

/**
 * These are just some of the icons visible in this table's feature set.
 * If you skip customizing some icons, those particular icons will fallback the the default Material-UI icons.
 */
const fontAwesomeIcons: Partial<MRT_Icons> = {
  IconArrowDown: (props: any) => (
    <FontAwesomeIcon icon={faSortDown} {...props} />
  ),
  IconClearAll: () => <FontAwesomeIcon icon={faBarsStaggered} />,
  IconMenu: () => <FontAwesomeIcon icon={faGripLines} />,
  IconMenu2: () => <FontAwesomeIcon icon={faBars} />,
  IconMenu2: () => <FontAwesomeIcon icon={faBars} />,
  IconMenu: () => <FontAwesomeIcon icon={faGripLines} />,
  IconFilter: (props: any) => <FontAwesomeIcon icon={faFilter} {...props} />,
  IconFilterOff: () => <FontAwesomeIcon icon={faFilterCircleXmark} />,
  IconMinimize: () => <FontAwesomeIcon icon={faCompress} />,
  IconMaximize: () => <FontAwesomeIcon icon={faExpand} />,
  IconSearch: (props: any) => <FontAwesomeIcon icon={faSearch} {...props} />,
  IconCircleOff: () => <FontAwesomeIcon icon={faSearchMinus} />,
  IconColumns: () => <FontAwesomeIcon icon={faColumns} />,
  IconDotsVertical: () => <FontAwesomeIcon icon={faEllipsisVertical} />,
  IconDots: () => <FontAwesomeIcon icon={faEllipsisH} />,
  IconArrowsSort: (props: any) => (
    <FontAwesomeIcon icon={faArrowDownWideShort} {...props} /> //props so that style rotation transforms are applied
  ),
  IconPin: (props: any) => (
    <FontAwesomeIcon icon={faThumbTack} {...props} /> //props so that style rotation transforms are applied
  ),
  IconEyeOff: () => <FontAwesomeIcon icon={faEyeSlash} />,
};

const Example: FC = () => {
  const columns = useMemo(
    //column definitions...
    () =>
      [
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
      ] as MRT_ColumnDef<Person>[],
    [], //end
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableColumnOrdering
      enablePinning
      icons={fontAwesomeIcons}
    />
  );
};

export default Example;
