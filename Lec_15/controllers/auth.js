const User = require('../models/user');

const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    try{
        const {name , email, password} = req.body;

        const user = await User.findOne({email});

        if(user){
            res.status(400).json({message: 'user already exist'});
        }

        const hashedpassword = await bcrypt.hash(password,10);


        const newuser = await User.create({
            name,
            email,
            password:hashedpassword
        })

        res.status(201).json({message: 'user created',newuser});


    }
    catch(err){
        console.log(err);
    }
}




const login = async (req,res)=>{
    try{
        const {name , email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({message:'user not exist'});
        }

        // if(password !== user.password){
        //     res.status(400).json({message:"wrong password"});
        // }

        const match = bcrypt.compare(password,user.password);

        if(!match){
            res.status(400).json({message:"wrong password"});
        }

        
        res.status(200).json({message: "login succesfully", user});
        
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {signup, login};