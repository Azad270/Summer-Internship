let add = function(num){
    if(!num) return 0;

    return function solve(v){
        if(!v) return num;
        num+=v;
        return solve;
    }
}

console.log(add()); // 0
console.log(add(1)()); // 1
console.log(add(1)(2)()); // 3
console.log(add(1)(2)(3)()); // 6