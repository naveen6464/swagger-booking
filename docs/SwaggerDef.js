/*
   docs Name : swaggerDef
*/

const { version } = require("../package.json");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Booking Express API with Swagger",
      version,
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
    
  },
  servers: [
    {
     
       url: `http://localhost:5000/`,
    },
  ],
};

module.exports = swaggerDef;
