---
title: Build your own dependency injection service with TypeScript decorators
description: >-
  In this article, we'll be creating a very small dependency injection service to dissect how they work behind the scenes.
image: article-icons/ts.svg
tags:
  - typescript
  - decorators
---

Dependency injection is a well known software development technique that is based off of one of the SOLID principles - inversion of control. It allows us to abstract the creation of classes to be separate from their implementation, which make it easier for us to make changes on classes that depend on those implementations in the future.

In this article, we will be building an extremely small and lightweight dependency injection service using the experimental decorators that TypeScript provides. You may have seen these about before, such as with Angular's `@Component`, `@Injectable` and `@Pipe` decorators. These decorators allow us to wrap existing implementations and alter their contents or provide extra functionality without having to change the code of the items itself.

> Please note, I wouldn't recommend rolling out your own dependency injection service for use within your applications. There are already existing services such as tsyringe and inversify which will have much better support for what you will need. This article is just a learning excercise.

Without further ado, let's get started.

## Getting set up

Firstly, we'll need to create a new NPM project and install TypeScript and lodash within that project. If you need a hand with that, feel free to check out my other article on [getting started with typescript](bootstrap-typescript-1-ts-initialisation).

Then, in your `tsconfig.json` file, make sure you uncomment and fill in the following lines - these are necessary in order to use the experimental decorators.

##### tsconfig.json

```json
{
  "lib": ["es2015", "dom"],
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

## How our DI service is going to work

With our dependency injection service, to make a class available for dependency injection we will add an `@Injectable` decorator that accepts a token to identify it. This will instantiate our class and add it in to a global container.

To inject other classes in to our class, we will use an `@Inject` decorator on a class property that takes the token of the desired class as an argument and fetches the respective class from the global container. Our dependency tree can go as deep as possible, with classes that are injected also being able to inject other classes.

Let's have a look at what our final product will be when we consume our service:

##### index.ts

```ts
import { Inject } from '../decorators/inject';
import { Injectable } from '../decorators/injectable';
import { container } from '../instances/container';

@Injectable('testService')
export class TestService {
  public log(msg: string): void {
    console.log(msg);
  }
}

@Injectable('consumer')
export class Consumer {
  @Inject('testService')
  private readonly _testService;

  constructor() {
    this._testService.log('Hey!');
  }
}

container.resolve('consumer');
```

In this code, you can see that you can inject services with dependencies of their own. By making our `Consumer` class an injectable, that also means that we can resolve that with the container instead of using `new`.

In our consumer class, we make a call to our `TestService` which will log to the console. The great thing is, they have no knowledge of the implementation of each other - this means that we can swap out our `TestService` for a different implementation as long as it matches the original interface.

Now, let's break it down and see how we can make this work.

## Building our container

For any dependency injection service, there is always some form of centralised container. This container will store all of the instances of the initialised classes in our application, while also providing methods for requesting them.

##### container.ts

```ts
import { find } from 'lodash';

export class Container {
  public providers: { [key: string]: any } = {};

  public resolve(token: string) {
    const matchedProvider = find(
      this.providers,
      (_provider, key) => key === token
    );

    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }
}

export const container = new Container();
```

Lets step through each bit of the code:

- First off, we initialise an empty object of `providers`. This is where we will store the instances of our injectable classes, indexed by the key that the consumer of the service uses to provide for that instance.
- Next, we have a `resolve` method. This method will take a string token that is provided by the consumer, and use lodash' `find` method (which can iterate through an object as well as an array) to iterate through the providers object in order to find the matching instance.
- If an instance is found, return it. If not, throw an error.

At the end of this file we also export an instance of the container. We want to export the instance and not the un-constructed class because we want this to be a single instance that is shared across our whole application. This is known as a `singleton`.

## Specifying our injectable classes

In order to register our classes to be able to inject them in to other classes, we need a way of adding them to our container. We can do this in a nice and clean way by using TypeScript decorators.

A typescript decorator is just a normal javascript function. When we use it on a class, the first argument is the constructor of that class.

##### injectable.ts

```ts
import { container } from '../instances/container';

export function Injectable(token: string): Function {
  return function(target: { new () }): void {
    container.providers[token] = new target();
  };
}
```

In the above snippet, our function actually _returns_ the function for our decorator to use. We've done this so that we are able to pass in our own parameter `token` to the decorator, and then still return the function that will use the arguments that the decorator provides.

We take the token as provided by the user (e.g. with `@Injectable('myService')`), and then initialise a new instance of the class as provided by the `target`. We then use the token to assign our instantiated class to the `providers` object in our global `container`.

Using this decorator looks like this:

```ts
@Injectable('myInjectable')
export class MyInjectable {}
```

## Injecting classes

Now that we have our decorator for declaring our injectable classes, we can start work on injecting them. We will make a decorator that wraps a class property which will it will assign the value of the injected class to.

Similarly to our `injectable` function, we will take a token as a parameter and return a function that will be executed.

##### inject.ts

```ts
import { container } from '../instances/container';

export function Inject(token: string) {
  return function(target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.resolve(token),
      enumerable: true,
      configurable: true
    });
  };
}
```

In this function, the `target` parameter is the class containing our property, and `key` is the name of our property.

We use `Object.defineProperty` here in order to set our injected class. For the `get` field, we call our previously defined `resolve` method on our container with the `token` argument provided in the `@Inject` decorator. We use this decorator inside a class like so:

```ts
@Inject('myInjectable')
private myInjectable;
```

## Testing it out

We've now finished building our dependency injection service. I told you it was going to be small! You can now test it out similarly to how we did it in the [snippet](#how-our-di-service-is-going-to-work) from earlier on in the article.

Dependency injection does go much deeper than this, such as injecting directly in to the constructor and using symbols instead of tokens (similar to how Angular does it). However, I hope this has given you a small insight on how DI works behind the scenes and you can feel happy knowing that there's now one more (seemingly) magical part about software engineering that you're not completely unaware of. Happy coding!
