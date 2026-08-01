const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
    semester: Number
});

module.exports = mongoose.model("Student", studentSchema);