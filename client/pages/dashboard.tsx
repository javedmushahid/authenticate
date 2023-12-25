// Dashboard.js
import React, { useState } from "react";
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import Head from "next/head";
import PassengerDetails from "../components/PassengerDetails"; // Import the new component
import NextLink from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

const dashboardStyle = {
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  padding: "16px",
};
const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Dashboard = () => {
  const {
    data: passengers,
    error,
    mutate,
  } = useSWR("http://viaduct.proxy.rlwy.net:42599/get-all-tickets", fetcher);
  // console.log("passengers", passengers);
  const router = useRouter();

  // const [passengers, setPassengers] = useState(initialPassengers);

  const handleUpdatePassenger = async (updatedDetails) => {
    try {
      await axios.put(
        `http://viaduct.proxy.rlwy.net:42599/update-ticket/${updatedDetails._id}`,
        updatedDetails
      );
      // Refresh the data by re-fetching
      mutate();
      // router.reload();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleDeletePassenger = async (passengerToDelete) => {
    try {
      await axios.delete(
        `http://viaduct.proxy.rlwy.net:42599/delete-ticket/${passengerToDelete._id}`
      );
      // Refresh the data by re-fetching
      mutate();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };
  const allPassengers = passengers?.filter((item) => {
    return item.isOpen === false;
  });
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box sx={dashboardStyle}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <NextLink href="/reservation" passHref>
            <Link color="inherit">Reservation</Link>
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link color="inherit">Dashboard</Link>
          </NextLink>{" "}
        </Breadcrumbs> */}
        <Typography variant="h4" color="primary">
          Welcome to the Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "white",
            bgcolor: "#D23F57",
            "&:hover": {
              bgcolor: "#D23F57", // Change the background color on hover
            },
            mb: 2,
            mt: 1,
          }}
          onClick={() => router.push("/reservation")}
        >
          Add New Passenger
        </Button>
        {allPassengers?.map((passenger, index) => (
          <div key={index}>
            {" "}
            <PassengerDetails
              key={passenger.id}
              passenger={passenger}
              onEdit={handleUpdatePassenger}
              onDelete={handleDeletePassenger}
            />
          </div>
        ))}
      </Box>
    </Layout>
  );
};

export default Dashboard;
