---
title: Promises
description: Handle promises to control your asynchronous code so you don't have to deal with lots of callbacks
sidebarDepth: 2
---

# Promises

Because of the asyncrhonous nature of JavaScript, you can't expect a structured flow of your app business logic like in a structured programing language where the code logic flows from the top to the bottom. In JavaScript, code will be executed asyncrhonously, meaning that, a function that you define bellow other function, could return its value before the first one. But, how do you control this asynchronous flow? You make use of the `callbacks`. What is a `callback`? You might be asking yourself. Well, a `callback` it's a functional parameter of a function. What I mean with a functional parameter of a function is simply a function that takes a function as an argument.

## Using callbacks

Let's take a look at an example.

```js
function doSomething(callback) {
  console.log(`I'm doing something`);
  // Calling the callback function :)
  callback();
}

doSomething(function() {
  /**
   * This won't get executed untill the callback
   * function of the doSomething function gets called
   */
  console.log(`I'm a callback`);
});
```

Quite easy, right? Well, let's thing about it for a while. Seems nice but... you know... you won't have only one single callback and you could end up with something like this:

```js
function doSomething(callback) {
  // Async code here ...
  fetch(`/api/stuff/demo`, (error, result) => {
    if (error) return callback(false);
    return callback(result);
  });
}

function doMore(callback) {
  // Async code here ...
  fetch(`/api/stuff/demo`, (error, result) => {
    if (error) return callback(false);
    return callback(result);
  });
}

function doEvenMore(callback) {
  // Async code here ...
  fetch(`/api/stuff/demo`, (error, result) => {
    if (error) return callback(false);
    return callback(result);
  });
}

// Here's were you should pay attention!
function executeStuff() {
  doSomething(function(done) {
    if (done) {
      doMore(function(moreDone) {
        if (moreDone) {
          doEvenMore(function(evenMoreDone) {
            if (evenMoreDone) {
              return `I'm finished`;
            } else {
              throw new Error('Failed at doing even more');
            }
          });
        } else {
          throw new Error('Failed at doing more');
        }
      });
    } else {
      throw new Error('Failed at doing something');
    }
  });
}

const result = executeStuff();
```

## Using promises

So... do you see what I'm trying to tell you? That's slightly hard to read, don't you think? So... how we could improve this and make code even more readable and avoid all those callbacks? `Promise` to the rescue! Let's refactor the code above to a promise-based function.

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    fetch(`/api/stuff/demo`, (error, result) => {
      if (error) return resolve(false);
      return reject(result);
    });
  });
}

function doMore(payload) {
  return new Promise(async (resolve, reject) => {
    fetch(`/api/stuff/demo`, (error, result) => {
      if (error) return resolve(false);
      return reject(result);
    });
  });
}

function doEvenMore(payload) {
  return new Promise((resolve, reject) => {
    fetch(`/api/stuff/demo`, (error, result) => {
      if (error) return resolve(false);
      return reject(result);
    });
  });
}

// This function will be in charge of throwing the error
// that comes from the promise :)
function rejectedPromise(error) {
  throw error;
}

// Here's were you should pay attention!
function executeStuff() {
  doSomething()
    .then(data => doMore(data), rejectedPromise)
    .then(data => doEvenMore(data), rejectedPromise);
}

const result = executeStuff();
```

As you can see, the `executeStuff` function reduced it's lines of code in a huge amount and also increased it's readability a lot.

Let's explaing what's going on there. First of all we did a small refactor on the asynchrounous functions wrapping the content within a `promise`. Let's take a look at the promise structure right now!

```js
new Promise(function(resolve, reject) {});
```

This `promise` object represents the eventual resolution or failure of an asynchronous code and its resulting value.

When instantiating a `new promise`, it takes a function that will be on charge of resolving (success) or rejecting (failure) the asynchronous code within it. That function have two parameters and those two are functions. The first one is in charge of _resolving_ the `promise` and the second one is in charge of _rejecting_ the `promise`.

Let's take a look at a little more extended example:

```js
function promisedOperation() {
  return new Promise(function(resolve, reject) {
    asyncOperation(callbackResult => {
      if (callbackResult) return resolve(true);
      return reject(false);
    });
  });
}
```

We're doing an asynchronous operation (callback based) inside the `promise` callback function. If that `asyncOperation` function results in a successful operation, we're calling the `resolve` callback of the `promise` and if it fails, we're calling the `reject` callback of the promise. If you pay attention, we're returing that `promise` at the `promisedOperation` function, if you return a `promise` you will have access to the `then` and `catch` methods. That way, you will be able to structure you code in a more readable way.

## Then

Let's explain the `then` method now.

```js
then(success, error) {}
```

That would be the description of the `then` method. It takes two parameters, the first one is the one that's going to get called by the `resolve` function of the executed `promise`, and the second one is the one that's going to be executed if the `reject` function of the `promise` get's called. The `then` function is always going to return a `promise` so you would be able to chain one `promise` after another.

## Catch

Let's explain the `catch` method.

```js
catch(error) {}
```

You could say that `catch` is just syntactic sugar to make code even more readable because it behaves just like calling `then` with a second argument that will handle the error. In fact, it will call internally to `then(undefined, rejectedResult)`.

So basically, this two examples will be the same:

```js
function promisedOperation() {
  return new Promise(function(resolve, reject) {
    asyncOperation(callbackResult => {
      if (callbackResult) return resolve(true);
      return reject(new Error('Something went wront'));
    });
  });
}

function logResult(result) {
  console.log('Result: ', result);
}

function rejectedPromise(error) {
  throw error;
}

// Using `then` second paramater
promisedOperation().then(result => logResult, rejectedPromise);

// Using the `catch` function
promisedOperation()
  .then(result => logResult)
  .catch(error => rejectedPromise(error));
```

As you can see, it basically does the same so you can choose how to handle your `promise` errors, even if it's with a second parameter at the `then` function or if it's using the `catch` function. Just use whatever you feel more comfortable with. It wont impact on performance or any other stuff like that.

## Promise States

We're going to extend some more information about promises and that's going to be it's state. A `promise` is going to be in one of these states:

* pending: initial state, neither fulfilled nor rejected.
* fulfilled: the operation has been completed successfuly.
* rejected: the operation has failed.

A pending promise could be resolved with a value or rejected with a reason (typically an error). When any of these happens, the associated handler (resolve or reject functions) will be called, if the promise is fulfilled it will call the `resolve` handler and if the promise gets rejected it will call the `reject` handler.
