/*
   Name : app.js
*/

/** ***************** Models Import ******************************************************** */
const mongoose = require("mongoose");
const app = require("./app");



const connectDatabase = ()=>{
    mongoose.connect('mongodb://localhost:27017/booking',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    }).catch(e=>{
        console.log("disconnect");
    })
}
connectDatabase()

const server = app.listen(5000,()=>{
    console.log(`My Server listening to the port: 5000`)
})
