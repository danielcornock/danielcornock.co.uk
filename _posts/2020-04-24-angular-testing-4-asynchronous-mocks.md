---
title: 'Unit testing in Angular: Mocking asynchronous calls'
description: >-
  How to write unit tests for our service calls that are asynchronous.
image: 'assets/images/articles/angular.png'
series: angular-unit-testing
tags:
  - angular
  - testing
---

Often when creating Angular applications, we will be dealing with some sort of asynchronous data, whether that be from a modal closing, one of your own asynchronous methods or awaiting a response from an external API. Luckily for us, Angular provides some great utilities for dealing with this. However, there are a few small utilities that we can use to make testing asynchronous code even easier. Without further ado, let's get started.

## The test promise class

Conventially, promises cannot be resolved or rejected from outside of the promise. This makes it difficult for us to test, as we cannot control the state of the promise manually.

Luckily for us, there's a way around this. Introducing, the test promise...

```ts
export class TestPromise {
  public promise;
  public resolve;
  public reject;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
```

Pop this code in to a file of your choice, preferrably inside a `utilities` folder. By assigning the `resolve` and `reject` callback to properties of the test promise class, we're now able to resolve them from outside of the promise. Woohoo!

## Our asynchronous code

Say in our component, we have a function for fetching our products asynchronously:

```ts
ngOnInit(): void {
  this.getAllProducts();
}

public async getAllProducts(): Promise<void> {
  const allProducts: Array<IProduct> = await this._productService.getAllAsync();

  this.products = allProducts;
}
```

We need to first add the `getAllAsync` to our stubbed service. If you're unsure, you can refer back to the [stubbing dependencies](angular-testing-2-stubbing-dependencies#creating-the-stub) article to see how.

Once we've done that, we need to create our test promise, and ensure that the call to this service returns that promise.

## Returning a promise

Within our initialisation `describe` block, we can do just that:

```ts
describe('on initialisation', () => {
  let getProductsPromise: TestPromise;

  beforeEach(() => {
    getProductsPromise = new TestPromise();
    (dependencies.productService.getAllAsync as jasmine.Spy).and.returnValue(getProductsPromise.promise);
    fixture.detectChanges();
  });

  it('should fetch all of the products', () => {
    expect(dependencies.productService.getAllAsync).toHaveBeenCalledWith();
  });
});
```

Now, when this service is called on initialisation, it will return the promise. Our test suite will now be paused, as it is in a state of `awaiting` the promise. To make the application continue, we need to `resolve` this promise with our data.

To do this, we're going to use a nice little utility called `fakeAsync`. This acts in a similar way to the `async` method, but it allows us to pass time in the application at our own speed. Let's take a look...

> The async method is used when resolving promises inside a `beforeEach` block to let Angular know that we are testing asynchronous code.

## Resolving our promise

Underneath our test for fetching the products, we have:

```ts
describe('when the products have been fetched', () => {
  beforeEach(fakeAsync(() => {
    getProductsPromise.resolve([{ name: 'product', number: '1' }]);

    tick();

    fixture.detectChanges();
  }));

  it('should display the products', () => {
    expect(getProducts()[0].componentInstance.product).toEqual({ name: 'product', number: '1' });
  });
});
```

As you can see in our `beforeEach` block, we resolve our promise with the array that we want it to return. We then call Angular's `tick` method in order to 'lock in' the changes, which we can then apply using `fixture.detectChanges()`.

With that, our asynchronous call is now resolved and we can test to see if the products are properly displayed!

## Rejecting our promise

Often in our code, we will be catching our errors in order to handle them correctly. Let's extend our asynchronous code to do just that.

```ts
public async getAllProducts(): Promise<void> {
  try {
    const allProducts: Array<IProduct> = await this._productService.getAllAsync();
    this.products = allProducts;
  } catch (e) {
    console.log(e);
  }
}
```

In the real world, we would be doing something a bit more sophisticated than this. However, this is enough for us to show how to deal with promise rejections in our test file.

Just after our describe block stating `when the products have been fetched`, we can cover the reject case with `when something goes wrong when fetching the products`.

```ts
describe('when something goes wrong when fetching the products', () => {
  beforeEach(async(() => {
    spyOn(console, 'log');

    getProductsPromise.reject('error!');
  }));
});
```

In our `beforeEach` block, we make it `async` (we don't need `fakeAsync` this time or `detectChanges` this time because we are not testing the template). Before we reject our promise, we need to spy on the `console.log` method. Luckily for us, we can spy on static methods using `spyOn`.

> `spyOn` is a testing method provided by Jasmine that allows us to pass in an object and a method name that we want to spy on. Whenever this method is then called, it will then call a spy in its place.

After we've spied on our method, we reject our promise with an error. This will make our asynchronous call throw an error, which will be caught in our `catch` block.

```ts
getProductsPromise.reject('error!');
```

Finally, just after our `beforeEach` block, we can make sure that `console.log` gets called with the error that gets thrown. and with that, we now have 3 passing tests!

```ts
it('should log the error', () => {
  expect(console.log).toHaveBeenCalledWith('error!');
});
```

## Wrapping up

In this article we' ve learned how to return a promise from an external method, resolve that promise, and also how to reject that promise. Next up, we'll be discussing how to [mock observables](angular-testing-5-mocking-observables).
