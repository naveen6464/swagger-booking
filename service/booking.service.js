/*
   Service Name : Users
*/

/** ***************** Models Import ******************************************************** */
const httpStatus = require("http-status");

const {User, Book} = require("../models");
/** ***************** Counter services Import ******************************************************** */
const counter = require("./counter.service");


const bookingPost = async (BodyData) => {
   
    const userBody = BodyData;
    const id = await counter.getCount("booking"); // passing users id to get counter value to autoIncrement _id
    userBody._id = id.toString();

    try{
        const user = await Book.create(userBody);
        return user;   
    }catch(err){
     console.log(err)
    }
  }

  const bookById = async (filterData, options, req) => {
      console.log(filterData,777) 
    try {
        const join = [
            {
              path: "userId",
              model: "users",
            },
          ];
      //const users = await Book.findById(userId).populate("userId","_id email")
     const users = await Book.paginate(filterData,options, {
        createdBy: 0,
        updatedBy: 0,
        isDeleted: 0,
      },join)
     
        console.log(users,6666)
      return users;
     
    } catch (e) {
      console.log(e);
    }
  };

  module.exports={
    bookingPost,
    bookById
  }