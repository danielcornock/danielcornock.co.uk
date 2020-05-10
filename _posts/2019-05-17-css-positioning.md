---
title: CSS Positioning For Absolute Beginners
description: >-
  A handy reference for both new and experienced developers for when you just
  can't get that positioning quite right.
image: 'article-icons/css.png'
tags:
  - CSS
---

Positioning objects in CSS can often be quite a daunting task. There are 4 main types of positioning, some which you will use all the time! Others, not so much.

- Absolute Positioning
- Relative Positioning
- Fixed Positioning
- Sticky Positioning
- Static Positioning

To position elements, you use the `top`, `left`, `bottom` and `right` properties. These can be assigned anything from px, to em, to percentage. How they effect the element depends on the type of positioning.

Let's start with the one you don't need to know much about...

## Static Positioning

Don't let this one fool you. You might think that 'static' means that it won't move. This is not the case. If your element is positioned statically, you can't edit the properties mentioned above and it remains in the normal flow of the document.

## Absolute Positioning

Absolute positioning is probably the most wideley used of the `position` values. It's great for centering things, and for placing elements where usually it would be hard to without a load of extra divs.

We position our element by setting `position: absolute` and using `top`, `right`, `bottom` and `left` to place it. By default, these values will be referring to the `body` element.

For example:

```css
.positioned-div {
  position: absolute;
  top: 50%;
  left: 50%;
}
```

An element with this code will position itself relative to the viewport window. It will appear 50% across and 50% down the page. One might think this means that it is centered, however this would not be the case. The reference point of the element is the top left corner. So, if you want a centered div, you'll need to apply the following magic to the element:

```css
.centered-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

Although not in the scope of this tutorial, what `transform: translate(-50%, -50%)` does is move the element relative to itself. This means that the point you positioned it at with `top` and `left` is now it's center point.

However, we don't always want to position our element relative to the viewport. Sometimes we might want to position it relative to its parent. We do this by adding this to the parent's class:

```css
.parent-div {
  position: relative;
}
```

And just like that, the child element is now positioned 'relative' to it's parent!

## Relative Positioning

As mentioned above, relative positioning is used on a parent div to anchor the absolutely positioned child to itself. However, relative positioning also allows you to 'nudge' an element in any direction. Practically, there aren't many uses for this unless you need a 'hacky' solution to get the design that you're looking for.

One exception is animations. Sometimes it can be nice to have elements move from a spot that's say, 100px down from their intended position, back up to their original position when the user scrolls there.

To use relative positioning, it's much like absolute positioning except it's relative to itself. If you use `top: 50px` the element will be 50px down from the 'top' of its original position.

## Fixed Positioning

Fixed positioning is near identical to absolute positioning, with one exception. It stays put as you scroll. You will have seen this on some websites with fixed headers and, unfortunately, fixed pop ups asking if you want to subscribe to a mailing list for the 1000th time.

## Sticky Positioning

And finally, sticky positioning. A hybrid between fixed and relative in a way. The element will remain in its natural position until it reaches a threshold (set by `top`, `left` etc., where it will then remain fixed on the screen until the threshold of its containing div passes the point that it is fixed, and it is scrolled off the screen.

Times that you might have seen this could be in an old school phonebook (maybe on an iPhone 3G. wait... you didn't think I meant an ACTUAL phonebook did you? I'm not that old...), where the initial of the current set of contacts is held at the top of the screen, before being pushed up by the next initial.

## To Finish Off

I kept this short and sweet so that hopefully it can be a bit of a reference point for you when you need to check up on it again. For more in depth guides I recommend heading over to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position), who have a plethora of information that you can sink your teeth into.

Thanks for reading!
