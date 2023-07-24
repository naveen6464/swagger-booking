/*
   Service Name : Users
*/

/** ***************** Models Import ******************************************************** */
const httpStatus = require("http-status");

const {User} = require("../models");
/** ***************** Counter services Import ******************************************************** */
const counter = require("./counter.service");
const bcrypt=require("bcrypt")



const createUser = async (userBodyData) => {
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(userBodyData.password, salt)
  const userBody = userBodyData;
  const id = await counter.getCount("users"); // passing users id to get counter value to autoIncrement _id
  userBody._id = id.toString();
  
  userBody.password=hashPassword
  
  try{
      const user = await User.create(userBody);
      return user;   
  }catch(err){
   console.log(err)
  }
}


const queryService=async(req)=>{
  const resPerPage=req.query.limit || 3
  const apiFeature= new ApiFeature(User.find({
    isDeleted:
    false}),req.query).search().filter().paginate(resPerPage)
  const user = await apiFeature.query
  //const users=user.filter((e)=>e.isDeleted !== true);
  return user;
}



const getUserById=async(id)=>{
  const user =await User.findById(id)
  return user
}
const getUserOne=async(email,password)=>{
  const user =await User.findOne({email:email})
  if(!user){
    throw new Error('user not found'); 
  }
  
  const validPass = await bcrypt.compare(password, user.password)
  if (!validPass) throw new Error('Password does not match'); 

  return user
}






const updateUser=async(id,userBodyData)=>{
  const userBody = userBodyData;
 const user = await User.findByIdAndUpdate(id, userBody , {
    new: true,
    runValidators: true
})
return user
}

const deleteUser= async(id)=>{
  const user =await User.findById(id)
    // await user.remove();await user.deleteOne()
    user.isDeleted = true;
    await user.save(); 
    return user
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\#\|\|]/g, "\\$&"); // To remove the mongo search paranthesis
}

const queryUsers = async (filterData, options, req) => {
  const filter = filterData;
  const join = [
    {
      path: "userId",
      model: "booking",
    },
  ];
  if (filter.name) {
    filter.$or = [
      {
        lastName: {
          $regex: `${escapeRegExp(filter.name)}`,
          $options: "i",
        },
      },
      {
        firstName: {
          $regex: `${escapeRegExp(filter.name)}`,
          $options: "i",
        },
      },
    ];
  }
  delete filter.name;
  try {
    const users = await User.paginate(filter, options, {
      createdBy: 0,
      updatedBy: 0,
      isDeleted: 0,
    },join); // This third argument is to remove the field from response

    return users;
  } catch (e) {
   console.log(e)
  }
};

  // exporting all the methods
module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserOne,
    queryService,
    queryUsers
  }