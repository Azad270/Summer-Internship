let a = 4;
let b = 5;

console.log("Before Swapping: ");
console.log("a = ", a);
console.log("b = ", b);

a = a + b;
b = a - b;
a = a - b;

console.log("After swapping: ");
console.log("a = ", a);
console.log("b = ", b);