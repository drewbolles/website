---
title: Inline your critical CSS using Jekyll and Gulp
description: Learn how to set up a Jekyll installation so that it inlines
  critical CSS in the head of the document while asynchronously loading the
  rest.
date: 2015-04-23T16:43:00.000Z
comments: true
image: /uploads/c-dustin-91aqt9p4mo8-unsplash.jpg
---

If you're familiar with critical CSS and its impact on web performance, you also know it's not the simpliest thing to work with. [Google's pagespeed insights](https://developers.google.com/speed/pagespeed/insights/) recommends that you inline any critical, render blocking content to increase performance, which can be tricky. I've managed to set up this up using Jekyll and Gulp to generate and include my critical CSS, and in this post I'll walk you through how I did that.

## Requirements

For this you'll need a few things.

- A [Jekyll](http://jekyllrb.com) site
- [Node.js](http://nodejs.org) and npm
- [Sass](http://sass-lang.com)
- [Gulp](http://gulpjs.com)
- [loadCSS](https://github.com/filamentgroup/loadCSS)
- Command line familiarity

## The set up

The process for inlining your critical CSS isn't complicated, it's just specific. There are two parts **1)** include the critical CSS at the top of your document head in `<style>` tags **2)** asychronously load the full CSS file in the footer. Using Gulp and Jekyll together makes this suprisingly simple.

### Gulp

Once you have node installed on your machine, you can install Gulp locally to manage the build. Make sure you are in your site root `$ cd /path/to/site` then run `$ npm init`. Fill out the fields as they make sense, you can mostly hit enter. Next we need a few node modules to get things cooking. Namely, gulp, gulp-sass, critical, gulp-watch. Non-essential, but nice-to-haves are gulp-autoprefixer, and gulp-sourcemaps.

You can install all of them by running `$ npm i --save-dev gulp gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-watch critical`.

Once the packages are done downloading, we need to set up our Gulpfile. Create a file in the root of your project named Gulpfile.js. Mine looks like this:

```javascript
// Require Gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var critical = require('critical');

// Gulp Sass Task
gulp.task('sass', function () {
  gulp
    .src('_sass/*_/_.scss')
    .pipe(sourcemaps.init()) // Initializes sourcemaps
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: 'compressed',
      }),
    )
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe(sourcemaps.write('./')) // Writes sourcemaps into the CSS file
    .pipe(gulp.dest('css'));
});

gulp.task('critical', function () {
  critical.generate({
    base: './',
    src: '_site/index.html',
    css: '_site/css/screen.css',
    dest: '_includes/critical.css',
    width: 320,
    height: 480,
    minify: true,
  });
});

gulp.task('watch', function () {
  gulp.watch('_sass/*_/_.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
```

So what we have here, is two tasks, one to compile our Sass, the other to build our critical styles. The Gulp task for our Sass will watch any files in the `_sass` directory, and write them to the `css` folder. This means that we&apos;re not using Jekyll&apos;s ability to process Sass as part of the build. We&apos;re going to be watching and compiling our Sass outside of Jekyll.

### Jekyll files

With our Gulp set up to compile our Sass into CSS and generate our critical CSS, we need to adjust our Jekyll templates. What we want to do is line both the critical CSS as well as the loadCSS javascript function. LoadCSS.js is so small that it makes sense to inline it rather than create another http request. In order to do this, we need to place loadCSS.js into the `_includes` folder of our Jekyll site. Since our Gulp task is creating our critical styles for us, we just need to include the file in our templates. We then need to load our CSS in the footer of our site. It looks something like this (notice the &#123;% include critical.css %&#125;).

head.html

```markup
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
  <meta name="description" content="{% if page.excerpt %}{{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}{% else %}{{ site.description }}{% endif %}">

  <!-- Inline critical css -->
  <style type="text/css">{{ "{% include critical.css "}}%}</style>

  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title }}" href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <!--[if lt IE 9]>
    <script src="{{ "js/html5shiv.js" | prepend: site.baseurl }}"></script>
  <![endif]-->

  <!-- Load CSS -->
  <script type="text/javascript">{{ "{% include loadCSS.js "}}%}</script>
</head>
```

footer.html

```markup
<footer class="site-footer">

  <div class="container">

    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-1">
        <ul class="contact-list">
          <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
          <li>{{ site.description }}</li>
        </ul>
      </div>

      <div class="footer-col footer-col-2">
        <p class="copyright">Built with <a href="http://jekyllrb.com">Jeykll</a>. Hosted on <a href="http://github.com/drewbolles/drewbolles-jekyll">GitHub Pages</a>.<br>&copy; Copyright 2015 All Rights Reserved</p>
      </div>
    </div>

  </div>

</footer>

<!-- Loadd css -->
<script>
  loadCSS('/css/screen.css', false, 'screen');
</script>

<noscript>
  <link rel="stylesheet" href="/css/screen.css">
</noscript>
```

### Workflow

Once our Gulpfile.js is set up, we basically have everything we need. The workflow becomes a bit more complicated, though, since we have to watch for both Sass AND Jekyll changes, and I've not set up the Gulp file to do both.

For simplicity sake, what I do is have multiple terminal windows running, three to be exact. I use iTerm2 and it's split-pane feature. My top pane is for my git / bower / vim commands. I then have a pane below running `$ gulp` and another pane below that running `$ jekyll serve`. Any time I make a change to my Sass, Gulp outputs a new CSS file, which Jekyll picks up and rebuilds its static content from. It's one more watch step, but it's fast and simple.

Once I'm ready to push my changes to the repo, I generate my critical CSS. I do this by running `$ gulp critical`. Once the task is done a file is created at `_includes/critical.css`. We include this in a commit, and push it to the repo (on the gh-pages branch or master for orgs, etc). GitHub pages works its magic and builds our site out with our crictcal CSS inline!

## Results

Once we have our Gulp file set up to build our Sass and critical CSS, and our Jekyll files are using our new assets, we can sit back and enjoy good performance results. Head on over to [Google's pagespeed insights](https://developers.google.com/speed/pagespeed/insights/) and run your site through it's test. It should report back that you've done everything correctly!
