import {
  Control,
  FieldValues,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  Popover,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Table,
  TableBody,
  Typography,
  InputAdornment,
  IconButton,
  TableHead,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { VStack } from "./Layout";
import { TextInput } from "./inputs";
import { AddRounded } from "@mui/icons-material";
import { HStack, Spacer } from ".";
import {
  useGetEventStatsQuery,
  useSubmitEventStatsMutation,
} from "../graphql/generated/api";

interface EventStatsFormProps {
  eventId: number;
}
export function EventStatsForm({ eventId }: EventStatsFormProps) {
  const { data, loading } = useGetEventStatsQuery({
    variables: {
      input: {
        eventId,
      },
    },
  });
  const { control, handleSubmit } = useForm();
  const [submitEventStats] = useSubmitEventStatsMutation();
  const { fields, append } = useFieldArray({
    name: "players",
    control,
  });

  useEffect(() => {
    if (data && data.eventStats && fields.length < 1) {
      append(data.eventStats.map(({ __typename, ...rest }) => ({ ...rest })));
    }
  }, [data, fields]);

  const onSubmit = handleSubmit((values) => {
    submitEventStats({
      variables: {
        input: {
          players: values.players.map(({ firstName, lastName, ...rest }) => ({
            ...rest,
          })),
        },
      },
    });
  });

  if (loading) return <CircularProgress />;

  return (
    <>
      <form onSubmit={onSubmit}>
        <HStack>
          <Typography>Players</Typography>
          <Spacer />
          <Button type="submit" variant="contained" size="medium">
            Submit
          </Button>
        </HStack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>G</TableCell>
                <TableCell>A</TableCell>
                <TableCell>YC</TableCell>
                <TableCell>RC</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => (
                <PlayerRow
                  key={`row-${field.id}`}
                  control={control}
                  field={field}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
}

interface PlayerRowProps {
  control: Control<FieldValues>;
  field: Record<"id", string>;
  index: number;
}
function PlayerRow({ control, field, index }: PlayerRowProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const value = useWatch({
    name: "players",
    control,
  });

  const open = Boolean(anchorEl);
  const id = open ? "player-stats-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow key={field.id}>
      <TableCell width="20%">{value[index].firstName}</TableCell>
      <TableCell width="20%">{value[index].lastName}</TableCell>
      <TableCell>{value[index].goals}</TableCell>
      <TableCell>{value[index].assists}</TableCell>
      <TableCell>{value[index].yellowCards}</TableCell>
      <TableCell>{value[index].redCards}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        <IconButton size="medium" aria-describedby={id} onClick={handleClick}>
          <AddRounded />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <VStack p={2} spacing={2} maxWidth={200}>
            <TextInput
              fullWidth
              autoFocus
              isNumeric
              control={control}
              id={`players.${index}.goals`}
              name={`players.${index}.goals`}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Goals</InputAdornment>
                ),
              }}
            />
            <TextInput
              fullWidth
              isNumeric
              control={control}
              id={`players.${index}.assists`}
              name={`players.${index}.assists`}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Assists</InputAdornment>
                ),
              }}
            />
            <TextInput
              fullWidth
              isNumeric
              control={control}
              id={`players.${index}.yellowCards`}
              name={`players.${index}.yellowCards`}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Yellow Cards</InputAdornment>
                ),
              }}
            />
            <TextInput
              fullWidth
              isNumeric
              control={control}
              id={`players.${index}.redCards`}
              name={`players.${index}.redCards`}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Red Cards</InputAdornment>
                ),
              }}
            />
          </VStack>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
