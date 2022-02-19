import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetAllStarsQuery } from "../graphql/generated/api";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const { data, loading } = useGetAllStarsQuery();

  if (loading) {
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
