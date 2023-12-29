const express = require("express");
const {
  addTicket,
  getTicket,
  getAllTicket,
  updateTicket,
  deleteTicket,
  resetAllTickets,
  isAdmin,
} = require("../controllers/ticket");

const ticketRoute = express.Router();

ticketRoute.post("/add-ticket", addTicket);
ticketRoute.get("/get-ticket/:ticketId", getTicket);
ticketRoute.get("/get-all-tickets", getAllTicket);

ticketRoute.put("/update-ticket/:ticketId", updateTicket);
ticketRoute.delete("/delete-ticket/:ticketId", deleteTicket);
ticketRoute.put("/reset-all-tickets", isAdmin, resetAllTickets);

module.exports = ticketRoute;
