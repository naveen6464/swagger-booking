/*
   controller Name : booking
*/
/** ******************  Import httpStatus ******************************************************** */

const httpStatus = require("http-status");

/** ******************  Import catchAsync and pick ******************************************************** */
const catchAsync = require("../utills/catchAsync");
//const pick = require("../utills/pick");

/** ******************  Import Services ******************************************************** */
const {bookService}= require("../service/index");
const pick = require("../utills/pick");



/*
function createUser  -  This function is used to create an user  
*/
const createBooking=catchAsync( async (req, res) => {
  
    const user = await bookService.bookingPost(req.body); // send to createUser request before create
    res.status(httpStatus.CREATED).send(user);
  });

  const getIdAll = catchAsync(async(req,res)=> {
  const filter = pick(req.query, ["userId"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  console.log(filter,options,11111)
    const user=await bookService.bookById(filter,options,req);
    res.send(user);
  })

  module.exports={
    createBooking,
    getIdAll
  }