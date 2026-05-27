//비교연산자
////............................................

console.log(1 + "1"); // +가 문자열 연산에 있으므로 숫자가 문자열로 변환됨.
console.log(1 - "1"); //문자열을 숫자로 변환.
console.log(1 * "1");
console.log(1 / "1");   
console.log(1 + "1"*1);

console.log(1=="1"); // 1이 문자열로 변환되어 문자1과 비교됨. true..

//일치 연산자
console.log(1 === "1"); // false. 숫자 1과 문자 "1"은 다름.
console.log(1 !== "1");
console.log("" == 0);
console.log(0 == "0");
console.log(""=="0");

//논리 연산자 &&(and),||(or),!(not)


//증감 연산자
let x =1;
x++;
console.log(x);
x--;
console.log(x); 
console.log(x++);
console.log(++x);
console.log(--x);