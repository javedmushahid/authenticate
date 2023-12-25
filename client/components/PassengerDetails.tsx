// PassengerDetails.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const PassengerDetails = ({ passenger, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(passenger);
  console.log("editedDetails", editedDetails);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedDetails);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => {
      if (name === "dateOfBooking") {
        return {
          ...prevDetails,
          [name]: new Date(value),
        };
      }
      return {
        ...prevDetails,
        userDetails: {
          ...prevDetails.userDetails,
          [name]: value,
        },
      };
    });
  };

  const formattedDate = new Date(passenger?.dateOfBooking).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  console.log("formattedDate", formattedDate);

  return (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
      <CardContent>
        <Box>
          {isEditing ? (
            <>
              <Grid xs={12} md={12} spacing={2} gap={2}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={editedDetails.userDetails.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} mt={2} md={12} spacing={2} gap={2}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={editedDetails.userDetails.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
            </>
          ) : (
            `${passenger?.userDetails?.firstName} ${passenger?.userDetails?.lastName}`
          )}
        </Box>
        <Typography color="textSecondary">
          {isEditing ? (
            <Grid xs={12} mt={2} md={12} spacing={2} gap={2}>
              <TextField
                name="email"
                label="Email"
                value={editedDetails.userDetails.email}
                onChange={handleInputChange}
              />
            </Grid>
          ) : (
            `Email: ${passenger?.userDetails?.email}`
          )}
        </Typography>
        <Typography color="textSecondary">
          {isEditing ? (
            <Grid xs={12} mt={2} md={12} spacing={2} gap={2}>
              <TextField
                name="dateOfBooking"
                label="Date of Booking"
                type="date"
                value={
                  typeof editedDetails.dateOfBooking === "string"
                    ? editedDetails.dateOfBooking.substr(0, 10)
                    : editedDetails.dateOfBooking.toISOString().substr(0, 10)
                }
                onChange={handleInputChange}
              />
            </Grid>
          ) : (
            `Date of Booking: ${formattedDate}`
          )}
        </Typography>
        <Typography color="textSecondary">
          {isEditing ? (
            <>Seat Number: {editedDetails.seatNumber}</>
          ) : (
            `Seat Number: ${passenger?.seatNumber}`
          )}
        </Typography>
        {isEditing ? (
          <>
            <Button
              sx={{
                color: "white",
                bgcolor: "#D23F57",
                "&:hover": {
                  bgcolor: "#D23F57", // Change the background color on hover
                },
                mb: 2,
                mt: 1,
              }}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button color="primary" onClick={handleEditClick}>
              Edit
            </Button>
            <Button color="error" onClick={() => onDelete(passenger)}>
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PassengerDetails;
