function getfun(){
    let a=10, b=20;

    function add(){
        return a+b;
    }

    return add;
}
let fun = getfun();
let c = fun();
console.log(c);