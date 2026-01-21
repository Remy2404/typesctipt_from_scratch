import log = require("console");
import console = require("console");
import fs = require("fs");
import vm = require("vm");

function greet(name : string) : string {
    return `Hello, ${name}!`;
}
const message = greet("World");
console.log(message);

//Typescript types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number];
tuple = ["hello", 10];
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
let notSure: any = 4;
notSure = "maybe a string instead";
let hex :number = 0xf00d;
let binary : number = 0b1010;
let octal : number = 0o744;
let big : bigint = 100n;
let float : number = 3.14;

//Symbol type
let sym1: symbol = Symbol("key1");
const obj = {
    [sym1]: "value1"
}

function consoleTypescriptTypes() : void {
    console.log({isDone, decimal, color, list, tuple, c, notSure, hex, binary, octal, big, float , sym1, obj});
}
consoleTypescriptTypes();
console.log(obj[sym1]);

console.log("---------------------------------------")
//Function with type annotations && inference
/* 
Typsscript offers two ways to work with types: 
1. Explicit Type Annotations : You explicitly specify the type of a variable or function parameter.
2. Type Inference : TypeScript automatically infers the type based on the assigned value or return value.
When to Use Each Approach
Use explicit types for:
.Function parameters and return types
.Object literals
.When the initial value might not be the final type
Use type inference for:
.Simple variable declarations with immediate assignment
.When the type is obvious from the context

 */
//Basic Explicit Types
let greeting: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;
//array of numbers
let scores : number[] = [95, 85, 76];
// Explicit Type Annotations
function addExplicit(a: number, b: number): number {
    return a + b;
}
console.log(addExplicit(5, 10));
// Type Inference
let inferredGreeting = "Hello, Inferred TypeScript!";
let inferredCount = 100;
let inferredIsActive = false;
let inferredScores = [88, 77, 66];
function addInferred(a: number, b: number) {
    return a + b;
}
console.log(addInferred(15, 25));
console.log(`Type interface ${inferredGreeting} , ${inferredCount} , ${inferredIsActive} , ${inferredScores}`)
console.log("---------------------------------------")
// object literal interface
const user = {
    name : "Ramy",
    age : 21,
    isActive: true,
    address: {
        street: "Main St"
    }
};
function printUserInfo(user: {name : string; age : number; isActive: boolean}) : string {
    return `username: ${user.name}, age: ${user.age}, active: ${user.isActive}`;
}
const consolePrintUSerInfo = printUserInfo(user);
console.log(consolePrintUSerInfo);
console.log("---------------------------------------")

//Common Cases for any
 const data = JSON.parse('{ "name": "Ramy", "age": 21 }');
 console.log(data)

 //TYpeScript Special Types is any type it will throw an error : 
// let u = true;
// u = "string"; // Error: Type 'string' is not assignable to type 'boolean'.
// Math.round(u); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.

let v : any = true;
v = "string"
Math.round(v);

/* 
Key differences between unknown and any:

unknown must be type-checked before use
You can't access properties on an unknown type without type assertion
You can't call or construct values of type unknown
 */
let w: unknown = 1;
w = "string"; // no error
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void}
// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}

// Type never 
/*
The never type represents the type of values that never occur.
it's used to inducate that something nver happends or should nevr happen
common use case for never :
func that never return (always throw an eeror or enter an infinte loop)
type guard that nver pass type checking 
Exhaustiveness checking in disscriminnated unions

 */
// function infiniteLoop(): never {
//   while (true) {
//     console.log("Running forever...");
//   }
// }
// infiniteLoop()

function throwError(message: string): never {
  throw new Error(message);
}
// throwError("null")

// Exhaustiveness checking with disscriminated unions
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
const circle : Shape = {
    kind : "circle" , radius : 5
};
console.log(getArea(circle))

console.log(getArea(circle))

//Type undefined & null
/* 
In typescript , both undefined and null have their own type just like string or number 
by default these types can be assigned to any other type  but this can be changeed with Typescript strict null check.
key poins about undefined and null:

undrfined means a var has been declared but not assigned a val
null is an explict assignment that represents no val or no obj
In typscript both have thier own types : undefined and null repectively 
with strictNullChecls enabled , you must expp;icty handle these types
 */
let y : undefined = undefined;
let z : null =null;
// ? is an optional 
function Prop(name?: string) {
    return ` hello ${name || 'stranger'}`;
}
const prop = Prop("Ramy");
console.log(prop)
const unprop =Prop()
console.log(unprop)

// Optional prop in an interface
interface User {
    name : string;
    sex : string, 
    age? : number;
}
const u1 : User = {
    name : "Ramy" , 
    sex : "M" ,
};
const u2 : User = {
  name : "Meex", 
  sex : "M",
  age : 21
};
console.log(u1);
console.log(u2);

// nullish coalescing (??) - only uses default if value is null or undefined
let input: string | undefined;
const value = input ?? 'default';
console.log(value)
const street = user?.address?.street;
console.log(street)
console.log(`-----------------------------------------------------`)



//Typescript Arrays 
/*
Typescript has a specifc sytax for typing arrays 

 */
const names : string[] = [];
names.push("Ramy")
console.log(names);

const numbers = [1, 2, 3];
numbers.push(4);
// numbers.push("2") // it was an error :Argment of type 'string' is not assignable
let head : number | undefined = numbers[3];
console.log(head);

// Tuples types in typescript 
/* 
A tuple is a typed array with a pre-denfined len and types for each index.
tuples are great beacus they allow each element in arr to be known type of val 
*/
let ourTuple : [number , boolean, string];
ourTuple = [5 , false , 'coding god was here!'];
ourTuple.push("something new and worng");
console.log(ourTuple);
// name tuples allow to provide context for our val at each index
const graph : [x: number , y : number] = [44.2 , 33.2];
console.log(graph);
//Destructuring
const person: [string, number] = ["Meex", 30];
const [name, age] = person;

console.log(name , age)

const [...rest] = person;
console.log(rest)

// TS obj types :'
const carObj : {
  type : string,
  model : string,
  year: number
} = {
  type: "BMW",
  model : "M1",
  year : 2024
};
console.log(carObj)
type Cat = {
  name : string,
  age : number,
  sex : string
}
const cat : Cat = {
  name : "meow",
  age : 2 , 
  sex : "M"
}
cat.name = "morr"
console.log(cat)

//Enums type 
/*
An emum is a special "class" that represents a group of const var

 */
enum CardinalDirections {
  North =1 ,
  East,
  south,
  west
}
let currdir = CardinalDirections;
console.log(currdir)
console.log(CardinalDirections.west);

enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);
// Try creating a new Car using the alias provided
type CarYear = number;
type CarType = string;
type CarModel = string;
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
};

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const car: Car = {
  year: carYear,
  type: carType,
  model: carModel
};

console.log(car);


interface Reactangle {
  height :number, 
  width : number,

}
const reactangle : Reactangle ={
  height : 20,
  width : 15

};
console.log(reactangle)
interface ColorReactangle extends Reactangle {
  color : string
}
const colorReactangle : ColorReactangle = {
  height : 30 ,
  width : 15,
  color : "Red"
}
console.log(colorReactangle)


function getTime() {
  const now = new Date();
  return {
    epoch: now.getTime(),   
    utcMs: now.getUTCMilliseconds() 
  };
}

console.log(getTime());

function printHello(): void {
  console.log('Hello!');
}
printHello()
function multiply(a: number, b: number) : any {
  return a * b;
}
console.log(multiply(3,2));
function add(a : number , b : number , c? : number) {
  return a + b + (c||0)
}
console.log(add(2,3,4))
function pow(value: number, exponent: number = 10) {
  return value ** exponent;
}
console.log(pow(2));

type Negate = (value: number) => number;

// in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`
const negateFunction: Negate = (value) => value * -1;
console.log(negateFunction(2))
let x: unknown = 'hello';
console.log((x as string).length);
let xs: unknown = 'hello';
console.log((<string>xs).length);

class Person {
  private name : string;
  public constructor(name:string) {
    this.name = name;
  }
  public getName(): string {
    return this.name
  }

}
const personInstance = new Person("Ramy");
console.log(personInstance.getName())

//readonly 

class Product {
  public readonly id : string;
  private name : string;
  private price : number;

  //optional field
  private description?: string | undefined;

  constructor(id : string , name : string , price : number , description? : string) {
    this.id =id;
    this.name = name;
    this.price= price;
    this.description = description;

  }
  // getter and setter for name 
  public getName() : string {
    return this.name;
  }
  public setName(name : string) : void {
     this.name = name;
  }
  public getPrice() : number {
    return this.price;
  }
  public setPrice(price :number) : void {
    if (price <=0) {
      throw new Error("price must be greater than zero")
    }
    this.price= price;
  }
  public getDesc() : string {
    return this.description ?? "No description available"
  }
}

const product = new Product("P001", "Laptop", 1200, "High-end gaming laptop");

console.log(product.id);          
console.log(product.getName());   
console.log(product.getPrice());   

product.setName("Gaming Laptop");  
product.setPrice(1500);           

console.log(product.getDesc());

//Inheritance: Implements

// Interfaces (contracts)
interface Identifiable {
  getId(): string;
}

interface Priced {
  getPrice(): number;
  setPrice(newPrice: number): void;
}

interface Describable {
  getDescription(): string;
}
interface Downloadable {
  download() : string;
}
interface PhysicalProduct {
 getWeight(): number;
}

// Products class implementing all interfaces
class Products implements Identifiable, Priced, Describable {
  public readonly id: string;
  private name: string;
  private price: number;
  private description?: any;

  constructor(id: string, name: string, price: number, description?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  // Identifiable
  public getId(): string {
    return this.id;
  }

  // Priced
  public getPrice(): number {
    return this.price;
  }
  public setPrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error("Price must be greater than zero");
    }
    this.price = newPrice;
  }

  // Describable
  public getDescription(): string {
    return this.description ?? "No description available";
  }

  // Extra: name getter/setter
  public getName(): string {
    return this.name;
  }
  public setName(newName: string): void {
    this.name = newName;
  }
   public describe(): string {
    return `Product[${this.id}] - ${this.name}, $${this.price}`;
  }
}

const products = new Products("P002", "Macbook Pro", 1300, "Macbook laptop");

console.log(products.getId());          
console.log(products.getName());       
console.log(products.getPrice());      
console.log(products.getDescription()); 

products.setName("office Laptop");
products.setPrice(1500);

console.log(product.getName());        
console.log(product.getPrice());

// Inheritance: Extends

class DigitalProduct extends Product implements Downloadable , PhysicalProduct{
  private fileSizeMB: number;
  private format: string;
  private weightKg : number;

  constructor(id: string, name: string, price: number, description: string, fileSizeMB: number, format: string, weightKg: number) {
    super(id, name, price, description);
    this.fileSizeMB = fileSizeMB;
    this.format = format;
    this.weightKg=weightKg;
  }

  public getFileInfo(): string {
    return `${this.format} file, ${this.fileSizeMB}MB`;
  }


 // Implements Downloadable
  public download(): string {
    return `Downloading ${this.getName()} as ${this.format}...`;
  }
  public getWeight(): number {
      return this.weightKg;
  }
  public describe(): string {
    return `DigitalProduct[${this.id}] - ${this.getName()}, $${this.getPrice()}, ${this.format} file, ${this.fileSizeMB}MB, Weight: ${this.weightKg}kg`;
  }
  
}

const ebook = new DigitalProduct("D001", "TypeScript Guide", 25, "TypeScript ebook", 5, "PDF" , 0.5);
console.log(ebook.describe());
console.log(ebook.download());
console.log(ebook.getWeight());

// Abstract class example
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    // Abstract method that must be implemented by subclasses
    abstract makeSound(): string;
}

// Concrete subclass implementing the abstract method
class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return "Woof!";
    }
}

// Concrete subclass implementing the abstract method
class AnimalCat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return "Meow!";
    }
}

const dog = new Dog("Buddy");
console.log(`${dog.getName()} says: ${dog.makeSound()}`);

const animalCat = new AnimalCat("Whiskers");
console.log(`${animalCat.getName()} says: ${animalCat.makeSound()}`);


//TypeScript Basic Generics:


/*
Generics allow creating 'type variables' that can be used with different data types.  we can create reusable components that work with a variety of types rather than a single one.
function identity<T>(arg: T): T {
  return arg;
} 
 */
function identity<T>(value: T): T {
  return value
}

identity<string>("hello")


type Pair<T> = {
  left: T
  right: T
}

const p: Pair<string> = {
  left: "A",
  right: "B"
}
console.log(p)

function findById<T>(data: T[], id: number): T | undefined {
  return data.find(item => (item as any).id === id)
}
  
const users = [{ id: 1, name: "Ramy" }]
const d = [{ id: 10, price: 5 }]

const userResult = findById<typeof users[0]>(users, 1)
const productResult = findById<typeof d[0]>(d, 10)

console.log("User:", userResult)
console.log("Product:", productResult)

type StatusCodess = {
  status: number
}
type Descriptions = {
  desc: string
}
type ApiResponse<
  T extends StatusCodess,
  D extends Descriptions,
> = {
  data: T & D
  isError: boolean
}
const res: ApiResponse<
  { status: number, code: string, example?: string },
  { desc: string, extra: boolean }
> = {
  data: { status: 200, code: "OK", desc: "success", extra: true , example: "example" },
  isError: false
}
console.log(res)

//generic constraints
interface HasId {
  id: string;
}
function getById<T extends HasId>(items: T[], id: string): T | undefined {  
  return items.find(item => item.id === id);
}
const items = [
  { id: "a1", name: "Item 1" },
  { id: "b2", name: "Item 2" },
];
const item = getById(items, "b2");
console.log(item);
// Pick utility type
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const k of keys) {
    result[k] = obj[k];
  }
  return result;
}
// usage (plain object)
const productObj = { id: "P01", name: "Pen", price: 2.5, description: "Blue pen", category: "office" };
const copy = pick(productObj, "id", "name", "price", "description");
console.log(copy);


// usage (class instance)
const ebookSummary = {
  id: ebook.id,                  // public readonly
  name: ebook.getName(),         // use getter for private field
  price: ebook.getPrice(),       // use getter
  description: ebook.getDesc()   // use getter (returns fallback if undefined)
};
console.log(ebookSummary);

//gernics with classes
class Box<T> {
  private content: T;
  constructor(content: T) {
    this.content = content;
  }
  public getContent(): T {
    return this.content;
  }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getContent());
const stringBox = new Box<string>("Hello Generics");
console.log(stringBox.getContent());
console.log("-----------------------------------------------------")

//TypeScript Utility Types

/* TypeScript comes with a large b=number of types that can help with some common typw manioualtion , usually referend to as utillty types
 */
// partial 
// Partial changes all the propeites in an onbject to be optional 
interface Point3D {
  x: number
  y: number
  z: number
}

type PartialPoint3D = Partial<Point3D>

const p1: PartialPoint3D = { x: 10 }
const p2: PartialPoint3D = { y: 5, z: 8 }
const p3: PartialPoint3D = {}
console.log("p1 =", p1)
console.log("p2 =", p2)
console.log("p3 =", p3)

//Readonly<T> make all property of an object immutable 
/*
Math Anology : 
If we have a  vector in 3D space , v= = (x, y , z)
if the vector is Readonly , it's like a constant vector C
once defined , you cannot change it's compoents 

 */

interface Vector {
  x: number
  y: number
  z: number
}

type ConstantVector = Readonly<Vector>

const vector1: ConstantVector = { x: 1, y: 2, z: 3 }
// vector1.x = 10 //  Error: cannot assign to read-only property
console.log("constant vector:", vector1)

// Parameters 
/*
Concept : 
parameter<T> extract the parameter types of a function as a tuple 
Math Anology : 
Consider :a function in Math : f(a,b) = a-b 
the domain of f is [a, b ] 
in typescript , parameter of f > give [number , number ]
 */
function minus(a : number , b : number ) {
  return a -b;
}
type arg = Parameters<typeof minus>
const val : arg = [3, 4]
console.log('argument tuple is ', val);
console.log('result of minus is ', minus(...val))
// ReturnType<T> : extract the return type of a function
/*
Concept :
ReturnType<T> extract the return type of a function
Math Anology :
Consider a function in Math : f(a,b) = sqrt(a^2 + b^2)
the codomain of f is number
in typescript , ReturnType of f > = number
 */
function sqrtHypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}
type HypotenuseReturnType = ReturnType<typeof sqrtHypotenuse>;
const hypotenuse: HypotenuseReturnType = sqrtHypotenuse(3, 4);
console.log("Hypotenuse:", hypotenuse);
//if without ReturnType
function sqrtHypotenuseNoReturnType(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}
const hypotenuseNoReturnType: number = sqrtHypotenuseNoReturnType(5, 12);
console.log("Hypotenuse without ReturnType:", hypotenuseNoReturnType);
console.log("-----------------------------------------------------")

function maybeDistance(x: number, y: number) {
  if (x < 0 || y < 0) return null
  return Math.sqrt(x*x + y*y)
}

const ress = maybeDistance(-1, 2)
console.log( `Distance is: ${ress ?? 'invalid input'}`)

// 4 Exclude 
/*
Concept : Exclude<T , U>  remove from T all types that are assignable to U
Math Anology :
set A : {add , sub , mul , div }
Remove "div " -> {add , sub . mul}
like set diffrence A \ B 
*/
 type Ops = "add" | "mul" | "div"
 type BinaryOps = Exclude<Ops , "div"> 
 const op :BinaryOps = "mul"
 console.log("Binary operation :" , op)
console.log(op.includes("div"))

//Omit 

/*
Concept : 
Omit<T , K> removes specific properites :
Math Anology : 
3D point (x, y, z) 
Remove z -> falttend 2D point in xy-plane.
 */
interface Point3D1 {
  x: number, 
  y: number ,
  z: number , 
}
const addNewOmit = { color : "red" , time : 2024 }
type Noz = Omit<Point3D1, "z"> & typeof addNewOmit 
const falt : Noz = {
  x : 5,
  y: 10,
  color : "red",
  time : 2024
}
console.log("Omit" , falt)
console.log("Keys:", Object.keys(falt));

//ts keyof operator
/*
Concept : keyof is a keyword in ts which is used to extract the key type from an object type.

when used on an object type with explict , <keyof> create a union type with those keys
 */

interface PersonType {
  name : string;
  age : number;
}
function printPersonProperty(personP : PersonType , props : keyof PersonType) {
  console.log(`Printing person properites ${personP[props]}`)
};
let personP = {
  name : "memes", 
  age : 21
}
printPersonProperty(personP , "age")

type StringMap = { [key: string]: unknown };
// `keyof StringMap` resolves to `string` here
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}
console.log(JSON.stringify(createStringPair('greeting', 'hello')));

// null & undefenined in typescript :
/* 
Concept : Typsscript has a powerful to dal with null or undefined valuses
by default null & undeifned handling is disabled , and can be enabaled by setting strictNullCheck to true.

the rest of the page applies for when strictNullCheck is enabled.
 */
function getLength(str: string | null | undefined): number {
  if (str === null || str === undefined) {
    return 0;
  }
  return str.length;
}
console.log(getLength("Hello, TypeScript!")); // Outputs: 18
console.log(getLength(null));
console.log(getLength(""));
console.log(getLength(undefined));

//Optional Chaining 
/*
Optional chaining is javascript feature that working well with typeScript null handling.
it allows accessing pros on an object that may or may not exist using compact syntax
it can be used with the ?. Opeator when accesing pros 
 */
interface House {
  sqft : number;
  yard? : {
    sqft : number;
  };
}
function printYardSize(house : House) {
  const yardSize = house.yard?.sqft;
  if(yardSize === undefined) {
    console.log(`no yard!`);
  } else {
    console.log(`yard is ${yardSize} sqft`)
  }
}
let home :House = {
  sqft :500
}
printYardSize(home)
// with yard
home = {
  sqft : 800,
  yard : {
    sqft : 200
  }
}
printYardSize(home)
//null Assertion operator (!)
/*
the non-null assertion operator ! is a way to tell the typescript compiler that a value is not null or undefined

even if the compiler cannot deduce that fact itself.
 */
function printLength(str: string ) {
  console.log(`Length is ${str!.length}`);
}
printLength("");

let val3 : string | null | undefined
console.log(val3?.length)
function getValue(): string {
  return "hello";
}

// let value1= getValue();

// console.log("Length:", value1!.length);

// let value2: string | undefined;
// console.log(value2!.length)
function findUser(): string | undefined {
  return Math.random() > 0.5 ? "Ramy" : undefined
}
let userName = findUser();
console.log(userName!.toUpperCase());