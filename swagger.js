const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "SIH MUTUELLE API",
      version: "1.0.0",
      description: "Your API description",
    },
  },
  apis: ["./routes/patientRoutes.js", "./routes/mutualSocietyRoutes.js"], // Replace with the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
