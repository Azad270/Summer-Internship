var a = [1,2,3,4];
console.log(a);

for(var i=0;i<a.length;i++){
    console.log(a[i]);
}

// array is hetrogeneius

var b = [1,2,"hello",1.2];
console.log(b);

// for-of
for( var e of b){
    console.log(e);
    //e=1
    //e=2
    //e="hello"
    //e=1.2
}