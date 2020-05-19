---
title: Understanding reference types in JavaScript
description: >-
  Discover the difference between value and reference types in JavaScript, and how to use them to your advantage.
image: 'article-icons/js.svg'
tags:
  - javascript
---

One of the most pivotal moments in my career as a software developer was when it finally clicked for me what the difference was between value types and reference types. It is definitely a huge hurdle to get over, but once you feel comfortable with it, you'll find the confidence you have in your code skyrocket, and you'll be able to use the different types to your advantage.

So, what do we mean by all this? Let's first discuss value types.

## Value types

In JavaScript, there are 6 primitive types:

- Boolean
- Null
- Undefined
- Number
- String
- Symbol

When a variable is declared and initialised with one of these types, it holds the _absolute_ value. This means that if we do something like this:

```js
let a = 'hello!';
let b = 'hello!';

console.log(a === b);
```

We would get `true` logged in the console, because the two strings are identical.

If we introduced a new variable, `c`, assigned the value of `a` to `c`, and then we modified `a`, `c` would maintain the value that it was given when it was initialised.

```js
const c = a;
a = 'goodbye!';

console.log(c); // 'hello!'
```

## Reference types

For other types, most commonly arrays and objects, they do not hold an absolute value. Instead, they hold an address, or a _pointer_.

### Comparing two different arrays

Let's create two arrays that hold the same sequence of numbers.

```js
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

console.log(arr1 === arr2); // false
```

In our console we will see `false`. But they both have the same values, so why is that?

Well, when we initialise our arrays, we actually allocate a slot in the memory for them, and our variable holds the information to be able to access that address. Even though they both hold the same data, they are stored in _different locations_.

#### A real world example

Imagine that there are two people that want to use lockers at an airport. Let's give them names - how about John and Jade?

John goes to the locker attendant, and asks for a key. The locker attendant gives him a key to locker `50`. He puts a camera, phone, and watch in the locker.

```js
const locker50 = [];
const johnsLocker = locker50;
johnsLocker.push('camera', 'phone', 'watch');
```

Jade also goes to the locker attendant, and the locker attendant gives her a key to locker `60`. She _also_ puts a camera, phone and watch in the locker.

```js
const locker60 = [];
const jadesLocker = locker60;
jadesLocker.push('camera', 'phone', 'watch');
```

It is _not_ the same locker, and the only way to compare the two lockers is to open them up and compare each item one by one.

When comparing arrays in javascript, the array is the locker. Our array variables are storing the `locker number`, a.k.a the address in memory that the contents of the locker are held.

### Duplicating an array

On the flipside, what if we want to duplicate an array?

```js
const arr1 = [1, 2, 3];
const arr2 = arr1;

// arr2 now points to the same memory location as arr1

arr2[0] = 1000;

console.log(arr1);
console.log(arr2);
```

What do you think will be the output when we log both of these arrays?

```console
[1000, 2, 3];
[1000, 2, 3];
```

They will both log the same. When we changed the value of the first element in `arr2`, we didn't change anything about the address of the variables - the two variables are still pointing to the exact same position in memory. However, the data inside that memory location _has_ changed.

Similarly, if we compare the two arrays:

```js
console.log(arr1 === arr2);
```

The output will be `true`, because they are still both pointing to the same location in memory.

#### A real world example (again)

Let's revisit our airport example. This time, our two people requiring lockers are from the same family.

John asks for a locker, and the locker attendant gives him a key to locker `10`.

```js
const locker10 = [];
const johnsLocker = locker10;
```

He puts his camera, phone and watch in there.

```js
johnsLocker.push('camera', 'phone', 'watch');
```

His sister, Jade, sees him doing this and asks if they can share. The generous locker attendant fetches another key from the back that is also for locker `10`.

```js
const jadesLocker = locker10; // jadesLocker & johnsLocker now point to the same address in memory
```

Jade then puts her headphones in the locker and closes it.

```js
jadesLocker.push('headphones');
```

This time, it _is_ the same locker. The locker number is the same, and when either of them adds something or takes it out, it changes what is in the locker for the other person.

```js
console.log(locker10); // ['camera', 'phone', 'watch', 'headphones'];
```

In our code, when we assign a variable holding an array to another variable, we are just making a copy of the _address_, which allows both variables to access the same array.

If Jade decided that she needed her own locker, we could simply do:

```js
jadesLocker = [];
```

The variable `jadesLocker` now points to a completely different address in memory, as we have re-assigned it. `johnsLocker` will still maintain the same data as before.

### 'Passing by reference'

In some programming languages, when you pass an argument in to a function by _reference_, it means that if you modify that value directly, it will effect the implementation of it outside the scope of that function. In JavaScript however, there is no notion of 'passing by reference'.

When passing any variable in to a function, effectively, a copy is made. When it is a value type, the actual value of the variable is duplicated. When it is a reference type, the `address` is duplicated.

What this means is if you re-assign an array inside a function, it **will not** modify the external implementation of that variable, as it is working with a copy.

```js
let initialArr = [1, 2, 3];

function modifyArrayThenLog(arrayArg) {
  arrayArg = [4, 5, 6];
  console.log(arrayArg); // [4, 5, 6]
  console.log(initialArr); // [1, 2, 3];
}

modifyArrayThenLog(initialArr);
```

However, because our argument is still holding the value of the address, if we change the internals of the array, we will be modifying the data held at the memory location, and not the variable holding the memory location itself. So, if we do:

```js
let firstArr = [1, 2, 3];

function modifyArrayThenLog(arrayArg) {
  arrayArg[0] = 1000;
  console.log(arrayArg); // [1000, 2, 3]
  console.log(firstArr); // [1000, 2, 3]
}

modifyArrayThenLog(firstArr);
```

They will both log the same, because they are both still pointing to the same location in memory. Knowing this, we can use this to our advantage and not worry about returning arrays that we modify inside our functions. Be wary of this however, as it may lead to unintended consequences and hard-to-find bugs if used too often.
