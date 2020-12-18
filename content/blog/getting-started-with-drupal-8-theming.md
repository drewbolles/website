---
title: 'Getting started with Drupal 8 Theming'
description: 'Learn how to set up custom Drupal 8 theme, and the new Twig system behind it.'
date: '2016-01-13T18:05:00Z'
comments: true
---

Now that we have a (relatively) stable version of Drupal 8 released, I want to post some of my adventures in the new theming system. In this post I'll cover what it looks like to create a custom theme from scratch and some Drupal 7 to 8 adjustments.

## Requirements

- Local Drupal 8 installation
- Custom theming knowledge
- That's it!

## Getting started

The first thing I always do when starting a theme from scratch is create a folder and an .info file. Different from Drupal 7, your themes live in `/themes` instead of `/sites/all/themes`. You can create a new theme folder like so:

```sh
$ cd /path/to/d8/site
$ mkdir [MY_THEME]
$ touch [MY_THEME]/[MY_THEME].theme
$ echo "name: My Theme" > [MY_THEME]/[MY_THEME].info.yml
```

Where [MY_THEME] is the name of your custom theme. This creates the folder and the first line of your info file. Notice your info files are now written in YAML, 'info.yml' instead of just '.info'.

Other than a name, you'll want a few other info variables set. These are 'type', 'base theme', 'description', 'version', and 'core'. An example of a complete info file is below.

```yaml
name: My Theme
type: theme
base theme: classy
description: 'A custom Drupal 8 Theme built by yours truly'
version: 8.0.0
core: 8.x
```

Now our theme can be found in the 'Appearance section'. Go ahead and 'enable and set to default'. Our site should look pretty blank, but success!

## Enabling local development services

Part of the strength of Drupal 8 is to provide configuration specific to your local environment. If you notice in your `/sites` folder there is an `example.settings.local.php`. You can duplicate this file to `/sites/default/settings.local.php`. Make sure to not commit it to your repo. This will allow you to set local database and site configuration that won't affect the server.

Part of this file also activates the development services found at `/sites/development.services.yml`. In this file, you can enable Twig debug among other things.

## Using Classy

One line you should notice in our theme yaml file is the 'base theme: classy'. Unlike in Drupal 7, core ships with a very well built base theme that should serve as a great foundation to a custom theme. You can also use 'base theme: stable' but I've not found that necessary. Do not set 'base theme: false'.

To override classy templates, simply copy and paste them into your custom theme. An example is the basic page template. You'll want to copy /core/themes/classy/templates/layout/page.html.twig to /themes/[MY_THEME]/templates/layout/page.html.twig. This will allow you to override the page template without adjust the core one.

## Creating and using Libraries

Another super powerful area of Drupal 8 is the new libraries abstractions. CSS and JS assets are now grouped as libraries and can be added / removed under any number of conditions. To create a base library for your theme, you'll first need another yaml file. You'll want to create [MY_THEME].libraries.yml and place it in your theme root. This file will house the collection of libraries used in your theme, you can add as many as you'd like. I always start with 'base'. My default libraries file looks like this:

```yaml
base
  version: VERSION
  css
    theme
      assets/css/styles.css: {}
  js
    assets/js/tappy.js: {}
    assets/js/scripts.js: {}
```

Once you've defined the library, you're able to add it in your info yaml file. Open up `[MY_THEME].info.yml` and add:

```yaml
libraries:
- [MY_THEME]/base
```

Make sure this [MY_THEME] is lowercase. Also, if you want to use the core jQuery or Drupal libraries you have to include these in your theme as well. Drupal no longer slaps these in by default. So your info yaml file becomes:

```yaml
libraries:
- core/jquery
- core/drupal
- [MY_THEME]/base
```

## Template suggestions and preprocess functions

Instead of a template.php file, themes now use [MY_THEME].theme files. Here you'll find the recognizable preprocess functions. Alongside of them is new theme suggestion functions. HOOK_theme_suggestions_HOOK_alter() where the first hook is your theme name, and the second is Drupal layer being targeted. Page, node, block, field, etc. By leveraging these new functions we can add to the template suggestions of our entities and data.

```php
function MY_THEME_theme_suggestions_node_alter($&suggestions, &$vars) {
  // custom logic
  $suggestions[] = 'node\_\_custom-template';
}
```

## More to come soon!

This was a simple and straight forward post to help you get started on a custom theme. More posts with examples coming soon!
