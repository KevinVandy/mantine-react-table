import {
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
} from 'mantine-react-table';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getData } from './mock';

//This is just a simple mock of a backend API where you would do server-side pagination, filtering, and sorting
//You would most likely want way more validation and error handling than this in a real world application
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let dbData = getData();
  const { start, size, filters, sorting, globalFilter } = req.query as Record<
    string,
    string
  >;

  const parsedColumnFilters = JSON.parse(filters) as MRT_ColumnFiltersState;
  if (parsedColumnFilters?.length) {
    parsedColumnFilters.map((filter) => {
      const { id: columnId, value: filterValue } = filter;
      dbData = dbData.filter((row) => {
        return row[columnId]
          ?.toString()
          ?.toLowerCase()
          ?.includes?.((filterValue as string).toLowerCase());
      });
    });
  }

  if (globalFilter) {
    dbData = dbData.filter((row) =>
      Object.keys(row).some((columnId) =>
        row[columnId]
          ?.toString()
          ?.toLowerCase()
          ?.includes?.((globalFilter as string).toLowerCase()),
      ),
    );
  }

  const parsedSorting = JSON.parse(sorting) as MRT_SortingState;
  if (parsedSorting?.length) {
    const sort = parsedSorting[0];
    const { id, desc } = sort;
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  res.status(200).json({
    data:
      dbData?.slice(parseInt(start), parseInt(start) + parseInt(size)) ?? [],
    meta: { totalRowCount: dbData.length },
  });
}
