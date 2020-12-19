---
title: 'How to structure your next Sass project'
description: "I wanted to write a quick post about how I'm structuring my projects recently. I develop in Sass, so this is what this article will focus on, but the core can be applied to any preprocessor or even sites using basic CSS. (gasp!)"
date: '2013-12-22T12:00:00Z'
comments: true
---

I wanted to write a quick post about how I'm structuring my projects recently. I develop in [Sass](http://Sass-lang.com 'Sass, CSS preprocessor'), so this is what this article will focus on, but the core can be applied to any preprocessor or even sites using basic CSS. (gasp!)

### Folder Structure

The first thing I set up for each project is obviously the folder structure. Lately I've been developing in [Laravel](http://laravel.com 'Laravel, PHP framework'), [Jekyll](http://jekyllrb.com 'Jekyll'), and [Drupal](http://drupal.org 'Drupal CMS'), and they each have unique theming requirements, but it basically boils down to creating a theme 'assets' folder. This assets folder will hold all theme based assets - Sass, CSS, images, fonts, javascripts, etc - and will contain your frameworks and js libraries, etc. You can place this folder inside a Drupal theme, the Laravel public folder, or the Jekyll root folder. Placing the 'asset' folder in the root is also how you would approach a normal .html site as well.

```
...
/assets
  /sass
    /cavern
    /ui
    _vars.sass
    screen.sass
  /css
    screen.css
  /images
    logo.png
  /js
    scripts.js
  /fonts
    Local_Font.tiff
index.html (php/etc..)
```

If you're using compass, you'll want to track this 'assets' folder. The config.rb file will get installed inside of it as well. What this allows you to do is also create a repo just for your sites theme assets. I often create them as submodules of my framework repo (Drupal, Larvel etc). I find this allows me to easily update my themes submodules as well as segment my front-end assets from my back-end ones.

I'll have more Sass, compass, and front-end architecture posts coming soon.

Stay tuned!
