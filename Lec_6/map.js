let myarr = [1,2,3,4,5,6,7,8,9,10]

let newarr = myarr.map((item)=>{
    if(item%2==0){
        return item+10;
    }else return item;
})

console.log(newarr);

//chaining

// let newarr = myarr.map((item)=>{
//     return item+10;
// }).map((item)=>{
//     return item+1;
// }).filter((item)=>{
//     return item>15;
// })

// console.log(newarr);

