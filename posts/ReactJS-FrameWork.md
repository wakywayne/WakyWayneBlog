---
title: 'React'
date: 'September 22, 2022'
excerpt: 'Here are my ReactJS Notes'
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Html/CSS in React
**Cannot have sibling elements in a react component**
*Instead use shadow tags <> </>* (These tags are technically 
React.Fragment tags)
- class = className
- style = style={{color: 'red', backgroundColor: 'black'}}

# es7 Snippets extension
### *This is a vscode extension that allows you to do shortcuts a must have for react developers*
> - imr
>     - import React from 'react'
> - imrse 
>     - **Import react, useState, and useEffect**
> - rfc 
>     - **react functional component**
> - nfn
>     - **Named function**
> - anfn **Arrow function**
> - imp *Import*
>     - import something from 'something'
> - imd *import and destructor*
>     - import {your thing} from './your other thing'
> - clg
>     - console.log(!!!);
> - prom
>     - new promise

# Short hand Javascript
> **Values that are false**
> - ''
> - Undefined
> - Null
> - 0
> - Nan
> - False
> - Variable with no value
>
> **Values that are true**
> - Everything not false
> - Empty Objects (if you use ===)
> - Empty Arrays (if you use ===)
>
> ## Conditional Short Hands
> ### Truthy Falsy
> ```javascript
>  let bool = "text"; 
>   if(bool){
>      consol.log('This will log');
>  }
>  ```
> ### Logical and operator
> 
>  ```javascript
>  let responseText = '';
>  console.log(responseText && `This is the response that won't be shown ${responseText}`);
>  ```
> ### Turnarary Opertor
>  ```javascript
>  let score = 0;
>  let finalMessage = (score > 60) ? 'Congratulations u passed` : 'You did not pass';
>  console.log(finalMessage);
> ```


## Controlled React Input *React.useState*
> **It's an input who's value is tied to a piece of react state and it has an onChange that updates that state**
> ```javascript
> import React from 'react';
> 
> const Practice = () => {
>     const [email, setEmail] = React.useState();
>     const [password, setPassword] = React.useState('');
> 
> const handlePasswordChange = (e) => {
>         setPassword(e.target.value);
>     }
> 
>     const handleClick = () => {
>         setEmail('vye');
>     }
>     return (
>         <>
>             <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
>             <input value={password} onChange={handlePasswordChange} />
>             <button onClick={handleClick}>Hello</button>
>         </>
>     )
> }
> export default Practice;
> ```
# Hooks
> **Used above return statement and can't be used  in another function (Only in our main component function)**
> ## Use State
> ```javascript
> const App = () => {
> 
> //const [] = useState(0); [state, setState] Is what this returns so we can use array destructering
> 
> const [counter, setCounter] = useState(0);
> // This makes counter have value of zero to start
> 
> const handleButtonClick =() => {
>     setCounter(counter + 1);
> }
> 
> return(
>         <div>
>             <h1>Hello<h1>
>             <button onClick={handleButtonClick}> Click me to increment!<button>
>         <div>
>     )
> }
> ```
> 
> ## Use Effect *React.useEffect*
> **Code you want to run as a side effect of a re-render**
> ```javascript 
> const App =() => {
>     const [count, setCount] = useState(0);
>     const [email, setEmail] = useState('');
> 
>     useEffect(()=>{
>         consol.log('effect running!');
>         document.title = `You have clicked ${count} times`;
>     }, [count])/*This makes it so that the effect only activates when the element is re-renders from count changing. Otherwise it activates on all re-renders and if left >     empty it will run only once after page loads*/
>         
> 
> return(
>         <div>
>             <p>You have clicked {count} times.<p>
>             <button onClick={()=>setCount(count + 1))}> Click me to increment!<button>
>             <input value={email} onChange={e => setEmail(e.target.value)}/> 
>         <div>
>     );
> }
> ```
>
> ## useLayoutEffect
> *Note it runs before react paints changes to the DOM it is synchronous* 
> You should use this if you have something flickering in your UI 
>
> ## useRef
> *Mainly used to access a particular element in the DOM*
> **You can override refs by using useImperativeHandle()**
> ```javascript
> import { useState, useEffect, useRef } from "react";
> import CustomInput from "./CustomInput";
> function App() {
>   const [input, setInput] = useState("");
>   const count = useRef(1);
>   const inputRef = useRef();
>   useEffect(() => {
>     //setCount((prevState) => prevState + 1);
>     count.current += 1;
>   });
> 
>   const clickHandler = () => {
>     console.log(inputRef.current);
>     const value = inputRef.current.value;
>     if (!value) inputRef.current.focus();
>     else alert(value);
>   };
>   return (
>     <div>
>       <CustomInput
>         ref={inputRef}
>         type="text"
>         value={input}
>         onChange={(e) => setInput(e.target.value)}
>       />
>       <button onClick={clickHandler}>Submit </button>
> 
>       <hr />
>       <div>You have entered "{input}"</div>
>       <div>Rerendered {count.current}</div>
>     </div>
>   );
> }
> 
> export default App; 
> ```
>
> ## Context
> **Components that you wrap in the AppStateProvider will all have access to state**
> 
> ```javascript
> const defaultStateValue = {
>     cart:{
>         items: [],
>     },
> }
> export const AppStateContext = createContext(defaultStateValue)
> export const AppSetStateContext = createContext(undefined)
> 
> const AppStateProvider: React.FC = ({children})=>{
>     const [state, setState] = useState(defaultStateValue);
>     return(
>         <AppStateContext.Provider value={state}>
>             <AppSetStateContext.Provider value={setState}>
>                 {children}
>             </AppSetStateContext.Provider>
>         </AppStateContext.Provider>
>     );
> }
> 
> export default AppStateProvider;
> ```
> *This is how you import the context from one of your wrapped components*
>
> ```javascript
> import {AppSetStateContext} from './fileName';
> const setState = useContext(AppSetStateContext);
> setState("this is the new state");
> ```
>
> ## useReduce
> Need to learn better
>
> ## useCallback()
> ```javascript
> const handleButtonClick = () =>{
>     console.log(counter) // this will always be one
>     setCounter(counter + 1)
> }
> 
> const memoizedFunction = useCallback(handleButtonClick, [])
> ```
> 
> ## memo 
> *this makes it so that a component only rerenders if props change*
> **DOES NOT work for arrays and object because it does a shallow check**
> 
> ## useMemo
> *const params = useMemo(()=>({color}), [color])*
> **Now it will only change if the dependency is different**
>
> ## Custom Hook
> Working on it 

# Events
**With React if you are submitting a form you have to use e.preventDefault(); in the onClick function so you don't lose any saved states you might need**

# Lists
> **When dealing with arrays and lists you must give each a unique key prop so it knows how to re-render if state changes**
> ```javascript
> const App = () =>{
>     const myList= ['one','two','three'];
>     const myFancyList = myList.map((val) => {
>         return <li key={`my-list-thing-(some kind of incrementer or id)`}> {val}</li>;
>         // keys must be unique and non-changing
>     });
> 
>     return(
>         <>
>             <ul>
>                 {myFancyList}
>             </ul>
>         </>
>     );
> };
> ```
> *Cool way to useReducer*
> ```javascript
> function  reducerFunc(state, dispatchAction){
>     switch(dispatchAction.type){
>         case "increment":
>         return {count: state.count+1}
>         case "decrement":
>         return {count: state.count-1}
>     }
> }
> 
> [state, dispatch]= useReducer(reducerFunc, {count: 0});
> 
> function incrementState(){
>     dispatchFunc({type: "increment"})
> }
> 
> function decrementState(){
>     dispatchFunc({type: "decrement"})
> }
> ```

 # React-router-dom
> **BrowserRouter Routes Route Navigate**
> ## When making more than one route navigate to a page
> ```javascript
> <Route to="something" element={<The/>}/>
> <Route to="somethingElse" element={<Navigate replace to="<The/>"/>}/>
> ```
> ## Outlets
> **Outlets allow nested routes an exit point on the parent routes page**
> ```javascript
> Function Component(){
>     return(<h1>Component</h1> <Outlet/>)
>     // Children routes will be displayed after the h1
> }
> ```
> ## useParams
> **Must be nested in parent route**
> ```javascript
> {
> <Route to="/some" element={<Element/>}>
>     <Route to=":nameOfParam" element={<OtherElement/>}>
> </Route>
> 
> Function OtherElement(){
>     const {nameOfParam} = useParams();
>     return(
>         <h1>The param is {nameOfParam}</h1>
>     )
> }
> }
> ```
> ## NavLink is active
> ```javascript
> <NavLink to="whatever/path" style={{({isActive})=>{
>     return(
>         backgroundColor: isActive ? "pink" : "yellow"; 
>     )
> }}/>
> ```
> 
> ### useNavigate & useLocation
> ```javascript
> Function Element(){
>     const {nameOfParam} = useParams();
>     const navigate = useNavigate();
>     return(
>         <h1>The param is {nameOfParam}</h1>
>         <button onClick={()=> navigate("/OtherElement", {pieceOfInfo: "Hello"})}>Click Me</button>
>         // Information pased is serialized meaning it is always turned into a string I am pretty sure
>     )
> }
> 
> Function OtherElement(){
>     const location = useLocation();
>     return(
>         <h1>The info is {location.pieceOfInfo}</h1>
>     )
> }
> 
> ```
> *Links also can pass information*
> ```javascript
> <Link to="/theroute" state={variableThatIsPassed}/>
> ```

# Catching errors to stop your app from crashing
**You must use a class based component**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

// This changes the state of has error to true
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('something went horribly wrong', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Fallback UI</h1>;
    }

    return this.props.children;
  }
}

// Example Usage

function Main() {
  return (
    <Dashboard>
      <ErrorBoundary>
        <Orders />
      </ErrorBoundary>
    </Dashboard>
  );
}
```
