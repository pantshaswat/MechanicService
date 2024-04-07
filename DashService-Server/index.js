const express = require("express");
const http = require("node:http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Database = require("./services/mongoDbService");
const fs = require("fs");
const { checkForCookieAuth } = require("./middlewares/jwtAuthMiddleware");
const initializeSocketIO = require("./services/socketService");
const cors = require("cors");
initializeSocketIO(server);
// Assuming PORT is defined somewhere in your code
const PORT = 3000;

//!ROUTES
const appointmentsRoutes = require("./routes/bookingRoutes");
const authRouter = require("./routes/authRoutes");
const vehiclePartRouter = require("./routes/vehiclePartRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const marketplaceRouter = require("./routes/marketPlaceRoutes");
const serviceCenter = require("./routes/serviceRoute");

app.use(
  cors({
    origin: "http://localhost:5173", //frontend url
    credentials: true,
  })
);
app.use(express.raw());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(cookieParser(null, { sameSite: "None" }));

app.use(express.static(path.resolve("./public")));

app.use("/auth", authRouter);

app.use("/vehiclePart", checkForCookieAuth("token"), vehiclePartRouter);
app.use("/vehicle", checkForCookieAuth("token"), vehicleRouter);
app.use("/marketplace", checkForCookieAuth("token"), marketplaceRouter);
app.use("/appointments", checkForCookieAuth("token"), appointmentsRoutes);
app.use("/notifications", checkForCookieAuth("token"), notificationRouter);
app.use("/serviceCenter", checkForCookieAuth("token"), serviceCenter);

// Connect to the database and start the server
(async () => {
  try {
    await Database.connect();
    server.listen(PORT, () => {
      console.log("Server is up on port " + PORT);
      console.log("http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
