---
title: 'Project Writeup: Kanbo'
image: 'projects/kanbo/logo.png'
date: 2020-05-08
tags:
  - TypeScript
  - Angular
  - Jasmine
  - NodeJS
  - NestJS
  - Express
  - MongoDB
  - TravisCI
  - Jest
---

### Business Objective

To build a kanban board web application in similar style to Trello, with added bells and whistles that I could utilise when planning future applications.

### Core Features

- Organise cards in custom lists and be able to drag and drop them wherever you like.
- Automatic generation of 'story numbers'.
- Integration with GitHub commits.
- Custom tag properties.

### Learning Outcomes

- To learn how to use Angular's drag drop library.
- To develop skills in unit testing and achieve high levels of code coverage.
- To learn how to use NestJS.
- To setup an automatic CI pipeline for both front end and back end.
- To develop a miniature forms framework as I go along

### Technical Discussion

I had used Trello for previous projects, and I enjoyed the organisation it provided. However, there were some extra features that I desired that either weren't included or were locked behind plugins. Being the cheap-ass developer that I am, I decided to build my own.

For this project, I achieved my goal of setting up a build pipeline using TravisCI, which built the application, ran unit tests and linted the application before allowing the pull request to be merged in GitHub. This was set up for the front-end and the API, with near 100% code coverage for tests.

I also created a couple of small SCSS packages during this project, which I used to abstract away some common mixins and variables that would be used across various projects.

In the API, I used NestJS. I was very impressed with the framework, and found it very easy to use due to its stark similarities with how Angular codebases are laid out.

I also began creating my forms framework, which abstracted away some repetitive functionality that occured when using the native Angular reactive forms module.

### Application Walkthrough

After signing in to the application, and have created a board, you are presented with an empty board with configurable columns. From there, you can add stories and drag them around between columns.

{% include components/image.html url="projects/kanbo/board-screenshot.png" description="A populated board using Kanbo." %}

When editing a story, you can then edit the title & description, add tags, and link it to a github commit.

{% include components/image.html url="projects/kanbo/edit-story-screenshot.png" description="The modal used to edit a story." %}

In order to configure the repos associated with the product, the user can use a modal in the settings to link repositories.

{% include components/image.html url="projects/kanbo/github-screenshot.png" description="The modal used to set up repos used for your board." %}

### Conclusion

All in all, despite not fully fleshing out the product to where I wanted it to be, I learned a great deal about build pipelines, unit testing, and creating my own angular libraries. The finished product is minimal, yet fully usable for me when planning future applications, and I have used it multiple times since.
