/*
   Service Name : Auth
*/

/** ***************** Models Import ******************************************************** */
const httpStatus = require("http-status");
const {User}= require("../models/index");
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

const loginEmailAndPassword =async(email,password)=>{
   const user =await User.findOne({email:email})
   if(!user){
     throw new Error('user not found'); 
   }
   
   const validPass = await bcrypt.compare(password, user.password)
   if (!validPass) throw new Error('Password does not match'); 
 
   return user
 }


const tokenGennerator= async (data) => {
 
    //console.log(data)
    const token = jwt.sign({id:data._id,email:data.email},"qwert",{
        expiresIn: '2d'
    })
   
        return token
 }
  
 const profile=async(userData)=>{
    //console.log(userData)
  const user= await User.findById({_id:userData.id})
  //console.log(user)
  return user
}
 module.exports={
   tokenGennerator,
    profile,
    loginEmailAndPassword
 }