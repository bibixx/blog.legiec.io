---
title: How to create dynamic shadows in CSS
date: 2018-07-04 16:31:07
image: /static/2018/07/04-gradient.png
fill_color: "#151515"
image_source:
background_type: cover
category:
snippets: 'How-to-create-dynamic-shadows-in-CSS'
---

Recently I wanted to create a gradient shadow – a shadow that would play nicely with gradient background. As we might suspect it needed a kind of a hack – it is CSS after all. But this hack is quite interesting so I wanted to share my idea with you.

<!-- more -->

## `box-shadow`

Let's start with recap of `box-shadow` then.
This CSS property accepts up to 5 parameters

1. offset-x
2. offset-y
3. blur-radius
4. spread-radius
5. color

Two first specifies whether the shadow will be slightly moved to one direction.
Another one is how "blurry" will our blur be.
And the last but one is how far from element the blur will start.

The last one is the most important here – `color`.
According specification a `color` can be defined in any of the following ways:
> &bull; Using a keyword (such as blue or transparent)
> &bull; Using the RGB cubic-coordinate system (via the #-hexadecimal or the rgb() and rgba() functional notations)
> &bull; Using the HSL cylindrical-coordinate system (via the hsl() and hsla() functional notations)
> <cite>[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)</cite>

Unfortunately no gradient here :disappointed:

## Solution

So how to tackle this?
`filter` and pseudo-elements come to rescue!

### `filter`

This property allows to apply graphical filters on the element. We can change hue (with [hue-rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#hue-rotate%28%29_2)), or make the image black-and-white (with [grayscale](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#grayscale%28%29_2)) but the one we want is [blur](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#blur%28%29_2). As the name suggests it applies a Gaussian blur.

Thanks to that great feature we can achieve the shadow like this.

{% fiddle name=filter files=scss fiddle=bibixx/k8Lrxc2m resultsBg=#151515 %}

Firstly we create wrapper for a gradient. Then we create `::before` and `::after`. These two will be the core of whole effect.

### `::after`

This element is to display actual image. We have to create this one due to the [way `z-index` works](https://philipwalton.com/articles/what-no-one-told-you-about-z-index/) – we cannot create a descendant that will be underneath the parent that would normally display image.

### `::before`

This one will create the shadow. We give it a desired background and apply filter with value of `blur(50px)`. This will create some nice looking blurred image that imitates shadow.

{% fiddle name=before files=scss fiddle=bibixx/6b0mntyu resultsBg=#151515 %}

## But there is one more thing…

Obviously it works not only with gradients but also with any image supported by `background-image`.

{% fiddle name=one-more-thing files=scss fiddle=bibixx/vjpdwqcr resultsBg=#151515 %}

And it even works with gifs! So we can create something like those fancy tvs with leds behind that were quite popular some time ago. (NOTE: Chrome doesn't handle it very well, however on Firefox it works ok).

{% fiddle name=gif fiddle=bibixx/vr60cb2m resultsBg=#151515 iframeHeight=634 %}
