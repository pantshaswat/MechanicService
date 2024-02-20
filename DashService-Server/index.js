const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Database = require("./services/mongoDbService");

// Assuming PORT is defined somewhere in your code
const PORT = 3000;

//!ROUTES
const appointmentsRoutes = require("./routes/bookingRoutes");
// const usersRoutes = require("./routes/usersRoutes");

app.use("/appointments", appointmentsRoutes);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL

app.use(express.raw());
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());

// Define your route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Connect to the database and start the server
(async () => {
  try {
    await Database.connect();
    app.listen(PORT, () => {
      console.log("Server is up on port " + PORT);
      console.log("http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
