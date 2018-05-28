---
title: Javascript
description: Lessons I've learned though developing real world applications and personal learning projects that helped become a better developer
sidebarDepth: 2
---

# Array

Lately I've been doing some intense operations with arrays and ended using a lot of the best functions the array object have: `map`, `filter` and `reduce`. So I'm gonna tell you about this three in this article with the purpose of helping you to undestand this awesome functions that will save you time and pain.

## Map

With map you can iterate trough all of the elements of an array in a functional way. This method doesn't mutate the array but returns a new copy of the array. Lets se an example.

```js
const numbers = [1, 2, 3, 4, 5, 6];
numbers.map(number => {
  console.log('Current Number: ', number);
});
// Output:
// Current Number: 1
// Current Number: 2
// Current Number: 3
// Current Number: 4
// Current Number: 5
// Current Number: 6
```

Ok, with the fact that map returns a new copy of the array, the example above is not the best example but. Let's imagine we would like to double the values of a numeric array without mutating the original array. Then we would do something like the following:

```js
const numbers = [1, 2, 3, 4, 5, 6];
const doubles = numbers.map(number => number * 2);
console.log('Numbers: ', numbers);
console.log('Doubles: ', doubles);
// Output:
// Numbers: [1, 2, 3, 4, 5, 6]
// Doubles: [2, 4, 6, 8, 10, 12]
```

As you can see, we're using the implicit return of the `arrow function` to return the current number doubled and it's going to put it into the `doubles` array as it's returned but won't mutate the `numbers` array. This is perfect when you want to achieve immutability (that should be very often).
