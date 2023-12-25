const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  // Add more fields as needed
});

const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  isOpen: { type: Boolean, default: true },
  userDetails: { type: userDetailsSchema, required: false },
  createdAt: { type: Date, default: Date.now },
  dateOfBooking: { type: Date, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };
