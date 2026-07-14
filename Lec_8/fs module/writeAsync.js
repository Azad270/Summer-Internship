const fs = require('fs');

let filename = "song2.txt";

console.log("file is being creaed....");

fs.writeFile(filename,"hello world",(err)=>{
    if(err) throw err;
    console.log('file written successfully');
})

console.log('I am another statement');
console.log('I am another statement');
console.log('I am another statement');
console.log('I am another statement');
console.log('I am another statement');
