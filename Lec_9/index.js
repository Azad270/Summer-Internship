const http = require('http');

//create the server 

// const myserver  = http.createServer((req,res)=>{
//     console.log("hello");
//     res.end('hello students ');
// })

const myserver  = http.createServer((req,res)=>{
    // console.log(req);
    // res.end('hello students ');
    switch(req.url){
        case '/' : res.end('hello from server ');
        break ;
        case '/contact' : res.end(' i m contact page ');
        break ;
        case '/about' : res.end('i m about page ')
        break ;
        default : res.end('404 not found');
    }
})


// server listen to any port 

myserver.listen(8000,()=>{
    console.log('server strated');
})