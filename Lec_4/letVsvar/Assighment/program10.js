let num = 123;
let count = 0;

while (num > 0) {
    count++;
    num = parseInt(num / 10);
}

console.log("Number of digits:", count);