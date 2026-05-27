const a1="apple";
const a2="pear";
const a3="mandarine";
console.log(a1, a2, a3);

const fruits = ["apple", "pear", "mandarine"];
console.log(fruits);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

fruits[0]="kiwi";
console.log(fruits);
console.log(fruits[0]);

console.log(fruits.length);

//object
const o={
    key : "value",//특정 값 / 함수의 호출에 필요한 이름 - 값.
    true : "123",
    hello : "hello",
    bye : "bye",
    1:100,
    "1 1": "12345"
};
console.log(o.true);
console.log(o.hello);
console.log(o[1]);
console.log(o["1 1"]);

const arr2 =[];
