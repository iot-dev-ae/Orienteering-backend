const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const runnerRoutes = require("./routes/runnerRoutes"); // Import your route definitions
const raceRoutes = require("./routes/raceRoutes");
const logRoutes = require("./routes/logRoutes");
const beaconRoutes = require("./routes/beaconRoutes");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
// Add any other necessary middleware here

// Define your routes
app.use("/runner", runnerRoutes); // Mount the user routes at /user
app.use("/race", raceRoutes);
app.use("/log", logRoutes);
app.use("/beacon", beaconRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or a default (3000)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
