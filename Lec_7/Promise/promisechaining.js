let p = new Promise((res,rej)=>{
    res();
})

p 
    .then(()=>{
        console.log("resolved");
        return 2; //promise always return a new promise 
    })
    .then((data)=>{
        console.log('prev promise return data');

        return data*2;
    })
    .then((data)=>{
        console.log(data);

    })
    .catch(()=>{
        console.log('promise rejected');
    })