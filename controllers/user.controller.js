/*
   controller Name : User
*/
/** ******************  Import httpStatus ******************************************************** */

const httpStatus = require("http-status");

/** ******************  Import catchAsync and pick ******************************************************** */
const catchAsync = require("../utills/catchAsync");
const pick = require("../utills/pick");

/** ******************  Import Services ******************************************************** */
const {userService}= require("../service/index");



/*
function createUser  -  This function is used to create an user  
*/
const createUsers=catchAsync( async (req, res) => {
  
    const user = await userService.createUser(req.body); // send to createUser request before create
    res.status(httpStatus.CREATED).send(user);
  });

/*
function getUsers  -  This function is used to  get a all user list from  after auth middleware 
*/
  const getUsers=catchAsync( async (req, res) => {
    const filter = pick(req.query, ["name", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await userService.queryUsers(filter, options, req);
   // result.results = result.results.filter((e) => e.isDeleted !== true);
    res.send(result);
  })

 /*
function getUserById -  This function is used to get an user  based on id
*/
  const getUserById=catchAsync(async(req,res)=>{
    const user= await userService.getUserById(req.params.userId)
    res.send(user)
  })

 /*
function updateUser  -  This function is used to update an user  based on id
*/ 
  const updateUser=catchAsync(async(req,res)=>{
    const user=await userService.updateUser(req.params.userId,req.body)
    res.send(user)
  })

  /*
function deleteUser  -  This function is used to delete an user based on id
*/
  const deleteUser=catchAsync(async(req,res)=>{
    await userService.deleteUser(req.params.userId)
    res.status(200).send({ success: true });
  })





  module.exports = {
    createUsers,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  }