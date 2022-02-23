import { Box, CircularProgress, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { HStack, Link, VStack } from "../../../components";
import {
  GetEventQuery,
  useGetEventQuery,
} from "../../../graphql/generated/api";

export default function EventDetails() {
  const { query } = useRouter();
  const { data, loading } = useGetEventQuery({
    variables: {
      input: {
        eventId: parseInt(query.id as string),
      },
    },
  });

  if (loading) return <CircularProgress />;

  return (
    <div>
      <HStack>
        <VStack
          flex={4}
          alignItems="normal"
          spacing={0.5}
          divider={<Divider />}
        >
          {data?.event?.players?.map((player, idx) => (
            <EventPlayer key={idx} player={player} />
          ))}
        </VStack>
        <Box flex={1} />
      </HStack>
    </div>
  );
}

type QueryEventPlayer = any;
interface EventPlayerProps {
  player: QueryEventPlayer;
}
function EventPlayer({ player }: EventPlayerProps) {
  return <Link href="/dashboard">{JSON.stringify(player)}</Link>;
}
