const fs = require('fs');

let filename  = 'song.txt';

// fs.readFile(filename , (err,data)=>{
//     if(err) throw err;
//     console.log(data);
//     console.log(data.toString())
// })

fs.readFile(filename , {encoding: 'utf-8'},(err,data)=>{
    if(err) throw err;
    console.log(data);
})