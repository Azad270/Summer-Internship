// let codinglang = ["js", "python","c++", "java","c","ruby"];

// for(let key in codingLang){
//     console.log(codingLang[key]);
// }


// for-each

// codingLang.forEach(function (item){
//     console.log(item);
// })

// //using arrow function 

// codingLang.forEach((item)=>{
//     console.log(item);
// })

/*let myarr = [
    {
        langname: "C++",
        langtext: "cpp"
    },
    {
        langname: "javascript",
        langtext: "js"
    },
    {
        langname: "java",
        langtext: "java"
    },
    {
        langname: "python",
        langtext: "py"
    },
]

myarr.forEach((item) => {
    console.log(item.langtext);
})*/



let emp = [
 {
empName: "Raghav",
empId: "100",
basicSalary: 45000,
HRA: 5000,
DA: 2000
},
{
empName: "Mahesh",
empId: "101",
basicSalary: 50000,
HRA: 6000,
DA: 4000
},
{
empName: "Rohan",
empId: "102",
basicSalary: 45000,
HRA: 3000,
DA: 1000
},
 {
empName: "Suresh",
empId: "103",
basicSalary: 60000,
HRA: 4700,
DA: 3000
}
]
emp.forEach((salary) => {
console.log(salary.empName)
console.log(salary.basicSalary + salary.HRA + salary.DA)
})
