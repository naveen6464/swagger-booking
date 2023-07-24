/** ***************** package Import ******************************************************** */

const mongoose = require("mongoose");

/*  
 counterSchema  - It is the schema for our counter module to autoincrement id's
*/
const Counters = mongoose.Schema({
 
  keyName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  
});
const Counter = mongoose.model("counters", Counters);
module.exports = Counter;


