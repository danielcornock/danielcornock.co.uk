---
title: 'Unit testing in Angular: Getting started'
description: >-
  An introduction to unit testing in Angular
image: 'article-icons/angular.png'
series: angular-unit-testing
tags:
  - angular
  - testing
---

For some people, unit testing is their least favourite part about development. Your feature work is complete, and then you’re hit with the mass of unit tests just waiting to be written. However, it doesn’t have to be this way. When creating a new component, writing unit tests is one of my favourite things to do - I already know and understand how my component works, and so I can just sit down and blast my way through them.

In this series, I’ll be showing you how to utilise jasmine, alongside Angular’s great built in testing functionality, in order to test angular components (including templates), services and directives in a clean and understandable way. Please note, that it is expected that you are comfortable with Angular and its conventions. A general idea of how unit testing works is not necessary, but will help you understand.

## Getting started

We’re going to be unit testing a small application that displays products, mocking API calls and dealing with asynchronous data. Here is how our component is going to start:

##### product-list.component.ts

```ts
export class ProductListComponent implements OnInit {
  public products: Array<IProduct>;

  constructor(private readonly _productService: ProductService) {}

  ngOnInit(): void {
    this.products = this._productService.getAll();
  }
}
```

In our component, we make a single, synchronous call to an injected service, and then display the results in the template, rendering it in a child component:

##### product-list.component.html

```html
<app-product *ngFor="let product of products" [product]="product"></app-product>
```

When we create a component, Angular kindly provides us with a basic template for writing unit tests, looking something like this:

##### product-list.component.spec.ts

```ts
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Breaking it down

Firstly, let’s dissect this down and go through what each bit is for:

### `describe`

The describe function is the building block of our testing suite. It’s purpose is to describe the flow of the unit tests, to set the context of the current block. For example, ‘when the button is clicked’.

### `fixture`

The fixture is a testing object that holds all of the information about the component under test. It is from this object that you can query the DOM, and trigger change detection within your tests.

### `beforeEach`

This function does exactly as it says on the tin, it runs before each and every describe/it block that lies beneath it. It’s good to assign variables in here (but not declare them!) so that each block of tests can have a fresh slate, that isn’t interfered with from other blocks of unit tests.`

### `TestBed`

This part of the code is preparing the testing module. In the declarations is where you will declare any stub components or directives that you want this test file to use instead of the real implementation. You can also add custom providers in this section, but we will discuss this further in the next section [stubbing dependencies](angular-testing-stubbing-dependencies).

##### product-list.component.ts

```ts
TestBed.configureTestingModule({
  declarations: [ProductListComponent]
}).compileComponents();
```

As you can see, this code is held in an asynchronous `beforeEach` function. This is because this operation can take some time to execute, so we want the rest of the code to wait for its completion before continuing.

### `createComponent` & `detectChanges`

This section will initialise the component. `TestBed.createComponent()` will run the constructor, while `fixture.detectChanges()` will initialise the component and render the template.

##### product-list.component.ts

```ts
fixture = TestBed.createComponent(ProductListComponent);
component = fixture.componentInstance;
fixture.detectChanges();
```

### `it`

Much like the describe blocks, this method is used to add a descriptive flow to your testing suite. It is in here that you must assert your test cases, using...

### `expect`

And finally, here is where we make our test assertions. The usual syntax for this will have a similar structure to `expect('something').toBe(true)`. However, there are many methods that the expect function returns, in order for you to be able to test a multitide of different scenarios.

## Onto the next step

Unfortunately, these tests won't currently pass. This is because we haven't properly set up our testing environment yet. For the next step, let's move on to [stubbing dependencies](angular-testing-2-stubbing-dependencies).
