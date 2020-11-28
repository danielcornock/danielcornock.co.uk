---
title: 'Project Writeup: Scoop'
image: 'projects/property-right/logo.png'
date: 2020-11-28
tags:
  - TypeScript
  - Angular
  - NodeJS
  - NestJS
  - Express
  - MongoDB
---

### Introduction

I've recently taken an interest in managing my finances better. Coupling that with becoming interested in investing, I now had my money spread out in multiple places.

Naturally, I turned to excel. I started tracking my net worth, investments and monthly spending, and added a few graphs in there. After a while I thought: hey, this could be my next personal project. Enter, Scoop!

### Primary Goals

- To allow users to track their net worth, using completely customisable fields and a customisable dashboard.
- To allow users to track their investments, and return key statistics about their portfolio's performance.
- To allow users to keep tabs on where their money went each month and how they were spending it.
- To provide a centralised place to keep a log of their salary and deductions, as well as provide helpful statistics such as estimated tax return (UK only).
- To fulfil all of the criteria for the app to be a production ready SaaS product.
- To create a clean, responsive UI design that felt like a native application on mobile.

### Learning Outcomes

A lot of the tools and techniques I've used for this project I have already got a decent understanding of. However, I still picked up a few tricks along the way.

- Becoming more and more familiar with RxJS and when to use it best.
- How to create charts using ChartJS.
- Create my first PWA.
- Learn how to send and design emails programmatically.

### Technical Discussion

Scoop has been my most comprehensive and enjoyable project to date. The project is feature rich and is the first project I've created that I believe to be ready for production. Features include:

- Notification system (non-push).
- Automated email notification system.
- Admin area that allows for notifications and newsletters to be sent.
- Full authentication system including:
  - Email verification
  - Password reset
- An external NPM library built that wraps the Angular reactive form library, allowing for less boilerplate when creating forms.
