// Import necessary MUI components and hooks
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// Define the dialog component
const BookingDialog = ({ open, onClose, onBook, selectedSeats }) => {
  // State to manage user details
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Handler for updating user details
  const handleUserDetailsChange = (field) => (event) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: event.target.value,
    }));
  };

  // Handler for booking seats
  const handleBook = () => {
    // Pass the selected seats and user details to the onBook function
    onBook(selectedSeats, userDetails);
    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fill in your details to book selected seats</DialogTitle>
      <DialogContent>
        {/* Form fields for user details */}
        <TextField
          fullWidth
          label="First Name"
          value={userDetails.firstName}
          onChange={handleUserDetailsChange('firstName')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={userDetails.lastName}
          onChange={handleUserDetailsChange('lastName')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={userDetails.email}
          onChange={handleUserDetailsChange('email')}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleBook} color="primary">
          Book Seats
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
