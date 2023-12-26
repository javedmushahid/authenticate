import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Button,
  Radio,
  FormControlLabel,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";

const BusContainer = styled("div")({
  border: "1px solid #ddd",
  width: "20%",
  padding: "0.5rem",
  borderRadius: "4px",
  margin: "0 auto",
});

const SeatsContainer = styled(Grid)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: 0,
  marginBottom: "2px",
});

const Seat = styled(Grid)({
  flex: "0 0 14.28571428571429%",
  padding: "3px",
  position: "relative",
});

const Label = styled("label")({
  borderRadius: "4px",
  background: "#3783b5",
  color: "white",
  padding: 5,
  width: "25px",
  height: "25px",
  marginBottom: "0.1rem",
  display: "inline-block",
  fontSize: "0.8rem",
  //   gap:10
});

const RadioInput = styled(Radio)({
  display: "none",

  "&:checked + label": {
    background: (theme) => theme.palette.success.main,
    "&:after": {
      background: "none",
    },
  },

  "&:disabled + label": {
    cursor: "not-allowed",
    background: (theme) => theme.palette.error.main,
  },
});

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
const BusComponent = () => {
  const router = useRouter();
  const { data: allTickets, error } = useSWR(
    "https://authenticate-api-production.up.railway.app/get-all-tickets",
    fetcher
  );
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSeatClick = (seatNumber) => {
    // Check if the seat is already booked
    const isBooked = allTickets?.some(
      (ticket) => ticket.seatNumber === seatNumber
    );

    if (!isBooked) {
      setSelectedSeats(seatNumber);
      // setOpenDialog(true);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedSeats.length === 0) {
        console.error("No selected seats to save.");
        return;
      }

      const ticketData = {
        seatNumber: selectedSeats,
        isOpen: false,
        userDetails,
        dateOfBooking: selectedDate,
      };
      const response = await axios.post(
        "https://authenticate-api-production.up.railway.app/add-ticket",
        ticketData
      );
      console.log("Form submitted with details:", ticketData);
      setOpenDialog(false);
      // mutate(
      //   "https://authenticate-api-production.up.railway.app/get-all-tickets"
      // );

      router.reload();
    } catch (error) {
      console.error("Error saving the ticket:", error);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  console.log("allTickets", allTickets);
  return (
    <>
      <Box gap={3} mt={2} display={"flex"} justifyContent={"right"}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#3783b5", ":hover": { bgcolor: "#3783b5" } }}
          size="small"
          // className="mb-2"
        >
          Available
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#46be8a", ":hover": { bgcolor: "#46be8a" } }}
          size="small"
          className="mb-2"
        >
          Chosen
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#f73737", ":hover": { bgcolor: "#f73737" } }}
          size="small"
          className="mb-2"
        >
          Booked
        </Button>
      </Box>
      <BusContainer sx={{ mt: 4 }}>
        <SeatsContainer container spacing={1}>
          {/* Render your seats using MUI styled components */}
          {Array.from({ length: 40 }, (_, index) => {
            const seatNumber = index + 1;
            const isBooked = allTickets?.some(
              (ticket) => ticket.seatNumber === seatNumber
            );
            return (
              <Seat item xs={3} key={index}>
                <RadioInput
                  id={`seat-radio-1-${index + 1}`}
                  value={(index + 1).toString()}
                  inputProps={{ role: "input-passenger-seat" }}
                  disabled={isBooked}
                />
                <Label
                  htmlFor={`seat-radio-1-${index + 1}`}
                  onClick={() => handleSeatClick(index + 1)}
                  style={{
                    background:
                      selectedSeats === seatNumber
                        ? "#46be8a" // Change color for selected seat
                        : isBooked
                        ? "#f73737" // Red for booked seats
                        : "#3783b5", // Default color
                  }}
                >
                  {(index + 1).toString()}
                </Label>
              </Seat>
            );
          })}
        </SeatsContainer>
      </BusContainer>
      {selectedSeats !== null && (
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
            placeholder="Date of Booking"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            sx={{ mt: 0.3 }}
            fullWidth
          />{" "}
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "#D23F57",
                "&:hover": {
                  bgcolor: "#a62a3f",
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

export default BusComponent;
