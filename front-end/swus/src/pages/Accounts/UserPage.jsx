import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavBar from "./../../components/NavBar/NavBar";

import { indigo } from "@mui/material/colors";

import { Outlet } from "react-router";

const theme = createTheme();

export default function UserPage() {
  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              // backgroundImage: { logo },
              backgroundRepeat: "no-repeat",
              backgroundColor: indigo[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 10,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Outlet></Outlet>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
