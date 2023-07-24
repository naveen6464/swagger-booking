/** ***************** package Import ******************************************************** */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcrypt")
const {paginate}=require("./plugin/index")



/*  
  userSchema  - It is the schema for our user module
*/
const userSchema = mongoose.Schema(
    {
      _id: {
        type: String,
      },      
      firstName: {
        type: String,
        trim: true,
        required: [true, 'Please enter name']
    },
      
      lastName: {
        type: String,
        trim: true,
        required: [true, 'Please enter name']
    },
    email:{
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email address']
     },
     password: {
      type: String,
      required: [true, 'Please enter password'],
      min: 6,
      max: 1024  
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    trim: true,
  },

  updatedBy: {
    type: String,
    trim: true,
  },
},
  {
    timestamps: true,
    _id: false,
  }
        
    );
  
   
userSchema.plugin(paginate);   

const User = mongoose.model("users", userSchema);
module.exports = User;
