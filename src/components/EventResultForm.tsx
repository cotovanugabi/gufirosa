import { useDisclosure } from "@chakra-ui/hooks";
import { Alert, Box, Button, Card, Snackbar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSubmitEventResultMutation } from "../graphql/generated/api";
import { EventType } from "../types";
import { TextInput } from "./inputs";
import { VStack } from "./Layout";

interface FormFields {
  teamGoals: number | string;
  opponentGoals: number | string;
}

interface EventResultFormProps {
  event: EventType;
}
export function EventResultForm({ event }: EventResultFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitEventResultMutation, { loading }] = useSubmitEventResultMutation(
    {
      onCompleted: onOpen,
    }
  );
  const { handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      teamGoals: event.result?.teamGoals || "",
      opponentGoals: event.result?.opponentGoals || "",
    },
  });
  console.log(event);
  const onSubmit = handleSubmit((values) => {
    console.log(values);
    submitEventResultMutation({
      variables: {
        input: {
          eventId: event.id,
          opponentGoals: Number(values.opponentGoals),
          teamGoals: Number(values.teamGoals),
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card elevation={2}>
        <VStack
          p={2}
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6">{event.competition.name}</Typography>
            <Typography>20 Feb, 11:30</Typography>
          </Box>
          <TextInput
            name="teamGoals"
            size="small"
            fullWidth
            isNumeric
            control={control}
            endAdornment={event.team.name}
          />
          <TextInput
            name="opponentGoals"
            size="small"
            fullWidth
            isNumeric
            control={control}
            endAdornment={event.opponent.name}
          />
          <Button type="submit" variant="outlined" fullWidth disabled={loading}>
            {event.result ? "Update" : "Submit"}
          </Button>
        </VStack>
      </Card>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
        <Alert severity="success">The stats was successfully submited!</Alert>
      </Snackbar>
    </form>
  );
}
