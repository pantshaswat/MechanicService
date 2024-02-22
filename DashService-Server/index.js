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
const authRouter = require('./routes/authRoutes')
const vehicelRouter = require('./routes/vehicleRoutes')


app.use(express.raw());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

// Define your route
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/auth",authRouter)
app.use("/vehicle",vehicelRouter)

app.use("/appointments", appointmentsRoutes);






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
