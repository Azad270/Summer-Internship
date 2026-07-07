let num = 123;
let reverse = 0;

while (num > 0) {
    let digit = num % 10;
    reverse = reverse * 10 + digit;
    num = parseInt(num / 10);
}

console.log("Reversed Number:", reverse);