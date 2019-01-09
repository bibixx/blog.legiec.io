---
title: Hexo – is it any good?
date: 2018-06-06 20:00:00
image: /static/2018/06/06-hexo.png
fill_color: "#172027"
image_source: 
category:
---
I have previously created a blog but not for myself and it was running on [Jekyll](https://jekyllrb.com/). To be honest I enjoyed it. I was thinking about a blog for some time now and when I have read about on [piecioshka.pl](https://piecioshka.pl/blog/2018/05/28/jak-zalozyc-bloga-korzystajac-z-hexo.html) I have decided that it is the time. I was hesitant to start blog since I knew I would spend definitely too much time on writing css for my custom theme. And as I predicted I have spent last two days doing so :smile: but it was worth it. However time required to set up [Hexo](https://hexo.io) was much quicker than that.

<!-- more -->

## Setup

Initially all I wanted to do when I installed Hexo was to check it out. But then I thought "I have a blog already running on my computer. I should finally do it."

Setting up Hexo is definitely an important point why I started. Getting it all up and running was to simply run 3 (actually 4 but let's not count `cd`) commands.

```bash
npm install hexo-cli -g
hexo init blog
cd blog && hexo server
```

Personally I don't like installing packages globally, so in fact I used [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b), simply added npm script to `package.json` and then run this.

```bash
npx hexo-cli init blog
cd blog && yarn hexo server.
```

## Language independency

Nice thing about Hexo is that it automatically compiles your theme. And even nicer thing is that it is not dependent on any particular language. Default theme was created with [EJS](http://www.embeddedjs.com/) and [stylus](http://stylus-lang.com/). However with just one package you can add your own compiler. I have stayed with EJS because I wanted to reuse the mainframe of default theme, however I added my favourite CSS preprocessor – [SASS](https://sass-lang.com/) and all I had to do was simply:

```bash
yarn add hexo-renderer-sass
```

The same could be done for EJS. You can easily change it to eg. [pug](https://pugjs.org) using a plugin from https://hexo.io/plugins/ 

## Plugins

As I am writing this post there are 260 of them currently listed on Hexo's page. Apart from using the one mentioned in previous section I am using three more.

### hexo-symbols-count-time

First one adds this nice feature that you can see just under the title – time that it would take to read a post. And as always there had to be a problem when making a project – it had a small bug where it would fail to pad minutes with a 0 (make "01" from a "1") but I dug into a code of this plugin, found a problem and fixed it topping it all with a nice PR :wink:

### hexo-filter-github-emojis

Did you see that in the end of previous paragraph? Yes it is emoji and it is all (oh, maybe not but it helps) thanks to the second plugin. It allows to insert emojis in a Github or Slack style by writing emoji name wrapped in semicolons. It looks something like this: `:​wink​:`. Neat!

### hexo-prism-plugin

Last one is plugin that enables syntax highlighting with backticks in markdown using [prism.js](https://prismjs.com/). Despite me using a custom theme for prism this plugin has few themes built in out of the box. You can choose one in `_config.yml` file.

## Final configuration

Configuration of Hexo is really simple – all of it sits inside of `_config.yml`. You can set there your name, output path for generated files etc. Nice thing is that all of it is available then for a theme so you don't have to hardcode your details and can make your theme universal.

## Writing posts

Ok so we have set up our blog. Now let's write something. And to do so you use good old markdown — precisely [marked](https://github.com/markedjs/marked) compiler. However if somehow you have hatred of it, you can easily change it with... you guessed it – plugin.

Also when you create a post there is also this header part at the begging of `.md` file surrounded by dashes. Inside of it you specify all metadata that will be also passed into the theme. Default once are date, title and tags. However if you feel that you need something else you can simply add it and it will be passed to theme. This is how I have created the image banner at the top.

## Fin

Personally I am very happy with using it for now. I hope that it won't change after time.

GitHub repository for this project: https://github.com/bibixx/blog.legiec.io
