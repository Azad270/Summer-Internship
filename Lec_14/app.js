const express = require('express');
const connectDB = require('./connection');

const app = express();

const userRoutes = require('./routes/userRoutes');


const Port = 8003

connectDB();


//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users',userRoutes);


app.listen(Port, ()=>{
    console.log('server started');
})