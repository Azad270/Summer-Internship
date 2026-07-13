let divs = document.querySelectorAll('.color');
console.log(divs);

let btn = document.querySelector('button')

btn.addEventListener('click', ()=>{
    document.body.style.backgroundColor ='white';
})

divs.forEach((div)=>{
    div.addEventListener('click', (e)=>{
        console.log(e);

        if(e.target.id ==='red'){
            document.body.style.backgroundColor ='red';
        }
        if(e.target.id ==='green'){
            document.body.style.backgroundColor ='green';
        }
        if(e.target.id ==='blue'){
            document.body.style.backgroundColor ='blue';
        }
        if(e.target.id ==='pink'){
            document.body.style.backgroundColor ='pink';
        }
    })

})