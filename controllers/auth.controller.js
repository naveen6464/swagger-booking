const {authService,userService}= require("../service/index");
const catchAsync = require("../utills/catchAsync");
const {User}= require("../models/index");

// Login function is used to logIn the registered user
const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    //console.log(password,email)
    const data= await authService.loginEmailAndPassword(email,password)
    //console.log(data)
    const token = await authService.tokenGennerator(data);
    res.send({data,token})
  });


//Profile function is used to login the user profile
const profile= catchAsync(async(req,res)=>{
    const user= await authService.profile(req.userData);
    res.send(user); 
})

  module.exports={
    login,
    profile
  }