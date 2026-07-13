let h =document.querySelector('h1');


const change  = setTimeout(() => {
    h.innerHTML = "hello students of ADTU "
}, 5000);


document.querySelector('button').addEventListener('click',()=>{
    clearTimeout(change)
})