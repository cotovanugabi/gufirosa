import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { HStack, Link } from "../../../components";
import { useGetEventQuery } from "../../../graphql/generated/api";

function flattenPLayers(players: any[]) {
  return players.map(({ player, status }) => ({
    ...player,
    status,
  }));
}

export default function EventDetails() {
  const { query } = useRouter();
  const { data, loading } = useGetEventQuery({
    variables: {
      input: {
        eventId: parseInt(query.id as string),
      },
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Number",
        accessor: "number",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  if (loading) return <CircularProgress />;

  return (
    <div>
      <HStack>
        <Box flex={3}>
          <EventTable
            columns={columns}
            data={flattenPLayers(data?.event?.players || [])}
          />
        </Box>
        <Box flex={1} />
      </HStack>
    </div>
  );
}

function EventTable({ data, columns }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <TableSortLabel
                    data-testid="TableSortLabel"
                    direction={
                      column.isSorted && column.isSortedDesc ? "desc" : "asc"
                    }
                    active={column.isSorted}
                  >
                    <Typography noWrap variant="body2">
                      {column.render("Header")}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
