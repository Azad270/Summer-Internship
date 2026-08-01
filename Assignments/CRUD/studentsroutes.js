const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Dummy Data
const students = [
  { name: "Ankit Sharma", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Priya Singh", age: 21, course: "B.Tech CSE", semester: 5 },
  { name: "Rahul Verma", age: 20, course: "B.Tech IT", semester: 5 },
  { name: "Sneha Gupta", age: 19, course: "BCA", semester: 3 },
  { name: "Aman Yadav", age: 22, course: "B.Tech CSE", semester: 7 },
  { name: "Neha Kumari", age: 20, course: "BCA", semester: 4 },
  { name: "Rohit Das", age: 21, course: "B.Tech ECE", semester: 5 },
  { name: "Pooja Roy", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Vikas Sharma", age: 23, course: "MBA", semester: 2 },
  { name: "Karan Mehta", age: 21, course: "B.Tech ME", semester: 5 },
  { name: "Riya Jain", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Aditya Singh", age: 22, course: "B.Tech IT", semester: 7 },
  { name: "Megha Paul", age: 19, course: "BCA", semester: 3 },
  { name: "Sourav Dey", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Nisha Patel", age: 21, course: "MBA", semester: 2 },
  { name: "Arjun Kapoor", age: 20, course: "B.Tech ECE", semester: 5 },
  { name: "Simran Kaur", age: 19, course: "BCA", semester: 4 },
  { name: "Harsh Gupta", age: 22, course: "B.Tech CSE", semester: 7 },
  { name: "Muskan Sharma", age: 20, course: "B.Tech IT", semester: 5 },
  { name: "Deepak Yadav", age: 21, course: "B.Tech ME", semester: 5 },
  { name: "Anjali Das", age: 20, course: "BCA", semester: 3 },
  { name: "Abhishek Roy", age: 22, course: "B.Tech CSE", semester: 7 },
  { name: "Payal Singh", age: 19, course: "BCA", semester: 4 },
  { name: "Rakesh Kumar", age: 21, course: "MBA", semester: 2 },
  { name: "Shreya Gupta", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Ayush Verma", age: 22, course: "B.Tech IT", semester: 7 },
  { name: "Tina Paul", age: 19, course: "BCA", semester: 3 },
  { name: "Nitin Sharma", age: 21, course: "B.Tech ECE", semester: 5 },
  { name: "Kritika Jain", age: 20, course: "B.Tech CSE", semester: 5 },
  { name: "Manish Das", age: 23, course: "MBA", semester: 2 }
];

// POST
router.post("/students", async (req, res) => {
    const data = await Student.insertMany(students);
    res.json(data);
});

// GET ALL
router.get("/students", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// GET ONE
router.get("/students/:id", async (req, res) => {
    const data = await Student.findById(req.params.id);
    res.json(data);
});

// PATCH
router.patch("/students/:id", async (req, res) => {
    const data = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(data);
});

// DELETE
router.delete("/students/:id", async (req, res) => {
    const data = await Student.findByIdAndDelete(req.params.id);
    res.json(data);
});

module.exports = router;