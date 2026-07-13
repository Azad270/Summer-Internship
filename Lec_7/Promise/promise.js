console.log('hello');

// const promiseOne = new Promise((res,rej)=>{
//     setTimeout(()=>{
//         console.log("coding blocks");

//         res();
//     }, 5000)
// })

// promiseOne.then(()=>{
//     console.log('completed');
// })


const promiseTwo = new Promise((res,rej)=>{
    setTimeout(()=>{
        let error = true;

        if(!error){
            res({name:'xyz', password: '123'});
        }
        else{
            rej('ERROR: something went wrong');
        }
    },5000)
})

promiseTwo.then((user)=>{
    console.log(user);
}).catch((error)=>{
    console.log(error);
})