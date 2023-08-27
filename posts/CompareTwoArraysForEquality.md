---
title: "Compare two arrays for equality"
date: "July 21, 2023"
excerpt: "Arrays are refernce type objects so testing equality can be difficult"
cover_image: "/images/posts/img8.jpg"
category: "Utilities"
author: "WayneCarl"
author_image: ""
---

# Here is a useful piece of code that can be used to compare if two arrays are exactly equal

We cannot just use a simple equals operator because in javascript objects and arrays are reference types. This means that if we set an array equal to a new variable it actually will still be refering to the same array _unless we do something special that we will talk about later_. In addition if we separately make two arrays that are made of the same items when we test them for equality it will come back false.

## Example of how arrays are reference type:

```typescript
// Create an array
const originalArray = [1, 2, 3];

// Assign it to a new variable
const newArray = originalArray;

// Modify the new array
newArray.push(4);

// Check the original array
console.log(originalArray); // Output: [1, 2, 3, 4]
```

> In this example, newArray is assigned the reference to the same array as originalArray. When we modify newArray, it also affects originalArray because both variables point to the same array in memory.

## Comparing Arrays for Equality:

```typescript
const array1 = [1, 2, 3];
const array2 = [1, 2, 3];

// Using strict equality (===)
console.log(array1 === array2); // Output: false

// Using deep equality comparison
const isEqual = JSON.stringify(array1) === JSON.stringify(array2);
console.log(isEqual); // Output: true
```

> In this case, newArray is a new array that contains the same elements as originalArray, but they are two separate arrays in memory.

## How I like to test arrays for equality

```javascript
export default function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
```

> I like this method because it adds some efficiency in edge cases where the arrays are different lengths and we don't need to waste time checking them. It also allows you to add more granular control, for example what if we needed to test an array of objects? _Solution below_

## Add function to use in case the array item is an object

```typescript
export default function arraysEqual(a: Array<any>, b: Array<any>): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    const item1 = a[i];
    const item2 = b[i];

    // Check if both items are objects
    if (typeof item1 === "object" && typeof item2 === "object") {
      // Use a custom function to compare objects
      if (!isObjectEqual(item1, item2)) {
        return false;
      }
    } else if (item1 !== item2) {
      return false;
    }
  }

  return true;
}

// Custom function to compare objects for equality
function isObjectEqual(obj1: object, obj2: object): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false; // Objects with different numbers of keys are not equal
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false; // Values for the same key are not equal
    }
  }

  return true; // Objects are equal
}
```

## How to make a copy of an array that isn't a reference

```typescript
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

// Modify the copied array
copiedArray.push(4);

console.log(originalArray); // Output: [1, 2, 3]
console.log(copiedArray); // Output: [1, 2, 3, 4]
```

> If you remember from earlier when we didn't use the spread operator, modifying copied array also modified the originalArray. Thanks to the spread operator we have actually made a new array that is not a reference to originalArray.
