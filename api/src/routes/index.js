const { model } = require("mongoose");
const { loggerUtil } = require("../utils/logger");
const ticketRoute = require("./ticket");

const routes = (app) => {
  app.get("/welcome", (req, res) => {
    loggerUtil("API called.");
    res.send("Authenticate -Booking Api running");
  });
  app.use(ticketRoute);
  return app;
};
module.exports = routes;
