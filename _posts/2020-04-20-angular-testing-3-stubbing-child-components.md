---
title: 'Unit testing in Angular: Stubbing child components'
description: >-
  How to stub child components in angular in order to test their inputs and outputs, and ensure total isolation for your test suite.
image: 'articles/angular.png'
series: angular-unit-testing
tags:
  - angular
  - testing
---

Like services, child components need stubs too. This reduces the load of the testing module, prevents calls to any external APIs to services from within that child component, and just tests the things that we want to test.

Here is the class for our child component:

##### product.component.ts

```typescript
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: IProduct;

  constructor() {}

  ngOnInit(): void {}
}
```

## Creating our stub

To create a stub for this, we just need to look at the `@Input()`s and `Output()`s, and tweak a couple of things within the component decorator.

##### product.component.stub.ts

```typescript
@Component({
  selector: 'app-product',
  template: ''
})
export class ProductComponentStub {
  @Input()
  public product: IProduct;
}
```

As you can see we’ve stripped everything but the input from the main class, kept the selector in the decorator config (this is important for angular to know what this needs to replace in the DOM), and replaced the `templateUrl` field with an empty string for the `template` field. We need to change it to be `template` and not `templateUrl` so that angular isn’t trying to find the template within the file system.

## Using our stubbed component

To use our stubbed component in place of the real thing, we need to add it to the `declarations` in our test file, like so:

##### product-list.component.spec.ts

```typescript
TestBed.configureTestingModule({
  declarations: [ProductListComponent, ProductComponentStub],
  providers: [{ provide: ProductService, useValue: dependencies.productService }]
});
```

Great! Now we should be all set up. If we run our tests, nothing should break, and we’re ready to start mocking!

## Mocking results

In our small component, we are expecting to receive an array of products from the `getAll` method. To mock this, we can add this in to our non-asynchronous `beforeEach` method:

##### product-list.component.spec.ts

```typescript
beforeEach(() => {
  fixture = TestBed.createComponent(ProductListComponent);
  component = fixture.componentInstance;

  (dependencies.productService.getAll as jasmine.Spy).and.returnValue([{ name: 'product', number: '1' }]);
});
```

As you may have noticed, I have moved the `fixture.detectChanges()` out of this method. This is so that if I wanted to test other starting scenarios within the component, I can set up the mocks differently or initialise the inputs and THEN call `fixture.detectChanges()`, otherwise the testing suite will not register the changes.

Now, to start testing:

##### product-list.component.spec.ts

```typescript
describe('on initialisation', () => {
  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should fetch all of the products', () => {
    expect(dependencies.productService.getAll).toHaveBeenCalledWith();
  });
});
```

As you can see here, I’ve now called `fixture.detectChanges()` to initialise the component. In the first test, we’ve checked that the method in our service has been called. Often, this will be called with parameters that come from the result of another function, so it’s good to check that the flow of the component is working as expected. In our case though, it wasn’t called with anything, so we need to make sure the parameters are empty by leaving the arguments for `toHaveBeenCalledWith` as blank.

## Querying our child component

Now, it’s time to test our template. As you may remember, our template looks like this:

##### product-list.component.html

```html
<app-product *ngFor="let product of products" [product]="product"></app-product>
```

Now, to query the products from within the dom, we can use:

##### product-list.component.spec.ts

```typescript
function getProducts(): Array<DebugElement> {
  return fixture.debugElement.queryAll(By.directive(ProductComponentStub));
}
```

We can create this function just after we declare our fixture in our top-level scoped variables, just inside the first `describe` block.

Now, just after our first test, we can add another test to check that each product has been passed in to our child component.

##### product-list.component.spec.ts

```typescript
it('should display the products', () => {
  expect(getProducts()[0].componentInstance.product).toEqual({ product: 'product', number: '1' });
});
```

And there we have it! Now you should be able to run `ng test`, and get a nice green message telling you that both of your tests pass!

> Because of the way Angular runs its tests, it will run every spec file in your project when you run `ng test`. If you just want to test one file in isolation, you can head to the `test.ts` file and change the regex to only look for your file. For more details about this, take a look at [this stack overflow answer](https://stackoverflow.com/a/50636750/11943792).

Great! So now we’ve tested our child components inputs. What about if it has outputs?

## Mocking outputs

We can go in to our product component (and the stub for this component), and add an output for when a user deletes a product:

##### product.component.ts / product.component.stub.ts

```typescript
@Output()
public productDelete: EventEmitter<void> = new EventEmitter<void>();
```

We should also add this exact same output to our stub file for this component.

Now, in our `product-list` component, we need to handle this

##### product-list.component.html

```html
<app-product
  *ngFor="let product of products"
  [product]="product"
  (productDelete)="onDelete(product.name)"
></app-product>
```

Then in the typescript for that file, we can create the function that will respond to the output and make a call to our service.

##### product-list.component.ts

```typescript
public onDelete(productName: string): void {
  this._productService.deleteProduct(productName);
}
```

And finally, add the `deleteProduct` method to both our service file and its stub. For this demonstration, we don't need to actually implement anything in the real product service because we will be mocking its behaviour.

##### product.service.stub.ts

```typescript
export class ProductServiceStub {
  public getAll: jasmine.Spy = jasmine.createSpy('getAll');
  public deleteProduct: jasmine.Spy = jasmine.createSpy('deleteProduct');
}
```

## Writing our test

Now, back in our test file for our product list, we should write a new describe block just under our existing tests to set the scenario for when the user removes a product:

##### product-list.component.spec.ts

```typescript
describe('when a user deletes a product', () => {
  beforeEach(() => {
    getProducts()[0].componentInstance.productDelete.emit();
  });
});
```

In here, we’ve put a `beforeEach` block to trigger the event emitter from the first child component that appears in the DOM. As you can see, we are able to reuse the same function to fetch the components as we defined earlier.

Just like before, we can now test that the appropriate method has been called. We pop this test just under the `beforeEach` within this testing block.

##### product-list.component.spec.ts

```typescript
it('should delete the product', () => {
  expect(dependencies.productService.deleteProduct).toHaveBeenCalledWith('product');
});
```

Because of the logic we have in our template, the service gets called with the value that's in the `name` field of the product that we have grabbed from the DOM.

Now, run this bad boy and see the green appear on your screen!

## Wrapping up

In this article we've learned how to grab DOM elements, check that their inputs are correct, and check that the correct output behaviour has occured on an emit. In the next article of this series, we're going to dive in to testing [asynchronous calls](angular-testing-4-asynchronous-mocks).
