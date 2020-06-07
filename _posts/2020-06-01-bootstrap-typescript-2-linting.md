---
title: 'Bootstrapping a TypeScript project: Configuring our linter'
description: >-
  How to set up a clean express server with linting, testing and a build pipeline using TravisCI.
image: 'article-icons/eslint.png'
tags:
  - typescript
  - eslint
---

> This article is a part of a series on how to set up a CI/CD TypeScript server from scratch. Some of the examples here might not make sense if you haven't read the previous articles, so if you want to follow along with the whole thing, head to the [first article](bootstrap-typescript-1-ts-initialisation)!

Linting is a tool used to ensure that we make less syntax errors and enforces consistency and syntax rules within our codebase. Linters usually come with an range of pre-selected options, but we are able to add to and remove from the rules as we wish.

For this tutorial, I'll be showing you how to install `ESLint`. If you would rather use `TSLint` for your own project, then you can swap out this section of the tutorial for your own configuration, and skip ahead to [the next section](bootstrap-typescript-3-testing).

## Installation

First up, we should install it globally - you know the drill.

```bash
npm i -g eslint
```

Inside your project, you can now enter `eslint --init` to the command line, and an installation wizard will appear. You will be prompted to answer a few configuration questions about the project, and at the end it will install all the required dependencies and spit out an `eslintrc.json` file (given that you chose your `eslint` file to use JSON).

We're going to configure our ESLint settings a bit, because a lot of the functionality that it provides can be provided by the TypeScript compiler itself.

Below are the contents of my `eslintrc.json` file:

##### .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-var": 2,
    "semi": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
```

I have removed the default extends, and just kept the typescript options there to prevent double-errors. I have also added my own rules in the `rules` object, but these can be adjusted to your own taste. Primarily, I have turned off the `no-unused-vars` eslint rule because the typescript compiler already has functionality for that.

## Adding it to our scripts

To make our lives easier, we're going to add our linting command to the `scripts` object in our `package.json`.

##### package.json

```json
"lint": "eslint '*/**/*.ts'"
```

This will tell eslint to process every file ending with a `.ts` suffix. Any regex can be passed in to the options in order to include or exclude whichever files you would like to be processed.

We can then run our linting tool with `npm run lint`. If all goes well, no errors will be shown.

## Making our linter error

To test that our linting is working, let's add a new linting rule that will make our existing code throw a linting error:

##### .eslintrc.json

```json
"rules": {
  "no-var": 2,
  "semi": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "no-console": 2
}
```

Here we've added a `no-console` rule, which meaning eslint will throw an error if it finds any calls to `console.log` within our code. If we run our linting command now, you should see something like this.

```bash
/Users/danielcornock/repos/food-social-network/src/server.ts
  5:1  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)
```

It throws a big scary error at you!

If you don't think calls to `console.log` are that big of a deal (especially as this is a server side application), then we can change the value of `no-console` in the `rules` object to be `1`, which will throw a warning instead.

Or, if you're happy to let calls to `console.log` pass linting and make their way in to production code, you can remove that rule entirely or set the value explicitly to 0.

## Conclusion

We've now configured linting in our project, which will keep our code styling consistent and point out potential errors. If you're following along, you can read the next article on [how to add testing to your project](bootstrap-typescript-3-testing).
