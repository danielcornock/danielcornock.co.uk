---
title: 'Bootstrapping a TypeScript project: Setting up our testing environment'
description: >-
  How to set up a clean express server with linting, testing and a build pipeline using TravisCI.
image: 'article-icons/jest.png'
tags:
  - typescript
  - jest
  - testing
---

> This article is a part of a series on how to set up a CI/CD TypeScript server from scratch. Some of the examples here might not make sense if you haven't read the previous articles, so if you want to follow along with the whole thing, head to the [first article](bootstrap-typescript-1-ts-initialisation)!

Unit testing is a technique that is used across most large-scale projects. The idea of unit testing is to test everything in isolation, in order to give developers more confidence that their code works as expected. When paired with TypeScript, it dramatically reduces the amount of bugs and errors caused by a developers work.

In this article, we'll be setting up Jest, a popular JavaScript testing framework, to be used within our TypeScript project.

## Installation

First, we're going to install it. In the command line, run:

```bash
npm i -D jest @types/jest ts-jest
```

This will install `jest` itself, the `type` definitions for jest, and `ts-jest` which will allow us to test our typescript code on the fly without having to compile it to JavaScript first.

## Configuration

We then need to add a file in to the root of our project (the level up from the `src` directory), and name it `jest.config.json`. In this file, we will add the following:

##### jest.config.json

```json
{
  "moduleFileExtensions": ["json", "ts", "js"],
  "rootDir": "src",
  "modulePaths": ["<rootDir>"],
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coveragePathIgnorePatterns": ["factories", ".stub.ts", ".constant.ts"],
  "coverageDirectory": "./coverage",
  "testEnvironment": "node"
}
```

Most of this is pretty standard stuff that will allow us to run jest straight out of the box to test our typescript files.

- In the `rootDir` field, we have selected the `src` directory which is where our typescript is held.
- This setup expects your test files to have the suffix `.spec.ts`, but you can change that within the `testRegex` field if you want to cover other file types.
- In the `coveragePathIgnorePatterns` field, this is where we add our folders or filenames that we don't want to include in the test coverage report (we will go over this later in the article).

With this up and running, we should now be able to test our work! But first, let's write one.

## Writing a test

For the purposes of this tutorial, we won't be adding many in depth features to our project. Our main aim is to get the foundations laid. To check that jest is set up properly, let's create a directory called `controllers` and add a user controller to it.

##### src / controller / user.controller.ts

```ts
export const getAllUsers = (): string => {
  return 'all users';
};
```

This is a basic implementation of a function for getting all users. To test this, let's create a test file in the same directory.

##### src / controllers / user.controller.ts

```ts
import { getAllUsers } from './user.controller';

describe('UserController', () => {
  describe('when getting all users', () => {
    let result: string;

    beforeEach(() => {
      result = getAllUsers();
    });

    it('should return the users', () => {
      expect(result).toBe('all users');
    });
  });
});
```

Now, to actually run these tests, we can do one of two things:

- Run `npx jest` in our terminal.
- Add a script to our `package.json` file.

It's best practise to add a script to our `package.json` file, so let's do that. We'll just add it on to the list of our existing scripts that we've got in there.

##### package.json

```json
"scripts": {
  "dev": "tsc-watch --onSuccess \"npm start\"",
  "start": "node ./dist/server.js",
  "test": "jest"
},
```

By putting it in our package file, it means that it runs jest from the node modules of our project, and not from the version of jest that we have installed globally. This means that anyone working on our project will be able to pull this repo, install the dependencies and not have to worry about what's installed on their machine.

To run our tests, just type `npm test` in to the command line, and if all goes well you'll be presented with a lovely green success message.

```bash
PASS src/controllers/user.controller.spec.ts
  when getting all users
    ✓ should return the users (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.29 s
```

## Watching our tests

More often than not, we want our tests to recompile when we change our code in order to view the updated test results. To do that, we can add another script to our `package.json` file:

##### package.json

```json
"scripts": {
  "dev": "tsc-watch --onSuccess \"npm start\"",
  "start": "node ./dist/server.js",
  "test": "jest",
  "test:watch": "jest --watch"
},
```

Now, when we use this command by running `npm run test:watch`, our tests will re-reun whenever changes are made to our test files our source code.

## Testing files in isolation

One useful feature of jest is that we can test files in isolation by adding parameters to our CLI commands. Under the hood, jest uses regex to match all test files that fit the criteria that you provide.

For example, to test our file we can simply run `npm test user`, and it will match to our `user.contoller.spec.ts` and return the results. The same goes for using `npm run test:watch user`.

## Getting code coverage

Another out-of-the-box interesting metric that jest provides is code coverage. Code coverage will show you a detailed summary of each tested file, and show the percentage of lines, functions and branches covered during the test sweep.

To do this, we can add the following entry to our `scripts` object in our `package.json` file.

##### package.json

```json
"test:cov": "jest --coverage --config jest.config.json --no-cache"
```

If we then run this by using `npm run test:cov`, it will display some nicely formatted tables in the CLI, showing each coverage statistic for every file that was tested.

```bash
 PASS  src/controllers/user.controller.spec.ts
  when getting all users
    ✓ should return the users (2 ms)

--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |     100 |      100 |     100 |     100 |
 user.controller.ts |     100 |      100 |     100 |     100 |
--------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.493 s
Ran all test suites.
```

> **TIP:** It would be a good idea to add 'coverage' to the list of items in your `.gitignore` file to prevent the files generated by coverage to be committed to your repo.

If you remember from earlier, this is where you would use the `coveragePathIgnorePatterns` array in our `jest.config.json` file to exclude files from this list, as sometimes you will have files such as factories which aren't worth testing and just drag down your coverage score.

## Conclusion

Thanks for reading this article - if you're following along, you can read the next article on [how to integrate your project with a CI pipeline](bootstrap-typescript-4-ci). Have a great day!
