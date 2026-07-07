function getfun(){
    function hello(){
        console.log("hello");
    }

    return hello;
}

let fun = getfun();
fun();