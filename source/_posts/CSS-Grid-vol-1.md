---
title: CSS Grid vol. 1
date: 2018-06-10 13:13:11
image: /static/2018/06/10-css-grid.png
fill_color: "#A1C6E7"
image_source:
category:
snippets: 'CSS-Grid-vol-1'
---

While I was creating theme for this blog I thought that I'd use CSS Grid Layout. Maybe not for the first time but certainly for the first time in a bigger project. Previously when I was supposed to create a website I wouldn't use it since I knew had to care about supporting something more than just newest browsers so grid would automatically be out of reach.

<!-- more -->

## Compatibility

And here is where I was wrong.

<figure class="full">
  ![Compatibility table of CSS Grid Layout. All major browsers support it. Except IE 11 has limited support](/static/2018/06/10-caniuse-grid.png)
  />
  <figcaption>Source: [https://caniuse.com/](https://caniuse.com/#feat=css-grid)</figcaption>
</figure>

I was quite surprised that even IE 10 "supports" it. Of course with some caveats but I'll talk about this later.

## But, for real. What is this Grid layout?

> "A grid is an intersecting set of horizontal and vertical lines – one set defining columns and the other rows. Elements can be placed onto the grid, respecting these column and row lines."
> <cite>[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)</cite>

So this is what docs say about it. But how do we use it in CSS? Firstly you create a wrapper and give it `display: grid`. Automatically all of its children will become grid items.

{% fiddle name=intro files=css fiddle=bibixx/n70ogdeq %}

You might think that we have been creating grid layouts like this forever. And you would be right. However aside from ease of declaring layout CSS Grid it gives us some features that weren't possible earlier.

## `grid-template-columns` and `grid-template-rows`

As I mentioned earlier CSS Grid makes it much easier to define layouts.

Say we'd like to create 3 columns: First with width of 300px, and next 2 to have equal widths. With flexbox we'd do it something like this.

{% fiddle name=3-columns-flex files=css,html fiddle=bibixx/jys3qb96 %}

And with grid we can simply do it like this.

{% fiddle name=3-columns-grid files=css,html fiddle=bibixx/jys3qb96 %}

Notice that we don't have to use 2 wrappers now. Similar thing can be done with rows.

{% fiddle name=rows-grid files=css fiddle=bibixx/heu42v9w %}

Using `grid-template-*` gives us a way to declare all of column sizes in one place – in a parent element. `grid-template-*` accepts as many arguments as you wish and each argument specifies width of each column/row.

## fr

You may have noticed the new unit – `fr`. As you may have also concluded from examples it works kind like `flex: n`. It represents a fraction of the leftover space in the grid container. So if you'd like to to make columns of 1, 2, 3 units of width than you'd do `grid-template-columns: 1fr 2fr 3fr`.

## Positioning elements in grid

So next thing that different in grid opposed to flexbox is the fact that you can basically place elements inside the grid however you want. Here is an example of simple blog layout.

{% fiddle name=example-layout files=css,html fiddle=bibixx/y6qosndx %}

Using grid we can tell every element to be placed at specific positions. Here we make element start at grid one and end at 4.

```css
#element {
  grid-column-start: 1;
  grid-column-end: 4;
}
```

You can even use this shorthand.

```css
#element {
  grid-column: 1 / 4;
}
```

Or even

```css
#element {
  grid-column: 1 / -1;
}
```

Negative numbers as `grid-column-*` counts from end. So `-1` is last, `-2` last but one.

As you may again have deduced we can do it also with rows using `grid-row-*`.

## `grid-template-area`

But who wants to deal with column numbers? We can add names to areas with `grid-template-area`!

{% fiddle name=named-columns files=css fiddle=bibixx/qr0tde64 %}

You can see I have declared another property `grid-template-areas` on wrapper. So if we take `grid-template-columns: 1fr 70vw 1fr` we will have following areas: "start" with width of 1fr, "main" with width of 70vw and finally "end" with width of 1fr. It also applies to rows. To create named rows we can do it like this

{% fiddle name=named-rows files=css,html fiddle=bibixx/6Lqxrp02 %}

Also here I had to use `grid-area` which is next shorthand. This time for

```css
#element {
  grid-area: main;
  grid-row-start: main;
  grid-column-start: main;
  grid-row-end: main;
  grid-column-end: main;
}
```

Property `grid-template-areas` can be given more than one value. Each value surrounded by `"` and spaced with space is responsible for each row. So `grid-template-areas: "header header header header" "start main nav end" "footer footer footer footer"` would give us something like this

<figure class="medium">
  ![Page layout specified in code snippet](/static/2018/06/10-layout.png)
</figure>

## Thank you... For now

I think that it is enough for the first encounter to CSS Grid. Actually it is most of properties that are currently available in browsers. The second part will probably be released in a few days and I will write there about some few neat things that CSS gives us to even more improve creating layouts.
