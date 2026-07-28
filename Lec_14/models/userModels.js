const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,

    },
    mobile_no: {
        type: Number,

    },
    rollno:{
        type: Number,
        required: true,
        unique : true
    }

})


module.exports = mongoose.model("users", userSchema);