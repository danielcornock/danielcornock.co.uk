---
title: 'Design patterns: Observer pattern through RxJS'
description: >-
  Discussing and explaining the observer pattern using RxJS.
image: 'article-icons/rxjs.png'
tags:
  - design patterns
---

The observer pattern is a behavioural design pattern that enables you to define a subscription mechanism to notify objects on any events that occur on the object they are observing.

But **what does this mean?** Well, it allows us to build our software to respond to events where we don't know _when_ they're going to fire. It allows us to implement truly asynchronous and reactive code. Maybe we want to respond to an event - for this we have no idea when the event is going to fire, and it may well fire multiple times. For this we need an event-based solution. Enter, RxJS.

### RxJS

RxJS is a javascript library that lets us use observables to make it easier to compose asynchronous or callback code. It is a popular library which is bundled with the Angular framework.

To some (myself included), RxJS seems to work with magic. How on earth does it notify subscribers on events? It turns out it's actually more simple than it looks.

When subscribing to an observable in RxJS, you pass it a callback function. When you pass in this callback function, the subject will simply take that function and add it to an array of subscribers which will then get called whenever an event is triggered within the subject.

At this point, this may all still seem like jargon to you, and that's OK. Let's break down the subject in RxJS and build a simplified version of it.

### Break it down!

For our example, we will be building two classes with a shared dependency that holds an observable subject for them to communicate.

To start off, we need to build our `Subject`.

##### subject.ts

```ts
export class Subject {
  private _subscribers: Array<Function> = [];

  public subscribe(callback: Function): void {
    this._subscribers.push(callback);
  }

  public next(data): void {
    this._subscribers.forEach((subscriber: Function) => {
      subscriber(data);
    });
  }

  public unsubscribe(): void {
    this._subcribers = [];
  }
}
```

Let's take a look at what each bit of the code above is responsible for:

- The `subscribers` array will store each callback function that is assigned to the subject.
- When the `subscribe` method is called, it will supply a callback function that will fire whenever an event is triggered in our subject. This callback function will be added to the `subscribers` array.
- The `next` method is used to fire an event within our subject, which will then proceed to call all of the functions in the `subscribers` array with the data that is passed to it.
- Calling `unsubscribe` will empty the list of observers, meaning that in the future when `next` is called, nothing will happen. Calling `unsubscribe` is important because otherwise the callback functions will all still be held in memory and potentially called multiple times, meaning that memory leaks can occur.

The subject is the only thing we will be creating that is actually core to RxJS, the rest are flexible implementations that will change depending on your circumstances.

### Implementing our subject

Next up, we will have a mediator service that will store the subject, and allow two classes to communicate with each other without knowing about each others existence.

##### mediator-service.ts

```ts
export class MediatorService {
  public clickEvent: Subject = new Subject();
}
```

Then we can create our emitting class that be constructed with our mediator service, and call `next` on the subject in the mediator service whenever it wants to fire an event.

##### emitting-class.ts

```ts
export class EmittingClass {
  private readonly _mediatorService: MediatorService;

  constructor(mediatorService: MediatorService) {
    this._mediatorService = mediatorService;
  }

  public onClick(data: string): void {
    console.log('Sending message from emitting class!');
    this._mediatorService.clickEvent.next(data);
  }
}
```

Now, we create the receiving class, which will also be constructed with our mediator service, and will subscribe to events emitted to the `clickEvent` subject that resides in our mediator service. It will then take the data that is emitted and log it to the console.

> The callback provided to the subscribe function will **not** execute until an event is emitted to the `clickEvent` subject.

##### receiving-class.ts

```ts
export class ReceivingClass {
  private readonly _mediatorService: MediatorService;

  constructor(mediatorService: MediatorService) {
    this._mediatorService = mediatorService;
    this._listenToClickEvent();
  }

  private _listenToClickEvent() {
    this._mediatorService.clickEvent.subscribe((data: string) => {
      console.log('Message received in receiving class!');
      console.log(data);
    });
  }
}
```

Bringing it all together in our index file, we will initialise our mediator service and construct our two other classes with it. As you can see, by doing this, our two communicating classes have no need to know anything about each other!

We then call `onClick` in our emitting class with our friendly greeting, which will emit an event to the subject and call our subscribe callback that we provided in our receiving class.

##### index.ts

```ts
const mediatorService = new MediatorServie();
const emittingClass = new EmittingClass(mediatorService);
const receivingClass = new ReceivingClass(mediatorService);

emittingClass.onClick('hello!');
```

If you then have a look at your console, you can see the flow of the data from the emitting class to the receiving class, followed by the data that we passed through. Magic!

```console
Sending message from emitting class!
Message received in receiving class!
hello!
```

Although this example may seem arbitrary, we would often not be calling the `onClick` method ourselves, but it would be from an external event. We can also see how `EmittingClass` is able to call a function defined in `ReceivingClass` without either of them having any knowledge of the other.

### Diving a little deeper

That's the basic subject covered, but what about other types of subjects? The `BehaviourSubject` of RxJs, perhaps?

The behaviour subject behaves in the same way as a normal subject, except subscribing to it will also immediately call the callback provided with the most recent emitted data. Let's break it down.

##### behaviour-subject.ts

```ts
export class BehaviourSubject {
  private _subscribers: Array<Function> = [];
  private _state: any;

  constructor(initialState: any) {
    this._state = initialState;
  }

  public subscribe(callback: Function): void {
    callback(this._state);
    this._subscribers.push(callback);
  }

  public next(data): void {
    this._state = data;
    this._subscribers.forEach((subscriber: Function) => {
      subscriber(data);
    });
  }

  public unsubscribe(): void {
    this._subcribers = [];
  }
}
```

We've made a few modifications here:

- The `BehaviourSubject` has a constructor, where the initial state is passed in to it and stored.
- When subscribing to this subject, the callback provided will instantly be called with the state that is currently held internally, as well as being added to the subscribers list.
- When we call `next` on the subject, it will store the data provided before calling all of the subscriber functions with that data.

### Conclusion

Hopefully this article helps you to understand the basics of the observer pattern and how it's implemented within the RxJS library. We've only scratched the surface of RxJS here, as it is an incredibly complex and powerful library. Maybe we can leave that for another day!
