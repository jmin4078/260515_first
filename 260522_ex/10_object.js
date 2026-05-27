const program = {
    name : "get a rich",
    numbers :[],
    pickNumber(){
        console.log("숫자를 뽑았습니다");
    },
}; 
console.log(`program name : ${program.name}`);
console.log(`program pick number : ${program.numbers}`);
program.pickNumber();
program.language = "JS";
program.numbers = [1, 2, 3, 5, 8, 11];
delete program.trash;
console.log(program);



console.log(Object.keys(program));
console.log(Object.values(program));
console.log(Object.entries(program));
for (const k of Object.keys(program)){
    console.log(k);
}
for (const v of Object.values(program)){
    console.log(v);
}
for (const [k, v] of Object.entries(program)){
    console.log(k, v);
}
