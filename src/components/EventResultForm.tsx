import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { EventType } from "../types";
import { sortTeams } from "../utils";
import { VStack } from "./Layout";

interface FormValues {
  homeGoals: number;
  awayGoals: number;
}

interface EventResultFormProps {
  event: EventType;
}
export function EventResultForm({ event }: EventResultFormProps) {
  const [homeTeam, awayTeam] = sortTeams(
    [event.team, event.opponent],
    event.isHome
  );
  const [homeGoals, awayGoals] = event.result
    ? sortTeams(
        [event.result.opponentGoals, event.result.teamGoals],
        event.isHome
      )
    : [];
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      homeGoals,
      awayGoals,
    },
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack
        p={2}
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography>Result</Typography>
        <TextField
          label="Home"
          id="home"
          size="small"
          fullWidth
          {...register("homeGoals")}
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
          size="small"
          fullWidth
          {...register("awayGoals")}
          InputProps={{
            inputMode: "numeric",
            endAdornment: (
              <InputAdornment position="start">{awayTeam.name}</InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="outlined" fullWidth>
          {event.result ? "Update" : "Submit"}
        </Button>
      </VStack>
    </form>
  );
}
