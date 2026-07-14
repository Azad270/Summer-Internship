const fs = reuire('fs');

let filename = 'song.txt';

console.log("file is being created....");

fs.writeFileSync(filename, "Hello I am coding blocks trainer");

console.log("file created");