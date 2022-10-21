---
title: 'Typescript'
date: 'September 22, 2022'
excerpt: "These are just some notes that I have taken along the way of learning typescript, mostly from Dmytro's course"
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Typescript
[**Great Course Here**](https://www.udemy.com/course/react-with-typescript/)

# setUp
- Strict mode true
- esModuleInterop true
    - *This makes it so you don't have to use the * when importing*
- you want strict null checks set to true
    - *This makes it so that you can't pass null if it is not expected*
- "skipLibCheck": true
    - *This skips type check declarations and decreases compile time*
- no unchecked index access to true
- forceConsistentCasingInFileNames true
- strict null checks true
- outDir *determines where you compiled code will go*
- the include array determines what files should be compiled 
- If you install package that doesn't have types *make a file filename.d.ts*

```typescript
        declare module 'filename' {
            export function someFn():number;
        }
```

- When using react you should make a source map so you can accurately match error lines correctly webpack.config.js

```javascript
        const htmlWebpackPlugin = require('html-webpack-plugin');
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        
        module.exports = {
            entry: './src/index.tsx',
            <!-- This is the line that makes the source map accurate -->
            <!-- YOU SHOULD MAKE SURE THIS IS SET TO NONE IN PRODUCTION -->
            devtool: "eval-source-map",
            resolve: {
                extensions: ['.js', '.ts', '.tsx']
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: "babel-loader",
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/,
                        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { modules: true } }],
                    },
                    {
                        test: /\.svg$/,
                        loader: "@svgr/webpack",
                        options: {
                            svgoConfig: {
                                plugins: {
                                    removeViewBox: false,
                                }
                            }
                        }
                    },
                ],
            },
        
            plugins: [
                new htmlWebpackPlugin({
                    template: './src/index.html',
                    filename: 'index.html'
                }),
                new MiniCssExtractPlugin(),
            ]
        }
```

# Types
>## Primitive Types

> ```typescript
> let id: number = 5
> let company: string = 'Traversy Media'
> let isPublished: boolean = true
> let x: any = 'Hello'
> let x: null = null
> 
> ```

>## non-Primitive Types

> ```typescript
> const myObj: object = {}
> const myObj: object = []
> const myObj: object = new Map()
><!-- Arrays -->
> let ids: Array<number> = [1, 2, 3, 4, 5]
> let ids: number[] = [1, 2, 3, 4, 5]
> let arr: any[] = [1, true, 'Hello']
> ```

## Union

> ```typescript
> let pid: string | number
> pid = '22'
> ```

# Tuple/ Array

> ```typescript
> let person: [number, string, boolean] = [1, 'Brad', true]
> // Tuple Array
> let employees: [number, string][]
> 
> employee = [
>   [1, 'Brad'],
>   [2, 'John'],
>   [3, 'Jill'],
> ]
> ```


# Enum
**returns the index of the "object"(Direction1) can change default by reassigning up to one**


>```typescript
>enum Direction1 {
>  Up = 1,
>  Down,
>  Left,
>  Right,
>}
>
> let myDirection: Direction1 = Direction1.Down;
> console.log(myDirection)
> = 2
> console.log(Direction1[3]);
> <!--^^^ Only works in an indexed enum not a string one  -->
>= Left
>
>enum Direction2 {
>  Up = 'Up',
>  Down = 'Down',
>  Left = 'Left',
>  Right = 'Right',
>}
>```

# Objects

> ```typescript
> type User = {
>   id: number
>   name: string
> }
> 
> const user: User = {
>   id: 1,
>   name: 'John',
> }
> ```

# Type Assertion(as)

> ```typescript
> let cid: any = 1
> // let customerId = <number>cid
> // can't use this in jsx
> let customerId = cid as number
> const input - e.currentTarget as HTMLInputElement;
> ```

# Functions

> ```typescript
> function addNum(x: number, y: number): number {
>   return x + y
> }
> type MathFunc = (x: number, y: number)=> number;
> 
> 
> const add: MathFunc = (x: number, y: number): number => x + y
> const sub: MathFunc = (x: number, y: number): number => x - y
> ```
>
> ## Void
> **Means it won't return anything**

> ```typescript
> function log(message: string | number): void {
>   console.log(message)
> }
> ```

> ## Making an interface that describes a function

> ```typescript
> interface Sum{
>    (a:number, b:number): number;
>}
> // Just making a function type
> type MyFunc = (a:number, b:number)=>number
>
> // Overloads
> functionCalcArea(width:number, height:number):number;
> functionCalcArea(length: number):number;
> // We need to test for which case we are working in
> functionCalcArea(...args:number[]):number{
>     if(args.length ===2){
>         return args[0 * args[1]]
>     }
>     return Math.pow(args[0], 2);
> }
> ```

# Interfaces

> ```typescript
> interface UserInterface {
>   readonly id: number
> <!-- This makes it that once declared it cannot be modified again -->
>   name: string
>   age?: number
> }
> let user: UserInterface =  {
>   id: 1,
>   name: 'John'
> }
> 
> // Dynamic Interfaces
> interface A{
>   specificProp: string
> // The above won't work unless you add | string to the dynamic line *below*
>   [key: string]: number;
>}
>
> interface PersonInterface {
>   id: number
>   name: string
>   register(): string
> }
> interface Example extends UserInterface, PersonInterface {}
>
> ```

> ## Merging interfaces
>*By re-declaring an interface with the same name as a previous one you add the new properties too it kinda like css honestly because you can also over  ride properties as well*


# Classes
> **private makes it so the function can only be accessed in the class**
> **public can be accessed anywhere**
> *An abstract class can only be inherited not created*



> ```typescript
> class Person implements PersonInterface {
>  private id: number 
> <!-- Can only be used in the Class -->
>  protected name: string
> <!-- Can only be used in the Class and or in its sub classes --> 
> // You can declare protected in constructor OR above when using typescript
>   constructor(protected id: number, name: string) {
>     this.id = id
>     this.name = name
>   }
> 
>   register() {
>     return `${this.name} is now registered`
>   }
> }
> 
> const brad = new Person(1, 'Brad Traversy')
> const mike = new Person(2, 'Mike Jordan')
> ```

> ## Sub Classes

> ```typescript
> class Employee extends Person {
>   position: string
> 
>   constructor(id: number, name: string, position: string) {
>     super(id, name)
>     this.position = position
>   }
> }
> 
> const emp = new Employee(3, 'Shawn', 'Developer')
> ```
>
## Using setters and getters

> ```typescript
> class A{
>     private _amount: number
>     set amount(amount:number){
>         this._amount = amount;
>     }
>     get amount(){
>         return this._amount;
>     }
> }
> ```


> ## Advanced Classes
> ### The difference between extends and implements
> *Extends means that the child object inherits methods and properties of the parent. Implements means that an object should implement necessary methods and properties.*
> -------
> **Using instance and Static functions**
> *You can not use the same interface for the __static__ and __instance__ side
> For the static side we can only describe the constructor 
> For the instance side we can only describe the public properties 

> ```typescript
> interface Animal{
>     name: string;
>     group: string | undefined;
>     setGroup(group: string): void;
> }
> 
> class Cat implements Animal{
>     // ?Not sure why I need name: string twice here?
> // It is because we have strict mode on and the variable needs to be initialized
>     name :string;
>     group: string | undefined;
>     constructor(name: string){
>         this.name = name;
>     }
>     setGroup(group: string){
>         this.group = group;
>     };
> }
> class Dog implements Animal{
>     // ?Not sure why I need name: string twice here?
>     name:string;
>     group: string | undefined;
>     constructor(name: string){
>         this.name = name;
>     }
>      setGroup(group: string){
>         this.group = group;
>     };
>     bark(){};
> }
> 
> interface AnimalConstructorFunction<T>{
>     // new allows typescript to know it's describing a constructor
>     new (name:string): T;
> }
> 
> function initializeAnimal<T extends Animal>(Animal: AnimalConstructorFunction<T>, name: string){
> // by using the generic T with extends animal it will allow typescript to ... but make sure Animal at least has the Animal interface stuff
>     const animal = new Animal(name);
>     animal.setGroup('mammals');
>     return animal;
> }
> ```

# Generics

> ```typescript
> // Generic Functions
> function genericFunction<T>(x: T): T {
>   return x;
> }
> 
> const genericArrowFunction = <T>(x: T): T => x;
> 
> // Generic Interfaces
> interface GenericInterface<T> {
>   (a: T): T;
>   someProp: T;
> }
> 
> interface GenericInterface<T> {
>   <U>(a: U): U;
>   someProp: T;
> }
> 
> // Generic Classes
> class GenericClass<P> {
>   constructor(public props: P) {}
> 
>   getProps(): P {
>     return this.props;
>   }
> }
> 
> interface Expirable {
>   expiryDate: Date;
> }
> interface ChocolateCake extends Expirable {}
> interface VanillaCake extends Expirable {}
> 
> const chocoCakes: ChocolateCake[] = [{ expiryDate: new Date() }];
> const vanillaCakes: VanillaCake[] = [{ expiryDate: new Date() }];
> 
> interface GetExpiredItemsFunction {
>   <Item extends Expirable>(items: Array<Item>): Array<Item>;
> }
> 
> const getExpiredItems: GetExpiredItemsFunction = items => {
>   const currentDate = new Date().getTime();
>   return items.filter(item => item.expiryDate.getDate() < currentDate);
> };
>
> // could also just do this
> const getExpiredItems = <Item extends Expirable>(items: Array<Item>) => {
>   const currentDate = new Date().getTime();
>   return items.filter(item => item.expiryDate.getDate() < currentDate);
> };
> 
> const expiredChocoCakes = getExpiredItems<ChocolateCake>(chocoCakes);
> const expiredVanillaCakes = getExpiredItems<VanillaCake>(vanillaCakes);
> 
> class ShoppingCart<ItemId, Item extends { id: ItemId }> {
>   private items: Array<Item> = [];
>   addItem(item: Item) {
>     this.items.push(item);
>   }
>   getItemById(id: ItemId) {
>     this.items.find(item => item.id === id);
>   }
>   //
>   //  static x: Item;
>   //  static someMethod(x: Item) {
>   //    let y: Item;
>   //  }
> }
> ```

# Type Card for Unions
**This is how you check when you are using or and etc.**
>
> ```typescript
> function aFunction(param: string | number){
>     if(typeof param === "string"){
>         param.toUpperCase();
>         <!-- this must be done in the if statement because numbers don't have access to that function -->
>     }
> }
> ```

> ## For Object Params 

> ```typescript
> interface Cat{
>     walk(): void;
>     meow(): void;
> }
>  interface Dog{
>     walk(): void;
>     bark(): void;
> }
>
>function isDog(someObject: Cat | Dog): someObject is Dog{ // This means that isDog returns a boolean to tell you if someObject is Dog
>    return(<Dog>SomeObject).bark !== undefined;
>}
>
>function callMyPet(pet: Dog | Cat){
>    pet.walk();
>   if(isDog(pet)){
>     pet.bark();
>   }
>   else{
>     pet.meow();
>   }
>}
>
> // Or
>function callMyPet(pet: Dog | Cat){
>    pet.walk();
>   if(<Dog>pet.bark){
>     (<Dog>pet).bark();
>   }
>   else{
>     (<Cat>pet).meow();
>   }
>}
>
>
>```

>  ## For classes

>  ```typescript
> class Foo{
>     foo: number;
>     commonProp: string;
> }
> class Bar{
>     bar: number;
>     commonProp: string;
> }
> 
> function fooBarFunction(obj: Foo | Bar){
>     if(obj instanceof Foo){
>         obj.foo
>     }else{
>         obj.bar
>     }
> }
> ```

# Intersection Type

> ```typescript
> interface IA{
>     a: number;
> }
> interface IB{
>     b: number;
> }
> 
> function X(obj: IA & IB){
>     return obj.a + obj.b;
> }
> 
> function combine<ObjA extends object, ObjB extends object>(objA:ObjA, objB:ObjB): ObjA & ObjB{
>     return {...objA, ...objB};
> }
> ```

# Type Alias
> **You will probably use this with the utilities mostly**

>```typescript
>type StringArrayOrNull = string | string[] | null;
>type twoObjects = {a:number} & {b: number};
>type GenericArray<T> = T[];
>```

># Using module without types
>**In type.d.ts file**

>```typescript
>declare module 'react'{
>    export function anyFunctionsItmightHave(): number;
>}
>```

# Utilities

> ## Partial
> **Makes all parts of the interface optional**

> ```typescript
> interface Starship{
>     name: string;
>     enableHyperJump:boolean;
> }
> const updateStarship = (id: number, starship: Partial<Starship>)=>{};
> 
> updateStarship(1, {
>     name: 'Explorer';
>     // if you don't have the partial option it will expect you to declare all the parameters
> })
> ```

> ## Required
> **Opposite of Partial**
> 
> ## Readonly
> **Makes all parts read only _so they cant be changed once they are set_**
>
> ## Record
> **Used to describe an object thats key values are another object that you want to describe with an interface**

> ```typescript
> interface ButtonProps{
>     size?: ButtonSize;
> }
> 
> type ButtonSizes = "small" | "big" ;
> 
> const Button: FC<ButtonProps> = ({children, size = "small"})=>{
>     return <button style={{...sizeRecord[size]}}> {children} </button>;
> };
> 
> const sizeRecord: Record<ButtonSizes, React.CSSProperties> ={
>     big:{
>         padding: `1rem 2rem`,
>     }
>     small:{
>         padding: `.5rem 1rem`,
>     }
> }
> 
> function App(){
>     return(
>         <div>
>             <Button>Hello</Button>
>             <Button size="big">Hello</Button>
>         </div>
>     );
> }
> ```
> 
> ## Pick

> ```typescript
> interface Starship{
>     name: string;
>     enableHyperJump:boolean;
> }
> 
> type NameOnly = Pick<Starship, 'name'>;
> ```
> 
> ## Omit

> ```typescript
> interface Starship{
>     name: string;
>     enableHyperJump:boolean;
> }
> 
> type NameOnly = Omit<Starship, 'enableHyperJump'>;
> ```
> 
> ## Exclude
> **Like omit but you use it with type aliases**

> ```typescript
>  type thing = string|string[]|number;
> 
>  let otherOhing: Exclude<thing, number> ="Cannot make this a number because it will not work";
>  ```
> 
> ## Extract

> ```typescript
>  type thing = string|string[]|number;
> 
> type other = string|string[]|boolean;
> 
> let otherOhing: Extract<thing, other> ="This will only extract the things that the thing has that matches with other";
>  ```

> ## NonNullable
> **Makes sure that the property that gets passed in cannot be null or undefined _if we have strict null check on this will only be possible with optional types_**
>
> ## ReturnType
> **Gets you the return value of a function**

> ```typescript
> 
>     interface StarshipProperties{
>         color?: 'blue' | 'red' | 'green';
>     }
> 
>   function paintTheStarship(id: number, color: NonNullable<StarshipProperties['color']>){
>       return{
>           id,
>           color
>       };
>   }
> 
>   type PaintStarshipReturn = ReturnType<typeof paintTheStarship>
> //   This will equal {id: number, color: blue | red | green}
>   ```
> 
> ## InstanceType
> **Allows you to get the types of a variable ie const**

> ```typescript
> const DeleteableUser = Deletable(User);
> 
> type deletableUserInstance = InstanceType<typeof DeleteableUser>;
> ```

> ## ThisType
> **Allows you to describe the this keyword in a function** *Must turn no implicit this on for this to work*

> ```typescript
> type ObjectDescriptor<D, M> = {
>     data?:D;
>     methods?: M & ThisType<D & M>;
> }
> ```


# Mapping Through types
> **Honestly don't get this very well at all**

> ```typescript
> type Properties = 'propA' | 'propB';
> 
> type MyMappedType<T> = {
>     [P in keyof T]: T[P];
> };
> 
> type MyNewType = MyMappedType< {a: 'a', b: 'b'}>;
> ```



# Conditional Type

> ```typescript
> 
> type Astring = string;
> 
> type myConditionalType = Astring extends string ? string : null;
> 
> function someFunction<T>(value: T){
>     const someOtherFunction = (
>         someArg: T extends boolean ? 'TYPE A' : 'TYPE B'
>     ) =>{};
>     return someOtherFunction();
 }
> 
> const result = someFunction(true);
> ```

# Infer type
> **Used to infer the type of something**

> ```typescript
> type inferSomething<T> = T extends U ? U : any;
> 
> type inferred = inferSomething<"I am a string">;
> 
> type inferSomething2<T> = T extends {a: infer A, b: infer B} ?  A & B : any;
> 
> type inferred2 = inferSomething2<{a: {someAProp: 1}, b: {someBProp: 'B'}}>
> ```


# Events
> ## Finding what kind of event it is
> **Hover over the input in the function**

> ```typescript
> onChange={(e) => {const input = e.currentTarget}}
> // or try hovering in the onClick
> ```

> ## Specifying what the click is on
> **e.target can be any HTML element that gets clicked on thus we have to specify, if we expect it to know what it is clicking on**

> ```typescript
> handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
>         console.log(e.target);
>         if ((e.target as HTMLElement).nodeName === 'SPAN') {
>             (e.target as HTMLSpanElement)
>         }
>         this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
>     }
> ```
>
> ## React Events
> 2. **When you have a click event you can use if statements with e.target to determine and set what nodeName it should be**
> 
> ```typescript
>     handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
>         console.log(e.target);
>         if ((e.target as HTMLElement).nodeName === 'SPAN') {
>             (e.target as HTMLSpanElement)
>         }
>         this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
>     }
> ```

> ### Other DOM events
> 
> ```typescript
> const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {...}
>  
> const Button = () => <button onClick={clickHandler}>I am a button</button>
>  
> const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {...}
>  
> const Form = () => <form onSubmit={submitHandler}>...</form>
> ```
> 
> *If React doesn't have an event type for some event at the moment (e.g. the event is still in experimental mode), we can use the React.SyntheticEvent type to describe it like this:*
> 
> ```typescript
> const inputHandler = (e: React.SyntheticEvent) => {
>   e.target...
> }
>  
> const Form = () => (
>   <form onSubmit={inputHandler}>
>     <input type="text" onInput={inputHandler} />
>   </form>
> )
> ```
> 
> **Other common event interfaces:**
> -------------
> - ChangeEvent
> - FocusEvent
> - FormEvent
> - FocusEvent
> - KeyboardEvent
> - MouseEvent
> - TouchEvent
> - DragEvent
> - PointerEvent
> - AnimationEvent
> - TransitionEvent
> - ClipboardEvent
> - SyntheticEvent


# useState
> ### How to type state

> ```typescript
> interface AppStateValue {
>   cart: {
>     items: { id: number; name: string; price: number; quantity: number }[];
>   };
> }
> 
> const defaultStateValue: AppStateValue = {
>   cart: {
>     items: [],
>   },
> };
> 
> export const AppStateContext = createContext(defaultStateValue);
> ```

> ### Use this trick to get the type of the setState

> ```typescript
> export const AppSetStateContext = createContext<>(undefined);
> 
> const [state, setState] = useState(defaultStateValue);
> // hover over the setState function and you will get the type to put in the carrots of the set state context
> ```


# useContext
> **Make sure you always use two separate contexts for the state and the state setter**

> ```typescript
> import React, { createContext, useState, useContext } from 'react';
> 
> interface AppStateValue {
>   cart: {
>     items: { id: number; name: string; price: number; quantity: number }[];
>   };
> }
> 
> const defaultStateValue: AppStateValue = {
>   cart: {
>     items: [],
>   },
> };
> 
> export const AppStateContext = createContext(defaultStateValue);
> 
> export const AppSetStateContext = createContext<
>   React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
> >(undefined);
> 
> export const useSetState = () => {
>   const setState = useContext(AppSetStateContext);
>   if (!setState) {
>     throw new Error(
>       'useSetState was called outside of the AppSetStateContext provider'
>     );
>   }
>   return setState;
> };
> 
> const AppStateProvider: React.FC = ({ children }) => {
>   const [state, setState] = useState(defaultStateValue);
>   return (
>     <AppStateContext.Provider value={state}>
>       <AppSetStateContext.Provider value={setState}>
>         {children}
>       </AppSetStateContext.Provider>
>     </AppStateContext.Provider>
>   );
> };
> 
> export default AppStateProvider;
> ```

# useReducer


# High Order Components

> ```typescript
> /* 1. Defining the HOC */
>  
> interface CurrentUserHOCProps {
>   currentUser: {
>     name: string;
>   };
> }
>  
> const withCurrentUser = <ChildCompProps extends CurrentUserHOCProps>(
>   ChildComp: React.ComponentType<ChildCompProps>
> ) => {
>   const CurrentUserHOC = (
>     props: Omit<ChildCompProps, keyof CurrentUserHOCProps>
>   ) => {
>     // Get the current user somewhere.
>     const currentUser = { name: 'John' };
>  
>     return (
>       <ChildComp {...(props as ChildCompProps)} currentUser={currentUser} />
>     );
>   };
>  
>   return CurrentUserHOC;
> };
>  
> /* 2. Defining the child component which uses the props from the HOC */
>  
> interface GreetingProps extends CurrentUserHOCProps {
>   color: 'yellow' | 'green';
> }
>  
> const Greeting: React.FC<GreetingProps> = ({ color, currentUser }) => {
>   return <div style={‌{ color }}>{`Hello, ${currentUser.name}`}</div>;
> };
>  
> const GreetingWithCurrentUser = withCurrentUser(Greeting);
>  
> /* 3. Rendering the wrapped child component */
>  
> const Header = () => {
>   return (
>     <header>
>       SomeLogo
>       <GreetingWithCurrentUser color="green" />
>     </header>
>   );
> };
> ```
>
> ### Another Example
> --------------

> ```typescript
> // HOC
> export interface AddToCartProps {
>     addToCart: (item: Omit<CartItem, 'quantity'>) => void
> }
> 
> // this is the HOC
> export function withAddToCart<OriginalProps extends AddToCartProps>(
>     ChildComponent: React.ComponentType<OriginalProps>) {
>     const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
>         const dispatch = useStateDispatch()
>         const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
>             dispatch({
>                 type: 'ADD_TO_CART',
>                 payload: {
>                     item,
>                 }
>             }
>             )
>         }
>         return <ChildComponent {...props as OriginalProps} addToCart={handleAddToCartClick} />
>     }
>     return AddToCartHOC;
> }
> 
> // Component getting passed into the HOC
> import { AddToCartProps, withAddToCart } from './HOC';
> 
> interface Props extends AddToCartProps {
>     pizza: Pizza;
> }
> 
> 
> const PizzaItem: React.FC<Props> = ({ pizza, addToCart }) => {
>     const handleAddToCartClick = () => {
>         addToCart({ id: pizza.id, name: pizza.name, price: pizza.price })
>     }
>     return (
>         <div>
>             <li>
>                 <h2>{pizza.name}</h2>
>                 <p>{pizza.description}</p>
>                 <p>{pizza.price}</p>
>                 <button onClick={handleAddToCartClick}>Add to Cart</button>
>             </li>
>         </div>
>     )
> 
> }
> 
> export default withAddToCart(PizzaItem);
> ```
> 
> > - **The way this works is we create our HOC(WithAddToCart). Then we use a generic prop type OriginalProps to hold values of the incoming props.**
> > - *We then have it extend AddToCartProps because this is what we know we will be taking in*
> > - **We then omit AddToCartProps from AddToCartHOC because this type is what the component being passed in already has and we return AddToCartHOC**
> > - *props is passed through all functions through scope*
> > - **addToCart in our child component passes the object into the handleAddToCartClick function which is then represented by item** 


