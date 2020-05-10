---
title: 'Unit testing in Angular: Mocking observables'
description: >-
  How to write unit tests for our service that utilises RxJS observables.
image: 'article-icons/angular.png'
series: angular-unit-testing
tags:
  - angular
  - testing
  - RxJS
---

RxJS is baked into Angular. At some point in your time spent developing Angular applications, you're bound to come across it. When it comes to testing it, it can feel a little alien and intimidating at first, but hopefully after this guide you'll be left feeling much more confident.

## Internal observables

If you have internal observables that are triggered and subscribed to within the component that you're testing, you won't have to mock any observables - it should take care of itself. Let's change our code to utilise some RxJS.

##### product-list.component.ts

```ts
export class ProductListComponent implements OnInit {
  public productsSubject: Subject<Array<IProduct>> = new Subject();

  constructor(private readonly _productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public async getAllProducts(): Promise<void> {
    try {
      const allProducts: Array<IProduct> = await this._productService.getAllAsync();
      this.productsSubject.next(allProducts);
    } catch (e) {
      console.log(e);
    }
  }
```

As you can see, instead of assigning the results to a variable, we create a subject at the top of the component, and proceed to `next` to our subject when the products have been fetched.

```ts
this.productsSubject.next(allProducts);
```

And then in our template we utilise the `async` pipe to subscribe to our subject.

##### product-list.component.html

```html
<app-product *ngFor="let product of productsSubject | async" [product]="product"></app-product>
```

> The async pipe will automatically subscribe to a subject or observable that is passed in to it, as well as unsubscribing on component destruction.

If we run our tests again, they should all pass! Wasn't that easy? Now, on to the harder part.

## Mocking observables

For our example, let's say that in our product service we have a method that returns an observable to notify us whenever the user wants to remove all of the products from the page.

In the initialisation of our component we will subscribe to the observable, and when a value is emitted, use our previously created `productsSubject` to clear the products being displayed on the template.

##### product-list.component.ts

```ts
ngOnInit(): void {
  this.getAllProducts();
  this._subscribeToRemovedProducts();
}

private _subscribeToRemovedProducts(): void {
  this._productService.onRemoveAllProducts().subscribe(() => {
    this.productsSubject.next([]);
  });
}
```

First off, we need to add this method to our stub file, which you can get a refresher on how to do just that in the [stubbing dependencies](angular-testing-2-stubbing-dependencies) article.

### Returning the observable

After we've done that, we need to mock our new method to return an observable. Because we subscribe to that observable on initialisation of our component, we must set up the mock _before_ the first `detectChanges` in our test file. This can be anywhere you like, as long as its within a `beforeEach` and after the initialisation of your dependencies.

##### product-list.component.spec.ts

```ts
describe('on initialisation' () => {
  let deleteProductsSubject: Subject<void>;

  beforeEach(() => {
    deleteProductsSubject = new Subject();
    (dependencies.productService.onRemoveAllProducts as jasmine.Spy).and.returnValue(
      deleteProductsSubject.asObservable()
    );
  });
});
```

In the above code, I've created a new subject, and made it so that when our service method is called, it returns that subject `asObservable`. This is what allows our program to then `subscribe` to it. We've also made sure to declare our subject in the outer `describe` block, as we're going to need to be able to access it to manually call `next` ourselves, later on.

### Triggering our subscribe block

Now, to best test the functionality of our method, we should test how it works _after_ our template has been populated with products. So, let's place this block of code in the block of code after our products promise has resolved (only if you're following along with the series!).

##### product-list.component.spec.ts

```ts
it('should display the products', () => {
  expect(getProducts()[0].componentInstance.product).toEqual({ name: 'product', number: '1' });
});

// Start of our new test
describe('when the user wants to delete all products', () => {
  beforeEach(() => {
    deleteProductsSubject.next();

    fixture.detectChanges();
  });

  it('should remove all of the products', () => {
    expect(getProducts().length).toBe(0);
  });
});
```

In this code, we simply call `next` on our subject, and this will trigger our subscribe block to run. We can then call `detectChanges` to update the template, and test that the products have all been removed.

## Finishing up

And that's it for observables for now! This article is a very simple implementation, and so testing RxJS can become quite difficult. However, hopefully this article can give you a base to build upon when testing observables. As always, if you have any questions or suggestions, don't hesitate to get in touch!
