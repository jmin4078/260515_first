class Person {
    //생성자
    constructor(name) {
        this.name = name; 
        this.address = "korea";
    }
    
sayhi() {
    console.log(this.#age);
    console.log(`my name is ${this.name}`)
}
 #age = 27;
    address;
}


const p1 = new Person();
const p2 = new Person("jmkk");
console.log(p1,p2);
p1.sayhi();
p2.sayhi();


console.log(p1.name,p2.name);