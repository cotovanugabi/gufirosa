import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../Link";
import ProTip from "../ProTip";
import Copyright from "../Copyright";
import { useGetAllSeasonsQuery } from "../graphql/generated/api";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const { data, loading } = useGetAllSeasonsQuery();

  if (loading) {
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
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
