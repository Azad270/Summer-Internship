let num = 121;
let original = num;
let reverse = 0;

while (num > 0) {
    let digit = num % 10;
    reverse = reverse * 10 + digit;
    num = parseInt(num / 10);
}

if (original === reverse) {
    console.log("Palindrome");
} else {
    console.log("Not a Palindrome");
}