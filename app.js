/*
   Name : app.js
*/

/** ***************** Models Import ******************************************************** */
const express = require("express");
const helmet = require("helmet");
const path = require("path");

const routes = require("./router/v1/index");



const app = express();



app.use(express.json());
// v1 api routes
app.use("/v2", routes);


module.exports = app;