let arr = [1,2,3,4,5,6]

// let acc = 0;
// for(let key in arr){
//     acc+=arr[key];
// }

// console.timeLog(acc);

// let total = arr.reduce((acc,curr)=>{
//          return acc+curr;
// },0)

// console.log(total);

let shop =[
    {
        itemname:"tshirt",
        price:2999
    },
    {
        itemname:"shirt",
        price:3999
    },
    {
        itemname:"jacket",
        price:7999
    },
    {
        itemname:"lower",
        price:2999
    },
    {
        itemname:"jeans",
        price:5999
    }
]


let totalprice = shop.reduce((acc,curr)=> acc+curr.price , 0);

console.log(totalprice);
