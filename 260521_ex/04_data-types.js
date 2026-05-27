const int =1;
const int2 =-1;
const folat = 1.01;
console.log(typeof int);
console.log(typeof int2);
console.log(typeof folat);


const t =true;
const f = false;
console.log(typeof t);
console.log(typeof f);

const name ="제민기 입니다";
console.log(typeof name);

const n = null;
console.log(typeof n); // object 설계오류 ㅋㅋ

//undefined
let u;
console.log(typeof u);
let u2=undefined;
console.log(typeof u2);
let u3 ={};
console.log(typeof u3.u);

//object
let o={};
console.log(typeof o);
let arr=[];
console.log(typeof arr);

//템플릿 리터럴
const n2="김자바";
console.log(n2 + "은(는) 개발자이다");
console.log("대한민국에 사는" +  n2 + "은(는) 개발자이다");
console.log(`${n2}은(는) 개발자이다`);

console.log(`대한민국에사는 ${n2}은(는) 개발자이다`);
console.log(`시작
    
    엔터가 있으면 그대로 읽음
    
    끝`);