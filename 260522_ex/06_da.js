//객체 구조 분해 할당
const obj = { name: "herry", age: 20, job: "programmer"};
const {name,age,job}= obj;
console.log(`name: ${name}`);
console.log(`age: ${age}`);
console.log(`job: ${job}`);
function f(){
    return {
        name : "java"
    };
}
const {name : personName} = obj;
const {name : personName2} = f();
console.log(personName, personName2);

const{salary,pet="puppy", name: name2, ...rest} = obj;
//const{salary} = undefined; //time error
console.log(salary);
console.log(pet);
console.log(rest);

const obj2 =obj; //재할당
console.log(obj2);
obj["name"] = "bob" //객체에 직접 넣으면  obj2에도 반영됨
console.log(obj2);
const obj3 = {...obj };
const{...obj4}=obj;
obj["name"] = "jhon";
console.log(obj3,obj4);
console.log("obj === obj2", obj === obj2);
console.log("obj === obj3", obj === obj3);

//배열의 구조분해 할당
const arr = ["삼성","한화","키움","엘지","기아"];
const[a1,a2,a3,a4,a5] =arr;
console.log(a1,a2,a3,a4,a5);
const [a6] = arr;
console.log(a6);
const[ , , , , , , a7] = arr;
console.log(a7);
let i = 0;
let j = 100;
console.log(i,j);
[j,i] = [i,j];
console.log(i,j);
const [b, ...c]=arr;
console.log(b,c);
const[d, e, h, ...g]=arr;

arr[0] = { a: 1};
const arr2 = arr;
const arr3 = [...arr];

console.log(arr ===arr3);
arr[1] = 1000;
console.log(arr);
console.log(arr3);
arr[0].a = 1000;
console.log(arr);
console.log(arr3);
