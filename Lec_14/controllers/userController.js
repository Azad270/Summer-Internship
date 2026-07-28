const userSchema = require('../models/userModel')


//get

async function getAllUsers(req,res){
    const users = await userSchema.find();

    res.status(200).json(users);
}



// get by id 

async function getUserbyId(req,res){
    const user = await userSchema.findById(req.params.id)

    res.status(200).json(user);
}





// post 

async function createUser(req,res){

    if(!req.body.name || !req.body.rollno) res.status(404).json("required values are not presnet");

    const user = await userSchema.create({
        name: req.body.name,
        age: req.body.age,
        mobile_no: req.body.mobile_no,
        rollno: req.body.rollno
    })

    console.log(user);

    res.status(201).json(user);

}


// patch 


//delete



module.exports = {getAllUsers, getUserbyId, createUser};