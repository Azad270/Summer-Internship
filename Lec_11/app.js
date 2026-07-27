const express = require('express');

const app  = express();

const PORT = 4444;

app.get('/',(req,res)=>{
    res.send('hello students');
})

// query

app.get('/name' , (req,res)=>{
    console.log(req.query);
    const name = req.query.q;

    res.send(`hello ${name}`);


})


//params

app.get('/name/:id', (req,res)=>{
    const id = req.params.id;

    res.send(`hello my id is ${id}`);
})



app.listen(PORT,()=>{
    console.log('server started');
})