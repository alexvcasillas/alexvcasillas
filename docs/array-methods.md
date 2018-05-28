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

// Output

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

// Output

// Numbers: [1, 2, 3, 4, 5, 6]
// Doubles: [2, 4, 6, 8, 10, 12]
```

As you can see, we're using the implicit return of the `arrow function` to return the current number doubled and it's going to put it into the `doubles` array as it's returned but won't mutate the `numbers` array. This is perfect when you want to achieve immutability (that should be very often).

## Filter

With filter you can iterate through all of the elements of an array and return it whether it fulfills a condition or not. This method will also not mutate the original array but returns a new copy of it. Let's learn more by the example.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pairNumbers = numbers.filter(number => number % 2 === 0);
console.log('Pair Numbers: ', pairNumbers);

// Output

// Pair Numbers: [2, 4, 6, 8, 10];
```

Taking note that we're using the implicit return of the `arrow function` once again, we're going to deconstruct this example without using the implicit return for you to see it clearly.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pairNumbers = numbers.filter(number => {
  if (number % 2 === 0) return true;
  return false;
});
console.log('Pair Numbers: ', pairNumbers);

// Output

// Pair Numbers: [2, 4, 6, 8, 10];
```

So, now let's take a look at was the filter expects to recieve and what it expects to return.

The `filter` function expects a single parameter, that paremeter will be a function, that given function expects to return either `true` or `false`. If the returned value it's `true`, it will return the element, if it's `false` it will skip it.

With this in mind, you can already see what the filter function does and the power that it has. You're going to use this daily on your job, I promise. So, let's see an example of `map` and `filter` together, because you can call them one after another if you have noticed, they both return a new `array` so, that new returned `array` has also this methods, this way, we could chain this functions one after another to make awesome things. Let's see a simple example.

We're going to `filter` thought the `numbers array`, then take only the pair ones, then we're duplicating them. Complicated? Absolutely! Hold my beer and check this out :)

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doublePairs = numbers
  .filter(number => number % 2 === 0)
  .map(number => number * 2);

console.log('Double Pairs: ', doublePairs);

// Output

// Double Pairs: [4, 8, 12, 16, 20]
```

As you can see in the example above, we're `chaining` the return of the `filter` function with the `map` function, this way, with `filter` we're returning only the pair numbers, and then, with `map` we're doubling them.

## Reduce

With `reduce` you can apply a function against an accumulator to reduce the array to a single element. Seems tricky, let's see it with a simple example.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum = numbers.reduce((previous, current) => {
  return previous + current;
}, 0);
console.log('SUM: ', sum);

// Output

// SUM: 55
```

Let's go a little in depth of this `reduce` function.

It expects two parameters, the first one is a function that will iterate though the array with `previous` and `current` values, and a second parameter that will be the acumulator and where you would accumulate the value returned from the provided function (you should never forget about this last parameter or you'll get into trouble, been there, done that).

If you take a look at the first parameter, it's a function that takes also two parameters, the first value will be the previous value (or accumulated value) and the second will be the current value of the iterated array at some given point. By initializing the `reduce` function with `0` at the second parameter we make sure that we will have a previous value at the first iteration, if you don't, you'll have `undefined` and... `undefined` + 1 is... Yes! `NaN`! So you better make sure always pass the second parameter to the `reduce` function.

Let's take a look at a nice example using all of the three functions we've just learnt!

We have a list of prices, and we would like to take those prices and make some discounts. The client will have a discount in a price that's higher to 300€ so, we take only the ones that are higher to 300€, then apply a 20% off to each of them, then return the total price of the

```js
const prices = [100, 450, 320, 1200, 680, 1110, 80, 220];
const total = prices
  .filter(price => price >= 300)
  .map(price => price * 0.2)
  .reduce((previous, current) => previous + current, 0);

console.log('TOTAL: ', total);

// Output

// TOTAL: 752
```
