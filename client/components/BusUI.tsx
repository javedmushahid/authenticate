// BusUI.js
import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { DesktopDatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
const BusUI = () => {
  const router = useRouter();
  const { data: allTickets, error } = useSWR(
    "http://localhost:8080/get-all-tickets",
    fetcher
  );
  // const [allTickets, setAllTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSeatClick = (index) => {
    if (isSeatBooked(index)) {
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(index)) {
        return [];
      } else {
        return [index];
      }
    });
  };
  // const fetchBookedSeats = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/get-all-tickets");
  //     const bookedSeats = response.data
  //       .filter((ticket) => ticket.isOpen === false)
  //       .map((ticket) => ticket.seatNumber);
  //     setBookedSeats(bookedSeats);
  //     setAllTickets(response.data);
  //   } catch (error) {
  //     console.error("Error fetching booked seats:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchBookedSeats();
  // }, []);
  // console.log("Selected seats", selectedSeats);
  // console.log("allTickets", allTickets);
  // console.log("bookedSeats", bookedSeats);
  const isSeatBooked = (seatNumber) => {
    return (
      allTickets &&
      allTickets.some(
        (ticket) => ticket.seatNumber === seatNumber && !ticket.isOpen
      )
    );
  };
  const isAnySelectedSeatBooked = () => {
    return selectedSeats.some(isSeatBooked);
  };
  const isAnySeatSelected = () => {
    return selectedSeats.length > 0;
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedSeats.length === 0) {
        console.error("No selected seats to save.");
        return;
      }

      if (isAnySelectedSeatBooked()) {
        console.error("Cannot save a ticket for a booked seat.");
        return;
      }

      const ticketData = {
        seatNumber: selectedSeats[0],
        isOpen: false,
        userDetails,
        dateOfBooking: selectedDate,
      };
      console.log("ticketadata", ticketData);
      // Make the API request to add the ticket
      const response = await axios.post(
        "http://localhost:8080/add-ticket",
        ticketData
      );

      console.log("Ticket saved successfully:", response.data);

      setOpenDialog(false);
      // fetchBookedSeats();
      mutate("http://localhost:8080/get-all-tickets");

      router.reload();
    } catch (error) {
      console.error("Error saving the ticket:", error);
    }
  };
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <>
      {selectedSeats.length > 0 && !isAnySelectedSeatBooked() && (
        <Box mt={2} mb={1} display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "#D23F57",
              "&:hover": {
                bgcolor: "#D23F57", // Change the background color on hover
              },
            }}
            onClick={() => setOpenDialog(true)}
          >
            Continue Booking
          </Button>
        </Box>
      )}
      <Box mt={2} mb={3} display={"flex"} justifyContent={"center"}>
        <Box
          width={250}
          height={610}
          sx={{ border: "1px solid gray" }}
          borderRadius={1.2}
        >
          <Box display={"flex"} justifyContent={"flex-end"} mr={2}>
            {" "}
            <Image
              src="/steering-wheel-svgrepo-com.svg"
              alt="Bus Seat"
              width={30}
              height={30}
              style={{
                marginTop: 10,
                color: "red",
                fill: "red",
              }}
            />
          </Box>
          <Divider sx={{ mt: 1 }} />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Box
              key={index}
              display={"flex"}
              justifyContent={"space-between"}
              p={1}
            >
              {/* Left side seat */}
              <Box
                onClick={() => handleSeatClick(index)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedSeats.includes(index)
                    ? "#D23F57"
                    : isSeatBooked(index)
                    ? "#CCCCCC"
                    : undefined,
                }}
              >
                <Image
                  src="/images/car-seat.png"
                  alt={`Bus Seat ${index}`}
                  width={40}
                  height={40}
                />
              </Box>
              <Box>
                <Image
                  onClick={() => handleSeatClick(index + 100)}
                  src="/images/car-seat.png"
                  alt={`Bus Seat ${index}`}
                  width={40}
                  height={40}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedSeats.includes(index + 100)
                      ? "#D23F57"
                      : isSeatBooked(index + 100)
                      ? "#CCCCCC"
                      : undefined,
                  }}
                />
                <Image
                  onClick={() => handleSeatClick(index + 200)}
                  src="/images/car-seat.png"
                  alt={`Bus Seat ${index}`}
                  width={40}
                  height={40}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedSeats.includes(index + 200)
                      ? "#D23F57"
                      : isSeatBooked(index + 200)
                      ? "#CCCCCC"
                      : undefined,
                  }}
                />
              </Box>
            </Box>
          ))}

          <Box mt={1} display={"flex"} flexDirection={"row"}>
            {[9, 10, 11, 12, 13, 14].map((index) => (
              <Box
                key={index}
                onClick={() => handleSeatClick(index)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedSeats.includes(index)
                    ? "#D23F57"
                    : isSeatBooked(index)
                    ? "#CCCCCC"
                    : undefined,
                }}
              >
                <Image
                  src="/images/car-seat.png"
                  alt={`Bus Seat`}
                  width={40}
                  height={40}
                />
              </Box>
            ))}
          </Box>
        </Box>
        {/* Continue Booking Button */}
      </Box>

      <Dialog
        sx={{ mt: 2, mb: 2 }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Please enter your details</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            // mt: 5,
            // mb: 3,
          }}
        >
          <TextField
            // label="First Name"
            placeholder="First Name"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, firstName: e.target.value }))
            }
            fullWidth
            InputLabelProps={{
              shrink: true, // Ensures the label doesn't overlap with the input value
            }}
          />
          <TextField
            placeholder="Last Name"
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, lastName: e.target.value }))
            }
            fullWidth
          />
          <TextField
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            autoComplete="on"
            fullWidth
          />
          <TextField
            label="Date of Booking"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            sx={{ mt: 0.3 }}
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "#D23F57",
                "&:hover": {
                  bgcolor: "#a62a3f", // Change the background color on hover
                },
              }}
              onClick={handleFormSubmit}
              fullWidth
            >
              Book Now
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusUI;
