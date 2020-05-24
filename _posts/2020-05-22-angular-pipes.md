---
title: An introduction to pipes in Angular
description: >-
  An introduction to creating pipes in Angular.
image: 'article-icons/angular.png'
tags:
  - angular
---

Pipes are a feature built in to the Angular framework to process the way that data is displayed to the end-user. A prime example is using a date pipe to transform a raw date in to the format that you desire, or turning a number in to a currency.

Using pipes allows us to separate concerns for the presentation of our application, and avoid repetition across our component files.

## Using pipes

Let's take a look at a conventional use of the built-in Angular date pipe.

{% raw %}

```ts
@Component({
  selector: 'app-current-date-viewer',
  template: `
    <p>{{ currentDate | date }}</p>
  `,
  styleUrls: ['./current-date-viewer.component.scss']
})
export class CurrentDateViewerComponent {
  public currentDate: Date = new Date(Date.now());
}
```

{% endraw %}

In the above code snippet, we are:

- Assigning the current date to a variable, `currentDate`.
- Passing that value in to the template with double curly braces.
- Piping the value of that variable with the `date` pipe.

If we serve this component, we should see the current date displayed in a processed format.

```console
May 24, 2020
```

### Adding parameters to a pipe

If we want to customise the actions taken by the pipe, we can pass in parameters. Inside the template of our component, we can add the parameters as an argument to the pipe by doing the following:

{% raw %}

```html
<p>{{ currentDate | date: 'dd/MM/yy' }}</p>
```

{% endraw %}

The value used for the parameter can be a string literal or a property of the component, which allows for dynamic parameters to be passed in.

### Chaining pipes

Pipes can also be chained, meaning that we can apply multiple pipes to the same data. The pipes will be processed from left to right.

{% raw %}

```html
<p>{{ currentDate | date | uppercase }}</p>
```

{% endraw %}

In our example above, the `currentDate` will first be formatted in to a standard date, and then will be converted to uppercase.

```console
MAY 24, 2020
```

## Creating our own pipe

We all know what you're here for - you want to create your own pipe. Well, your wait is finally over, so let's get stuck in. We'll build a simple pipe to add file extensions to a string.

> If you're using the Angular CLI, you can go ahead and run `ng generate pipe extension-builder`. If you're not, you'll have to create the pipe yourself and manually add it to your modules `declarations`.

##### extension-builder.pipe.ts

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extensionBuilder' })
export class ExtensionBuilder implements PipeTransform {
  public transform(value: string, extension: string): string {
    return `${value}.${extension}`;
  }
}
```

There's a lot going on here, so let's break it down.

- First we name our pipe by passing in an object with a name property to the decorator arguments - the value we use here is what we will use to access the pipe in our template.
- We then create the class and implement `PipeTransform`, which dictates the use of the `transform` method.
- The `value` parameter of the `transform` method will take the value that is passed to the left of the pipe (`|`) operator.
- The second argument of the `transform` method is an optional parameter, which is used if our pipe has a parameter attached to it.

Let's put our pipe to the test. In a component file, let's initialise a variable that holds a file name.

##### file-viewer.component.ts

```ts
@Component({
  selector: 'app-file-viewer',
  template: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent {
  public fileName: string = 'my-component';
}
```

We can then pipe this variable within the template of our component, by using the curly braces and adding our desired file extension within the parameters of the pipe.

##### file-viewer.component.html

{% raw %}

```html
<p>{{ fileName | extensionBuilder: 'ts' }}</p>
```

{% endraw %}

When we serve the application, we should now see our concatenated filename in the browser!

```console
my-component.ts
```

### Multiple parameters

We can build our pipe to accept multiple parameters. To add multiple parameters in the template, we separate them using a colon (`:`).

##### file-fiewer.component.html

{% raw %}

```html
<p>{{ fileName | extensionBuilder: 'service':'ts' }}</p>
```

{% endraw %}

In the logic for the pipe, we can accept multiple parameters by adding each one to the arguments of our `transform` method, which will follow the order that the arguments are added in the template. In our case, `type` and `language` will both be using the parameters.

##### extension-builder.pipe.ts

```ts
public transform(value: string, type: string, language: number): string {
  return `${value}.${type}.${language}`;
}
```

Or for an unknown amount of parameters, we can use the rest operator to take all arguments and convert them in to an array to be used within the pipe.

##### extension-builder.pipe.ts

```ts
public transform(value: string, ...args: Array<string>): string {
  return `${value}.${args.join('.')}`;
}
```

### Creating a more complex pipe

Pipes aren't restricted to simple operations like we've used in the above examples. Pipes can also have dependencies and perform complex operations.

One example of this is using a pipe to take a translation id to fetch the text from an external JSON file based on the locale of the user.

##### translate.pipe.ts

```ts
@Pipe({ name: 'translate' })
export class Translate implements PipeTransform {
  constructor(private readonly _translateService: TranslateService);

  public transform(value: string): string {
    return this._translateService.getTranslation(value);
  }
}
```

By doing this, we can extract repetitive logic from our components and keep the implementation separate, only needing to pass a string to our pipe when we want to use our translation files.

## The async pipe

A pipe that's so good it deserved its own section.

The async pipe is another built-in pipe that Angular provides. By using an async pipe, you can pass promises and observable streams straight in to the template, and the pipe will await the resolved promise or listen for events on the observable.

We can utilise the async pipe in the following way:

##### profile.component.ts

{% raw %}

```ts
@Component({
  selector: 'app-profile',
  template: `
    <p>{{ myPromise | async }}</p>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public myPromise: Promise<string>;

  constructor(private readonly _asyncService: AsyncService) {}

  public ngOnInit() {
    this.myPromise = this._asyncService.getPromise();
  }
}
```

{% endraw %}

We assign the promise received from our service to a variable without awaiting it. By passing it directly in to our `async` pipe it will be automatically awaited, meaning that when the promise resolves the value will be displayed as HTML.

This is great for us, as it removes the clutter from our component where would usually be awaiting our promises, and leaves all of that logic down to the `async` pipe.

## Wrapping up

I hope this article has given you an insight in to how pipes work in Angular. With the knowledge you've learned from this article I hope you now feel that are primed to go out there and start creating your own pipes. If you find yourself stuck building pipes and this article is unable to help, I recommend checking the [official Angular docs](https://angular.io/guide/pipes) where you can find more examples and explanations to help you out.

Happy coding!
