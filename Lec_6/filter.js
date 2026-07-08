//let arr = [1,2,3,4,5,6,7]

/*let newarr = [];

arr.forEach((item)=>{ 
    if(item>6){
        newarr.push(item);
    }
})*/

/*let newarr = arr.filter((item)=>{
    return item>6;
})
console.log(newarr);*/

let books = [
    {
        title:"book one",
        genre:"fiction",
        publish:"1990",
        edition:"2005"
    },
    {
        title:"book two",
        genre:"non-fiction",
        publish:"1997",
        edition:"2005"
    },
    {
        title:"book 3",
        genre:"history",
        publish:"1990",
        edition:"2007"
    },
    {
        title:"book 4",
        genre:"sci-fi",
        publish:"1990",
        edition:"2009"
    },
    {
        title:"book 5",
        genre:"fiction",
        publish:"1967",
        edition:"2003"
    },
    {
        title:"book 6",
        genre:"fiction",
        publish:"1950",
        edition:"2004"
    }
]


// let myarr = books.filter((item)=>{
//     return item.genre==="history"
// })

// console.log(myarr);


// edition > 2004

// let newarr = books.filter((item)=>{
//     return item.edition>2004;
// })

// console.log(newarr);

let newarr = books.filter((item)=>{
    return item.edition>2010 && item.genre==="history";
})

console.log(newarr);


