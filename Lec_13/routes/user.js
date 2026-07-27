const express = require('express')

const fs = require('fs');

const router = express.Router();

const users = require('./MOCK_DATA.json');

router.get('/',(req,res)=>{
    return res.json(users);
})

//get particular data using id

router.get('/:id', (req,res)=>{
    const id = Number(req.params.id)

    console.log(typeof(id));

    const user = users.filter((item)=> item.id===id);

    console.log(user);

    return res.json(user);


})

//post

router.post('/' , (req,res)=>{
    const body = req.body; // extracted the data from body

    console.log(body);

    users.push({id:users.length+1 , ...body}); // expanding the body part in user using ...

    fs.writeFile('./MOCK_DATA (2).json' , JSON.stringify(users), (err,data)=>{
        return res.json({status:"succesfull"});
    })


})

//patch -  update the selected data
router.patch('/:id', (req,res)=>{
    const id = Number(req.params.id);

    let obj = users.find((item)=> item.id===id);

    console.log(obj);

    obj.first_name = req.body.first_name;

    console.log(obj);

    fs.writeFile('./MOCK_DATA (2).json' , JSON.stringify(users), (err,data)=>{
        return res.json({status:"succesfull"});
    })




    
})



//delete - delete

router.delete('/:id', (req,res)=>{
    const id =Number( req.params.id);

    const x = users.filter((item)=> item.id!==id);


    fs.writeFile('./MOCK_DATA (2).json' , JSON.stringify(x), (err,data)=>{
        return res.json({status:"succesfull"});
    })



})


module.exports = router ;