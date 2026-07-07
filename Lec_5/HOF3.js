// Function that accepts another function
function callFun(fun) {
    console.log("Inside callFun");
    fun();   // Calls the returned closure
}

// Function that returns a closure
function getFun(name) {

    // 'hello' forms a closure because it remembers 'name'
    function hello() {
        console.log("Hello " + name);
    }

    return hello;
}

// getFun returns a function
let myFunction = getFun("Azad");

// Pass that returned function as an argument
callFun(myFunction);