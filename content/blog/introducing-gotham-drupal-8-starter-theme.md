---
title: Introducing Gotham, a Drupal 8 starter theme
description: Gotham is a Drupal 8 starter theme aimed at giving developers a clean slate
image: /uploads/andre-benz-jbkwaymuhdc-unsplash.jpg
date: 2016-01-14T12:58:00.000Z
comments: true
---

I've packaged up my personal custom Drupal theme, **Gotham**, the same one I use on all my projects! **Gotham** is a theme that provides very little, it's a modern shell built on top of the Classy theme in core. If your front-end stack includes [Sass](http://sass-lang.com/), [Susy](http://susy.oddbird.net/), and [Gulp](http://gulpjs.com/) Gotham is for you! It does very little out of the box but provide the foundation to build a modern theme.

You can download the theme from [drupal.org](https://www.drupal.org/sandbox/drewbolles/2645524) or [GitHub](https://github.com/drewbolles/gotham/tree/8.x-1.x). Install as normal, inside the `/themes` folder. The README will provide instructions on getting up and running, it should be rather straight forward. Running the Gulp build process will watch your Sass files. If you'd like to add anything to the gulpfile, feel empowered! This is simply a starting point, meant to be heavily customized.

It leverages the [SMACSS](https://smacss.com/) folder architecture, and tries to keep the dependencies to a minimum. I often add image minifying, an SVG icon system, and a JS linter to my build process, but I didn't want to add these by default. I'm very against over-opinionated foundations, and wanted to keep Gotham as nimble as possible.

Pull requests welcome!
