---
title: 'How to create your own NPM package with TypeScript'
description: >-
  How to create an npm package with typescript that can be used within our projects.
image: 'article-icons/npm.svg'
tags:
  - NPM
  - typescript
  - node
---

Creating an NPM package is a nice way to share your own utilities with the community, as well as extracting logic from your application to keep the core repo clean and business-oriented. It can also come in handy when you have multiple projects and want to share generic code between them.

When creating a package with TypeScript, it provides a ton more value to the consumer, as you can have TypeScript generate type definition files, which means that when using the package your code editor can utilise autocomplete, and the type files can be inspected to see what types the functions inside the package are expecting.

Today we'll be doing that. We'll create a generic library that can be used across multiple projects. We'll make sure that our library is extendable, uses best practises and is easy to integrate in to future projects.

### Prerequisites

- NPM & Node installed globally on your machine.
- TypeScript installed globally on your machine.
- An NPM account.

## Initialising our project

First off, we need to create our project. Create a folder where you would like your project to be located, and change directory in to that one.

```bash
mkdir npm-package-tutorial && cd npm-package-tutorial
```

Then, we run `npm init` and fill in the necessary fields. Don't worry, we can go back and change this later in our `package.json` file.

Once we've done that, we can run `tsc --init` to generate our `tsconfig.json` file. In there, we need to add a few things.

##### tsconfig.json

```json
"declaration": true,
"outDir": "./dist",
"rootDir": "./src"
```

With these options set, it will generate the package types when it is build, and it will build all files contained in the `src` folder and put them in to the `dist` folder.
