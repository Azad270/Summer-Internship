const fs = require('fs');

let filename = 'song.txt';

const data = fs.readFileSync(filename,'utf-8');

console.log(data);