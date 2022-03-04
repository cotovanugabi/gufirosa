import {
  CircularProgress,
  Grid,
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
import { EventResultForm, EventStatsForm } from "../../../components";
import { useGetEventQuery } from "../../../graphql/generated/api";
import { flattenPlayers } from "../../../utils";

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
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {data?.event?.result ? (
          <EventStatsForm eventId={data?.event.id} />
        ) : (
          <EventTable
            columns={columns}
            data={flattenPlayers(data?.event?.players || [])}
          />
        )}
      </Grid>
      <Grid item xs={4}>
        {data?.event && <EventResultForm event={data.event} />}
      </Grid>
    </Grid>
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
