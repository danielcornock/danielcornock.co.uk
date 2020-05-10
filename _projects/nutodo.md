---
title: 'Project Writeup: Kanbo'
image: 'assets/images/articles/angular.png'
date: 2020-05-10 00:00:00 +0100
tags:
  - TypeScript
  - Angular
  - NodeJS
  - Express
  - Postgres
  - OAuth
  - Jest
---

> This project is still a work in progress.

### Business Objective

A to-do mobile web application that allows users to follow a unique methodology of keeping track of the things they need to do. By splitting todos in to `weekly`, `monthly` and `backlog`, it will allow users to set reasonable deadlines without committing to a date. At a selected weekly day by the user, they will be prompted to move items from the `monthly` or `backlog` list into the `weekly` list. The idea is to allow users to jot anything down that comes in to their mind, but to not have more important todos to get lost in the long lists that they create.

### Core Features

- The ability to add, edit and delete todo items.
- Categorise todo items by generic timeframe.
- Move todo items between list by a finger swipe.
- To behave natively on mobile devices.

### Learning Outcomes

- To use the NgRouter Angular module to manage routes and state management.
- To integrate google single sign on in to the application.
- To build a clean, fully unit-tested API that is structurally similar to NestJS architecture.
- To build an external Angular library for forms and API data processing.

### Technical Discussion

During this project I created a library for common ExpressJS functionality that I found myself repeating. This helped clean up my codebase to keep it more domain-centric, and allowed reuse of these utilities in other projects.

### Application Walkthrough

### Conclusion
