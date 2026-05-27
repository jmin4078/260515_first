const o= {};
o.a = "a";
o.b = "b";
o["c d"] = "c d";

console.log(o);
const map = new Map();

o["aa"] = 1234;
//객체형 [프로퍼티(리터럴 - 타자로 쳐서 표현할 수 있는 값)] = 값
o.bb = 12345; //공백이나 특수문자같은 식별자 규칙을 위반하지 않는 경우, 변수명으로 지정가능

// set이라는 전용함수 사용, map.set(키, 값);
map.set("aa", 1234);
map.set("bb", 12345);

console.log(o["aa"],o.aa);
console.log(map.get("aa"));

//객체에 특정 프로퍼티 포함 여부 확인 in
console.log(`"aa"in o`, "aa" in o);
console.log(`"cc"in o`, "cc" in o);
//특정키 포함 여부
console.log(map.has("aa"));
console.log(map.has("cc"));
//key - map 연결시킨다
console.log(map);

for(const c of Object.entries(o)){
    console.log(c);
}

//delete o[프로퍼티 명]


console.log(map.entries());
console.log(map.keys());
console.log(map.values());


for (const c of map) { //변환과정 거치지 않아도 됨
    //iterable 하다 
    console.log(c);
}

console.log(Object.values(o).length);
console.log(map.size);