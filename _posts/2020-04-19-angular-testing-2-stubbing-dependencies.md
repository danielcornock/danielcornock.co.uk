---
title: 'Unit testing in Angular: Stubbing dependencies'
description: >-
  How to stub dependencies in angular to ensure total isolation for your test suite.
image: 'article-icons/angular.png'
series: angular-unit-testing
tags:
  - angular
  - testing
---

When working with big applications, it can be beneficial to create a stub for every service you create. Stubbing a service means that we don’t have to spy on any methods in our test file, as they are all already initialised as spies for us. Creating a stub doesn’t take long, and it saves you repeating code in future test files if your service is used in multiple places.

Let’s take a look at our service:

##### product.service.ts

```ts
export class ProductService {
  constructor() {}

  public getAll(): Array<IProduct> {
    return [
      {
        name: 'Product 1',
        number: '1'
      }
    ];
  }
}
```

## Creating the stub

This is obviously a very simple service, but no matter that actual implementation, all services can be stubbed the same way:

##### product.service.stub.ts

```ts
export class ProductServiceStub {
  public getAll: jasmine.Spy = jasmine.createSpy('getAll');
}
```

And it’s as simple as that. It’s best to keep it in it’s own file, with the naming convention `.stub.ts`. Even if this service had dependencies of its own, we don’t need to add a constructor to the stub.

> A spy allows us to mock return values and track certain information about our function call such as what it was called with and how many times it was called.

## Providing the stub

Now, back in our test file, we can provide this stub in place of our service:

##### product.service.spec.ts

```ts
describe('ProductListComponent', () => {
  let component: ProductListComponent,
    fixture: ComponentFixture<ProductListComponent>,
    dependencies: { productService: ProductServiceStub };

  beforeEach(async(() => {
    dependencies = {
      productService: new ProductServiceStub()
    };
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: dependencies.productService }]
    }).compileComponents();
  }));
});
```

First, declare a variable with a custom interface to hold our dependencies. This is useful for intellisense, code organisation and type safety.

```ts
let dependencies: { productService: ProductServiceStub };
```

Then, in our first `beforeEach`, we initialise our dependencies object, by creating a new `ProductServiceStub`.

```ts
dependencies = {
  productService: new ProductServiceStub()
};
```

Finally, we need to tell the Angular testing module to use our stub instead of the real thing, so we add a `providers` field to our testing module config, like so:

```ts
TestBed.configureTestingModule({
  declarations: [ProductListComponent],
  providers: [{ provide: ProductService, useValue: dependencies.productService }]
});
```

In this code snippet, we are saying to angular, “when you see `ProductService` in the constructor, instead of using the real thing, use the stub value that we’ve just created”.

This way, no real methods of product service will be called (especially necessary if that service communicates with an external API) and all the methods are already spied on for us.

## Writing our first test

Now that we've stubbed the dependency, we can check that `getAll` is called. Since we haven't created a stub for our child component yet, we will need to add the child component to the `declarations` array:

##### product-list.component.spec.ts

```ts
declarations: [ProductListComponent, ProductComponent];
```

Now, we can write our test:

##### product-list.component.spec.ts

```ts
it('should fetch all of the products', () => {
  expect(dependencies.productService.getAll).toHaveBeenCalledWith();
});
```

With any luck, after entering `ng test` in to your command line, it should now pop up with two successful tests passing! Woohoo!

## Onto the next chapter

Now that we've stubbed our dependency, we can move on to stubbing our child components and checking that they have the correct inputs. Find out how to do that in the next section, [stubbing child components](angular-testing-3-stubbing-child-components).
