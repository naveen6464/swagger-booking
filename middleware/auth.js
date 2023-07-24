
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
       // console.log(token);
        const decoded = jwt.verify(token,"qwert");
        req.userData = decoded;
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).json({
          message: 'Auth failed'
        })
      }}


      module.exports={
        auth
      }