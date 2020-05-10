---
title: 'Project Writeup: PropertyRight'
image: 'projects/property-right/logo.png'
date: 2020-05-09
tags:
  - TypeScript
  - Angular
  - NodeJS
  - Express
  - MongoDB
  - Figma
---

### Business Objective

To deliver an application that allows property owners to keep track of their properties and the surrounding information such as tenants, to-do items and payments.

### Core Features

- Allow users to store core information about their properties, including address and rent.
- Integrate google maps with address information.
- Allow users to store information about their tenants, which can be linked to a property.
- Allow users to create linked to do items to their properties.
- allow users to keep track of and modify rent payments, tied to tenants.
- Provide users with a clean UI.

### Learning Outcomes

- To build my first API from scratch.
- To gain better experience and understanding of the Angular framework.
- To become more familiar with typescript.
- To learn how to integrate authentication and authorisation in to an application.
- To understand and utilise the Google Maps API.

### Technical Discussion

PropertyRight was my first crack at a full stack application which I'm still extremely proud of to this day. I spent a lot of time designing the application using Figma, and then fresh off of a NodeJS udemy course, started work on the API.

I initially wrote the API in vanilla JS, but migrated it part way through to use TypeScript, as well as separating different areas in to classes using OOP principles to try and reduce boilerplate code and increase maintainability.

For the front-end, I had written basic applications before & had completed a few stories at work, but this was my first go at a fully-fledged web application.

### Application Walkthrough

The application allows the user to view their properties, with useful previews of the information of each property. Before even clicking on a property, the user can see a preview image, the amount of open todos on a property, and the initials of tenants that currently live there (with the ability to navigate to those tenants' pages).

{% include components/image.html url="articles/2019-review/post_2019-review_IMG6.jpeg" description="Viewing all properties in PropertyRight." %}

Upon clicking on a property, the user is presented with the property details. This includes the property address, as well as an embedded google map displaying the exact location of the property which allows them to open up the property in google maps and navigate from there.

From this page, the user can also view, create and edit the tenants and todos that are linked with the property.

{% include components/image.html url="articles/2019-review/post_2019-review_IMG7.jpeg" description="Viewing property details in PropertyRight." %}

### Conclusion

For my first go at a full-stack application, I was extremely pleased with the outcome of this project. As expected, looking back at the code produced leaves a lot to be desired from a clean coding perspective. However, we all start somewhere and can only move up!

To improve this application, I would like to some day integrate an external CDN to store user images instead of storing it on the server, to reduce load times and prevent issues arising from multiple instances of the API.
