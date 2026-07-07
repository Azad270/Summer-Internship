let a = () => {
    console.log("hello");
}

a();

// return type

/*let b = (a,b) =>{
    return a+b // explicit return
}
let c = b(29,28)
console.log(c);*/

/*let b = (a,b) => (a+b) //implicit return
let c = b(29,28)
console.log(c);*/

let b = (a,b) => a+b // single line return
let c = b(29,28)
console.log(c);