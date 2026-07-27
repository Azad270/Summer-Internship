const express = require('express');

const app  = express();

const PORT = 7002;

const userRoute = require('./routes/user')



//middlewares
app.use(express.urlencoded({extended:false}));

app.use('/api/users' , userRoute);


app.listen(PORT,()=>{
    console.log('server started ');
})