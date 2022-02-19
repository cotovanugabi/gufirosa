import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetAllEventsQuery } from "../../graphql/generated/api";

export default function Dashboard() {
  const { data, loading } = useGetAllEventsQuery({
    variables: {
      input: {
        groupId: 1,
        seasonId: 1,
      },
    },
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography>Dashboard</Typography>
      {JSON.stringify(data)}
    </Box>
  );
}
