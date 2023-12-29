const { Ticket } = require("../models/ticketModel");

const addTicket = async (req, res) => {
  try {
    // Extract data from the request body
    const { seatNumber, isOpen, userDetails, dateOfBooking } = req.body;

    // Create a new ticket instance
    const newTicket = new Ticket({
      seatNumber,
      isOpen,
      userDetails,
      dateOfBooking,
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTicket = async (req, res) => {
  try {
    // Extract data from the request query
    const ticketId = req.param.ticketId;

    // Find the ticket by seat number
    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllTicket = async (req, res) => {
  try {
    // Retrieve all tickets from the database
    const allTickets = await Ticket.find();

    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateTicket = async (req, res) => {
  try {
    // Extract data from the request parameters
    const { ticketId } = req.params;

    // Find the ticket by its MongoDB ObjectId
    const ticket = await Ticket.findById(ticketId);

    // Update the ticket with the fields from the request body
    Object.assign(ticket, req.body);

    // Save the updated ticket
    const updatedTicket = await ticket.save();

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTicket = async (req, res) => {
  try {
    // Extract data from the request body
    const { ticketId } = req.params;

    // Find and delete the ticket by seat number
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(deletedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const resetAllTickets = async (req, res) => {
  try {
    await Ticket.updateMany({}, { $set: { isOpen: true } });
    res.json({ message: "All tickets reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const isAdmin = (req, res, next) => {
  // Check if the 'admin' query parameter is present and set to 'true'
  if (req.query.admin && req.query.admin === "true") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Forbidden: Only admin users can perform this action" });
  }
};

module.exports = {
  deleteTicket,
  addTicket,
  getAllTicket,
  getTicket,
  resetAllTickets,
  updateTicket,
  isAdmin,
};
