import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import BusUI from "../components/BusUI";
import NextLink from "next/link"; // Import next/link
import Layout from "../components/Layout";

const ReservationStyle = {
  backgroundColor: "#f0f0f0", // Set a background color
  //   padding: "20px", // Add some padding
  borderRadius: "8px", // Add rounded corners
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
  textAlign: "center", // Center text
};

const Reservation = () => {
  return (
    <Layout>
      <Head>
        <title>Reservation</title>
      </Head>
      <Box sx={ReservationStyle}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link href="/reservation" color="inherit">
            Reservation
          </Link>
          <Link href="/dashboard" color="inherit">
            Dashboard
          </Link>
        </Breadcrumbs> */}
        <Typography variant="h5" color="primary">
          Please select a seat to book
        </Typography>
      </Box>
      <BusUI />
    </Layout>
  );
};

export default Reservation;
