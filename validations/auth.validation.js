const Joi = require("@hapi/joi");


//register the user
const register={
    body:Joi.object().keys({
        _id:Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string(),
    })
}

// function login-this function is used to validate the login user 
 const login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };


  // function getUser -this function is used to validate id 
  const getUser = {
    params: Joi.object().keys({
      userId: Joi.string(),
    })
    
  };
  
  //const validate = require("../../middleware/validate")



  const updateUser={
    params: Joi.object().keys({
        userId: Joi.string(),
      }),
      body:Joi.object().keys({
        _id:Joi.string().allow(""),
        firstName: Joi.string().allow(""),
        lastName: Joi.string().allow(""),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).allow(""),
        password: Joi.string().allow(""),
    })

  }

  /*
function deleteUser - This function is used to validate the id to delete user

*/
const deleteUser = {
    params: Joi.object().keys({
      userId: Joi.string(),
    }),
  };
module.exports={
    login,
    register,
    deleteUser,
    getUser,
    updateUser
}