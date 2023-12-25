import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import NextLink from "next/link";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: 5 }}>
          <Link
            href="/reservation"
            style={{ color: "white", textDecoration: "none", marginRight: 2 }}
          >
            Reservation
          </Link>
          <Link
            href="/dashboard"
            style={{ color: "white", textDecoration: "none", marginRight: 2 }}
          >
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
