const express = require("express");
const userRoute = require("./users.route");
const authRoute = require("./auth.route");
const bookRoute=require("./booking.route")
const docs=require("./doc.route")
const router = express.Router();

router.use("/", authRoute);
router.use("/users", userRoute);
router.use("/booking",bookRoute)
router.use("/docs",docs)

module.exports = router;
