const mongoose = require('mongoose');

module.exports.connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{
        })
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}