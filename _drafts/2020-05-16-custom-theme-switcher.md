---
title: How to create a custom dark theme toggle for your website
description: >-
  ...
image: 'article-icons/half-moon.png'
tags:
  - CSS
  - javascript
---

We live in an age of dark themes. In this article I'll be showing you the short, but hacky way to implement a dark theme as well as the proper, more time consuming way.

## The proper way

Now that we have use of CSS variables, creating light/dark theme websites is more straight forward than ever. The great thing about it is we can still use scss variables!

For this tutorial, we will be adding a switch to a light theme app that allows us to toggle between the two themes.

### Removed hardcoded color values

The first thing that you'll need to do is to go around your website and find hardcoded color values. From here, you'll want to abstract them in to variables that you store in a scss file such as `_colors.scss`.

When abstracting them in to variables, try and avoid directly referencing the colour and instead provide the function

### Changing the body

In our example website, we set the background color of the body

## The hacky way

The quickest way to implement a dark-mode for your website is to use CSS `filter` property.

First, create a class in your CSS file called 'inverted'. Add the following code to it.

```css
.inverted {
  filter: invert(1);
}
```

What this code does is inverts the colours in the class according to the colour wheel. So, white will become black, blue will be yellow, and so on. Think of how negative images would look.

<script>
function invertColors() {
  document.querySelector('html').classList.toggle('inverted');
}
</script>
<style>
  .demoButton {
    font-size: 20px;
    padding: 8px 25px;
    background-color: purple;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
  }
  </style>

<button class="demoButton" onClick="invertColors();">Invert this page!</button>
