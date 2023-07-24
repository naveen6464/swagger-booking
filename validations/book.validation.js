const Joi = require("@hapi/joi");


//register the user
const register={
    body:Joi.object().keys({
        _id:Joi.string(),
        userId: Joi.string(),
        bookDate: Joi.string()
    })
}

module.exports={
    register
}