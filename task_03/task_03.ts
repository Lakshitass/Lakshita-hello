

// 1. Define variables with types
let myNumber: number = 42;
let myString: string = "Hello, TypeScript!";
let isActive: boolean = true;

console.log(myNumber, myString, isActive);

// 2. Function with typed arguments + return type
function add(a: number, b: number): number {
  return a + b;
}

console.log("Sum from function:", add(10, 20));

// 3. Interface Student
interface Student {
  id: number;
  name: string;
  age: number;
}

let student1: Student = {
  id: 1,
  name: "Lucky",
  age: 21
};

console.log("Student details:", student1);