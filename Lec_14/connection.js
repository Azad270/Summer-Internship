const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/student")

        console.log('databse connected ');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;