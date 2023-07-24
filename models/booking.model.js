/** ***************** package Import ******************************************************** */

const mongoose = require("mongoose");
const {paginate,toJSON} = require('./plugin/index')



/*  
bookingSchema  - It is the schema for our user module
*/
const bookingSchema = mongoose.Schema(
    {
      _id: {
        type: String,
      },  
      userId:{
        type:String,
        ref:"users"
      },   
     bookDate:{
       type:String
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
    bookingSchema.plugin(toJSON);
    bookingSchema.plugin(paginate);
const Book = mongoose.model("booking", bookingSchema);
module.exports = Book;
