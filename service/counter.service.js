/*
   Service Name : Counters
*/

/** ***************** Models Import ******************************************************** */
const httpStatus = require("http-status");

const {Counter} = require("../models");


/*
   function updateCount - This function used to update counters
   $key name : 
   $currentId
*/
const updateCount = (keyName, currentId) => {
  //console.log(keyName,currentId,7777);
  Counter.updateOne({keyName:keyName}, {value:currentId }).then((data)=>{
    console.log(data,'4223');
  }).catch((error)=>{
    console.log(error);
  })
    // return Counter.update({ keyName }, { $inc: { value: 1 } }, (err) => {
  //   if (err) throw  err//new ApiError(httpStatus.CONFLICT, "counter error");
  // });
};

const getCount = async (keyName) => {
  try {
    const countObject = await Counter.findOne({ keyName });
    let currentId = 1;
    if (countObject) {
      currentId = countObject.value + 1;
     // console.log(currentId,countObject.keyName,countObject,'currentId');
      updateCount(countObject.keyName, currentId);
    } else {
      const insert = new Counter({
        keyName,
        value: currentId,
      });

     // console.log(insert)
      insert.save();
    }
    return currentId;
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  getCount,
  updateCount,
};
