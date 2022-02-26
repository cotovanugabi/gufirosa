import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { EventType } from "../types";
import { sortTeams } from "../utils";
import { VStack } from "./Layout";

interface EventInfoProps {
  event: EventType;
}
export function EventInfo({ event }: EventInfoProps) {
  const [homeTeam, awayTeam] = sortTeams(
    [event.team, event.opponent],
    event.isHome
  );

  return (
    <VStack spacing={2} justifyContent="flex-start" alignItems="flex-start">
      <Typography>Result</Typography>
      <TextField
        label="Home"
        id="home"
        fullWidth
        InputProps={{
          inputMode: "numeric",
          endAdornment: (
            <InputAdornment position="start">{homeTeam.name}</InputAdornment>
          ),
        }}
      />
      <TextField
        label="Away"
        id="away"
        fullWidth
        InputProps={{
          inputMode: "numeric",
          endAdornment: (
            <InputAdornment position="start">{awayTeam.name}</InputAdornment>
          ),
        }}
      />
      <Button variant="contained" fullWidth>
        Submit
      </Button>
    </VStack>
  );
}
