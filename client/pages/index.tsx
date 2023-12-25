// IndexPage.js
import React from "react";
import Layout from "../components/Layout";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <title>Book your bus</title>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
      >
        <h2>Welcome to the Authentication Page</h2>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "#D23F57",
              "&:hover": {
                bgcolor: "#D23F57", // Change the background color on hover
              },
            }}
            onClick={() => router.push("/reservation")}
          >
            {" "}
            BOOK A SEAT
          </Button>
          <Button
            variant="contained"
            // sx={{
            //   color: "white",
            //   bgcolor: "#D23F57",
            //   "&:hover": {
            //     bgcolor: "#D23F57", // Change the background color on hover
            //   },
            // }}
            onClick={() => router.push("/dashboard")}
          >
            {" "}
            GO TO DASHBOARD
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;
