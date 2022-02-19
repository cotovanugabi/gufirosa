import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { groups, seasons } from "../../prisma/data";
import { HStack } from "./Layout";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children?: ReactNode;
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container>
          <HStack spacing={2} pt={3} pb={2}>
            <Typography>GFRS</Typography>
            <Typography fontWeight="medium">/</Typography>
            <FormControl size="small">
              <InputLabel id="group-label">Group</InputLabel>
              <Select
                defaultValue={1}
                labelId="group-label"
                id="group-select"
                label="Group"
              >
                {groups.map((group) => (
                  <MenuItem key={`group-${group.id}`} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography fontWeight="medium">/</Typography>
            <FormControl size="small">
              <InputLabel id="season-label">Season</InputLabel>
              <Select
                defaultValue={2}
                labelId="season-label"
                id="group-select"
                label="Season"
              >
                {seasons.map((season) => (
                  <MenuItem key={`season-${season.id}`} value={season.id}>
                    {season.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </HStack>
          <Navbar />
        </Container>
      </Box>
      <Container>
        <Box py={2}>{children}</Box>
      </Container>
    </>
  );
}
