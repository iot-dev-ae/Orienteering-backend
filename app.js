const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patientRoutes"); // Import your route definitions
const repaymentRoutes = require("./routes/mutualSocietyRoutes");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
// Add any other necessary middleware here

// Define your routes
app.use("/patient", patientRoutes); // Mount the user routes at /user
app.use("/repayment", repaymentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or a default (3000)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
