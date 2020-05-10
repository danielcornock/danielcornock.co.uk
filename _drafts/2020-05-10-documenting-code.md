---
title: Documenting your code without writing any actual documentation
description: >-
  One of the biggest issues with extending existing code is not understanding what it's trying to do. In this article we will discuss ways in how we can improve that.
image: 'article-icons/angular.png'
tags:
  - techniques
---

One of the biggest issues with extending existing code is not understanding what it's trying to do. Typically, one of the best ways to combat this is by writing clear, concise documentation. However, in a fast paced environment this is not always possible. Here I will go through a few different methods that you can document your code and thereby make yours or another developers job a lot easier when they revisit your code.

## Variable and method naming

One of the worst moments as a developer is to open up a file and see a bunch of vague, meaningless method names. Method names are your primary insight to what the code that your viewing is trying to accomplish.

With this comes proper sectioning of your code. When writing your code, you should always try to follow the single responsibility principle. Each function should do one thing and one thing only. By doing this, you can also name each smaller function to label what its doing. For example, instead of doing:

```ts
function  displayAll
```

## TypeScript

There, I said it. I am a TypeScript fanboy through and through. However, there are good reasons for that.

When used effectively, Typescript provides a form of documentation throughout your codebase through the use of types.

For example, when a function takes in a config object, without typescript the only way to know which options it takes is to look through the original source code and to scout out implementations of it. This is not only time-consuming, but doesn't always allow you to discover the full breadth of it. With a typescript interface, you can instantly see the available options and whether they're optional or not.

## Unit testing

Properly written unit tests allow future users to take an insight in to the flow of your code, as well as exposing the multiple branches that your code can take.
