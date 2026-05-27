function f1(a,b,c)
{
    console.log(a*2,b*2,c*2);
}

f1()    //아무것도 안넣어도 작동
f1(1)    //일부만 넣어도 작동
f1(1,2) //이하 동일
f1(1,2,3,4) //넘치게 넣어도 작동. 무시함.

function f2(a=120,b=150)
{
    return a*b;
}
console.log(f2()); //18000
console.log(f2(100)); //15000

function f3()
{

}
f3();
f3(1,2,3,4,5);

function f4(a, ...b)
{
    console.log("a",a);
    console.log("b",b);
}
f4(1);
f4(1,2);
f4(1,2,3,4,5,6,7);

function f5(props)
{
    if(props.a){
        console.log("props.a",props.a);

    }
    
    console.log("props.b",props.b||"없음");
    console.log("props.c",props.c);
    
}
f5({});
f5({a:10});


