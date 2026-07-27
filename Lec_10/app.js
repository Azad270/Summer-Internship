const express = require('express');

const app = express();


app.get('/', (req,res)=>{
    // res.send('hello world ')
    res.sendFile('C:\\Users\\1234\\Desktop\\ADTU web 01july\\Lec_1\\index.html')
})

app.get('/about', (req,res)=>{
    res.send('hello about page ')
})


// app listen on port 

app.listen(7001,()=>{
    console.log('server started ');
})