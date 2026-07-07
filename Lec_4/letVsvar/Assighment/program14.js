let num = 1;

for (let i = 1; i <= 4; i++) {
    let pattern = "";

    for (let j = 1; j <= i; j++) {
        pattern +=  num + " ";
        num++;
    }

    console.log(pattern);
}