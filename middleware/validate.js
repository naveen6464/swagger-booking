/*
   Name : validate
*/

/** ******************  Import httpStatus ******************************************************** */
const Joi = require("@hapi/joi");
const httpStatus = require("http-status");
const pick = require("../utills/pick");
//const ApiError = require("../utils/ApiError");

// validate is used to validate the incoming params,query and body values with the schema
const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);
  
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");

        res.send(errorMessage)
    //   return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    throw new Error(error, { statusCode: 404 })
      
    }
    Object.assign(req, value);
    return next();
  };

module.exports = validate;
