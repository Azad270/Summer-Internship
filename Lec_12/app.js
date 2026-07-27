const express = require('express');

const app  = express();

const PORT = 8001;

const fs = require('fs');

const users = require('./MOCK_DATA (2).json')


//middlewares
app.use(express.urlencoded({extended:false}));



// get all users data 
app.get('/api/users',(req,res)=>{
    res.send(users);
})

//get particular data using id

app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id)

    console.log(typeof(id));

    const user = users.filter((item)=> item.id===id);

    console.log(user);

    return res.json(user);


})

//post

app.post('/api/users' , (req,res)=>{
    const body = req.body; // extracted the data from body

    console.log(body);

    users.push({id:users.length+1 , ...body}); // expanding the body part in user using ...

    fs.writeFile('./MOCK_DATA (2).json' , JSON.stringify(users), (err,data)=>{
        return res.json({status:"succesfull"});
    })


})

//patch -  update the selected data
app.patch('/api/users/:id', (req,res)=>{
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

app.delete('/api/users/:id', (req,res)=>{
    const id =Number( req.params.id);

    const x = users.filter((item)=> item.id!==id);


    fs.writeFile('./MOCK_DATA (2).json' , JSON.stringify(x), (err,data)=>{
        return res.json({status:"succesfull"});
    })



})




app.listen(PORT,()=>{
    console.log('server started ');
})