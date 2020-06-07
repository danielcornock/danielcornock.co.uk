---
title: 'Bootstrapping a TypeScript project: Getting set up'
description: >-
  How to set up a clean express server with linting, testing and a build pipeline using TravisCI.
image: 'article-icons/ts.svg'
tags:
  - typescript
---

In this article series, we're going to walk through setting up a small TypeScript project that utilises ESLint, Jest and TravisCI. By doing this, we can ensure that we have type safety, linting to keep our code tidy, tested code and a pipeline to ensure that all of the above pass before our code is committed into our chosen repo.

The actual features of the code will be very minimal, which will allow you to go ahead and create your projects in the way that you want them, with all of the safety checks from this series pre-configured and ready to go.

> The operating system that will be used for this tutorial is MacOS. Most of the steps should be transferable to windows, but some command line operations may differ.

### Prerequisites

- Git installed on your machine.
- Working knowledge of git.
- NodeJS and NPM installed globally on your machine.

## Initialising our project

To initialise our project, head to the terminal and change directory to the one that you want your project to be located and run:

```bash
mkdir my-typescript-api && cd my-typescript-api
```

This will create the directory (with the name of your choosing) and make it your active working directory in the terminal. Once you've done this, run:

```bash
npm init
```

It will follow with a list of prompts. You can just hit `enter` on all of these unless you want to customise them. Don't worry - you can come back and edit these later within the auto-generated `package.json` file.

Once this is done, we can open up our project in our preferred text editor (I'm using VSCode for this tutorial).

You'll be presented with a lonely `package.json` file, which is where the details you may have entered in the setup will appear. This file is also where all of our dependencies and their versions will be stored.

## Initialising git

Next up, we want to create a git repository. Using the terminal in our project folder, run:

```bash
git init
```

This will initialise an empty git repository for us, so that we can apply versioning to our project.

While on the topic of git, let's create a file and name it `.gitignore` in our project folder. In this file, we can add all of the files and directories that we don't want to be included in our git repo.

Although we have nothing that needs ignoring yet, we will very shortly. So let's get ahead of the game and add the following to our `.gitignore` file:

```text
node_modules
dist
```

## Setting up TypeScript

To set up TypeScript, first we need to have it installed globally on our machine. To do this, type the following in to your console (from anywhere):

```bash
npm i -g typescript
```

Once that's installed, we want to set up our project to use typescript. First, make sure your terminal is pointing at the project folder, and then run:

```bash
tsc --init
```

This will create a `tsconfig.json` file in the root of your project, and will contain a large list of (mostly commented out) JSON. This can definitely be a bit intimidating, and is best to be left alone until you feel more comfortable changing the settings in it. We will be modifying settings on it as we go along.

### Creating our first file

Because we are using TypeScript, our code now has to be compiled in to JavaScript before it can be ran by the browser or by the node engine. Because of this, it's best to keep our source code and our built code in separate folders.

So, next we can create a folder named `src` in our root directory, and create a new file called `server.ts` in there.

Remember how earlier I mentioned we would be modifying our `tsconfig.json` file? Well, the time has come. Don't be too intimidated - we'll do it together.

Because we are holding our source code inside our `src` folder, we need to let the TypeScript compiler know that we are keeping it there. To do this, open up `tsconfig.json` and add the following line at any point inside the `compilerOptions` object.

##### tsconfig.json

```json
"include": ["src/**/*"],
```

We also need to tell the TypeScript compiler where to put the built JavaScript. To do this, search for the entry called `outDir` in the `tsconfig.json` file, uncomment it, and change it to the following:

##### tsconfig.json

```json
"outDir": "./dist"
```

You can use whichever folder name you prefer, but we will be going with `dist` for `distribution`.

Now, we need to make something for the compiler to actually compile! In our `server.ts` file, we will follow suit and add the programming world's most well known phrase.

##### server.ts

```ts
console.log('Hello world!');
```

In the terminal, go ahead and run `tsc`. The TypeScript compiler should then place our built JavaScript into our `dist` folder (or whatever you decided to name it).

To run our built code, go ahead and run:

```bash
node dist/server.js
```

And you should see our friendly message displayed in the terminal window. The problem is, this would get a bit tedious to do every time we made a change. Let's automate it a bit.

### Automating the build

To automate our build, we're going to have to install a couple of dependencies, and add some scripts to our `package.json`.

First up, run the following within your project:

```bash
npm i -D typescript tsc-watch
```

This will install TypeScript **locally**, so that our `package.json` is able to run scripts that perform TypeScript operations. It will also install `tsc-watch` which is a package that we will use to watch for changes in our files.

To use these, we can add the following entries to the `scripts` object within our `package.json` file:

##### package.json

```json
"scripts": {
  "dev": "tsc-watch --onSuccess \"npm start\"",
  "start": "node ./dist/server.js"
}
```

The `start` script is exactly what we ran earlier to get our 'Hello world!' output. In our `dev` script, we are calling our `tsc-watch` module, and when the build is successful it will run our `start` script that we defined underneath.

Let's test this out! In our command line, hit `npm run dev` and with any luck, you'll be able to see the typescript code compile and then our cheery output displayed on the screen yet again.

```bash
19:00:16 - Starting compilation in watch mode...


19:00:17 - Found 0 errors. Watching for file changes.

> my-typescript-api@1.0.0 start /Users/danielcornock/repos/my-typescript-api
> node ./dist/server.js

Hello world!
```

If we go ahead and change something in our server file, our code will be re-compiled and re-served with the new code in effect!

As we now have a working project, now would be a good time to commit your code before we move on to the next section.

## Conclusion

Our TypeScript project is now set up ready for development, and will re-build every time we want to make changes. If you want to carry on reading, head to [the next article](bootstrap-typescript-2-linting), which is all about adding linting to our project. Thanks for reading!
