import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../Link";
import ProTip from "../ProTip";
import Copyright from "../Copyright";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import {
  useCreateSeasonMutation,
  useGetAllSeasonsQuery,
} from "../graphql/generated/api";
import { useForm } from "react-hook-form";

interface FormFields {
  name: string;
}

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
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          GFRS
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        {JSON.stringify(data)}
        <form onSubmit={onSubmit}>
          <Stack spacing={1}>
            <TextField {...register("name")} />
            <Button type="submit" variant="contained">
              Add season
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
