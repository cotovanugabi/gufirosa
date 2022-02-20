import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import {
  GetAllEventsQuery,
  useGetAllEventsQuery,
} from "../../graphql/generated/api";
import { HStack, Spacer, VStack, Link } from "../../components";

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
    <VStack alignItems="normal" spacing={1} divider={<Divider />}>
      {data?.events?.map((event) => (
        <EventItem key={`event-${event?.id}`} event={event} />
      ))}
    </VStack>
  );
}

type QueryEvent = any;

interface EventItemProps {
  event: QueryEvent;
}
function EventItem({ event }: EventItemProps) {
  const [homeTeam, awayTeam] = sortTeams(
    [event.team, event.opponent],
    event.isHome
  );
  return (
    <Link href="/dashboard/events/1">
      <HStack width="100%" spacing={3}>
        <Typography fontSize="small">20 Feb, 11:30</Typography>
        <VStack alignItems="flex-start" flex="0 0 200px">
          <Typography>{homeTeam.name}</Typography>
          <Typography>{awayTeam.name}</Typography>
        </VStack>
        <Box flex="0 0 20px" textAlign="center">
          {event.result ? (
            <>
              <Typography>{event.result.teamGoals}</Typography>
              <Typography>{event.result.opponentGoals}</Typography>
            </>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
        <Chip size="small" variant="outlined" label={event.competition.name} />
        <Spacer />
        <ChevronRightRounded color="action" />
      </HStack>
    </Link>
  );
}

function sortTeams<T>(teams: T[], isHome: boolean) {
  if (isHome) {
    return teams;
  }
  return teams.reverse();
}
