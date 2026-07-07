let a = 15;
let b = 42;
let c = 28;
let d = 67;
let e = 35;

let greatest = a;

if (b > greatest) {
    greatest = b;
}
if (c > greatest) {
    greatest = c;
}
if (d > greatest) {
    greatest = d;
}
if (e > greatest) {
    greatest = e;
}

console.log("Greatest number is:", greatest);