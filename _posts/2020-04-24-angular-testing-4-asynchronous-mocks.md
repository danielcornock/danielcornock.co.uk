---
title: 'Unit testing in Angular: Mocking asynchronous calls'
description: >-
  How to write unit tests for our service calls that are asynchronous.
image: 'assets/images/articles/angular.png'
layout: 'post/post'
series: angular-unit-testing
tags:
  - angular
  - testing
---

{% assign sorted = site.posts | sort: 'date' %}

{% for post in sorted %}
{% if post.series == 'angular-unit-testing' %}

[{{post.title}}]({{post.url}})

{% endif %}
{% endfor %}

Often when creating Angular applications, we will be dealing with some sort of asynchronous data, whether that be from a modal closing, one of your own asynchronous methods or awaiting a response from an external API. Luckily for us, Angular provides some great utilities for dealing with this. However, there are a few small utilities that we can use to make testing asynchronous code even easier. Without further ado, let's get started.

## The test promise class

Conventially, promises cannot be resolved or rejected from outside of the promise. This makes it difficult for us to test, as we cannot control the state of the promise manually.

Luckily for us, there's a way around this. Introducing, the test promise...

```js
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

Once we've done that, we need to create our test promise, and ensure that the call to this service returns that promise. Within our initialisation `describe` block, we can do just that.

## Returning a promise

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

CONTENT TO BE CREATED

## Wrapping up

In this article we' ve learned how to return a promise from an external method, resolve that promise, and also how to reject that promise. Next up, we'll be discussing how to [mock observables](angular-testing-5-mocking-observables).
