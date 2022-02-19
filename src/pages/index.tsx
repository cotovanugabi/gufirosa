import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetAllStarsQuery } from "../graphql/generated/api";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const { handleSubmit, register, reset } = useForm<FormFields>();
  const { data, loading: isQueryLoading } = useGetAllSeasonsQuery();
  const [createSeasonMutation, { loading: isMutationLoading }] =
    useCreateSeasonMutation();

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    createSeasonMutation({
      variables: {
        input: {
          name: values.name,
        },
      },
    });
  });

  if (isQueryLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          GFRS
        </Typography>
        {JSON.stringify(data)}
      </Box>
    </Container>
  );
}
