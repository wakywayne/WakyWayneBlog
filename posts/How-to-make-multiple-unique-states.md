---
title: 'How to make multiple unique states'
date: 'August 7, 2022'
excerpt: 'This is a must know trick for every react developer'
cover_image: ''
category: 'ClientSide'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# How to make multiple unique states that are created vis a map in react

```javascript
    const [arrayOfStuff, setArrayOfStuff] = React.useState([1, 2, 3]);
    const [theText, setTheText] = useState({});

    let onChangeTextForThisDiv = (e) => {
        setTheText((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            {arrayOfStuff.map((thing) => {
                return (
                    <>
                        <div>This is thing {thing.text}</div>
                        <input
                            type="text"
                            onChange={onChangeTextForThisDiv}
                            name={String(thing.name)}
                        />
                        <h1>You Just Typed </h1>
                    </>
                );
            })} 
            ;
        </div>
    );
```

1. ArrayOfStuff represents a list of thing you would typically map through
2. TheText represents an object that will contain all the mapped items states in which the key will be the *name* and the value will be it's own unique state 
3. onChange runs the function onChangeTextForThisDiv
    - This function first destructors the state because state is **immutable** so you must reset it every time you want to change it. Then we set the state based on the target.name *we can only do this because we destructured the state first* 
4. Now each collection of elements we make in the map is unique and will update uniquely.