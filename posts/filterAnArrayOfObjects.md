---
title: "Filter an array of object"
date: "March 24, 2023"
excerpt: "The best way to filter an array of objects based on there keys"
cover_image: ""
category: "Utilities"
author: "jherax"
author_image: "https://avatars.githubusercontent.com/u/5439457?s=64&v=4"
---

## Function

```typescript
// This function takes an object that matches the shape of the objects in the array
// that are passed into it and applies the filter on each cooresponding key value
function filterArray(array: wrestlersInterface[], filters: any) {
  const filterKeys = Object.keys(filters);
  return array.filter((item: any) => {
    // validates all filter criteria
    return filterKeys.every((key: string) => {
      // ignores non-function predicates
      if (typeof filters[key] !== "function") return true;
      return filters[key](item[key]);
    });
  });
}
```

## Example implementation

```typescript
function onRangeFormSubmit(formData: unknown) {
  const isValid = rangeFormSchema.parse(formData);

  const filters = {
    age: (age: number) => age >= isValid.ageRange && age <= isValid.ageRange2,

    weight: (weight: number) =>
      weight >= isValid.weightRange && weight <= isValid.weightRange2,

    WAR: (WAR: number) => WAR >= isValid.WARrange && WAR <= isValid.WARrange2,
  };

  let newArray = filterArray(placeHolderWrestlers, filters);

  setWrestlers(newArray);
}
```

# Full credit and simaler genius functions here [gitHub](https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72)
