function createcounter(){
    let cnt = 0;

    function inc(){
        cnt++;
        return cnt;
    }

    return inc;
}

let counter1 = createcounter();
console.log(counter1()); //1
console.log(counter1()); //2
console.log(counter1()); //3

let counter2 = createcounter();
console.log(counter2()); //1