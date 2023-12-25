// *
// @uthor Mushahid
// *

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const app = express();
const server = http.createServer(app);
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const { loggerUtil } = require("./utils/logger");
const path = require("path");
const session = require("express-session");
const crypto = require("crypto");

// Setting Up App to use data from .env file
dotenv.config();
app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
); // Add this line for session support
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Replace with your frontend URL
//     credentials: true, // Enable credentials
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes for the app
const clients = [];
routes(app);

// Loading Environment Variables
const DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;
// console.log("urls", DB_URL, PORT);

// Initializing DB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      loggerUtil(`Server is up and running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    loggerUtil(`Error: ${error.message}`);
  });
