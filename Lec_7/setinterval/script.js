let h = document.querySelector('h1');

const change = setInterval(()=>{
    h.innerHTML = "hello" + Date.now();
}, 4000)

document.querySelector('button').addEventListener('click', ()=>{
    clearInterval(change)
})