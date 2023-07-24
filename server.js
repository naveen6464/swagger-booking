const express = require("express");
const bookRoutes = require("./router/v1/auth.route");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const app = express();

// middleware
app.use(express.json());

// define all our routes
app.use("/", bookRoutes);
const swaggerDefinition = {
   
    definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
    servers: [
      {
        url: "http://localhost:5001/",
      },
    ],
  },
},
    apis: ["router/v1/*.js"],
}
;
const specs = swaggerJsdoc(
    swaggerDefinition);
app.use(
  "/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const port = 5001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});