---
title: Decoupled Drupal 8 Tips
description: Tips for developing a decoupled application with Drupal 8 as your backend
image: /uploads/sam-dan-truong-rf4kuvghhu-unsplash.jpg
date: 2020-01-11T11:47:26.00Z
date: 2020-12-28T17:12:57.537Z
---

I've been developing a decoupled Drupal 8 site for a while now, and I've gone through my shares of trials and tribulations. I've learned a few tips and tricks throughout the process that I'd like to share.

## Use Composer

I'm sure this is rather common advice, but you should be using composer to manage your Drupal backend and Drupal dependencies. This makes it incredibly easier to control through git, update (and rollback updates), patch things, and keep up to date. If you're unsure how to go about managing your site via Composer check out [this page](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies).

## Stick to nodes

In traditional Drupal site development, it's best practice to utilize the different entities to accomplish proper content relationships. For instance, blog tags should be taxonomy terms - in fact, anything whose job it is to categorize should be a taxonomy term. There's a whole slew of benefits for this in a tradional Drupal site build, however when decoupling your front end from your Drupal backend, I've found keeping this entity separation introduces unneccessary complexities and challenges.

Nodes are and always have been a "first class entity" within Drupal, and though steps have been taked to even the entity playing field, this is still the case. For instance, taxonomy terms have no ability to be "published" nor moderated (without patches). Meaning you can't simply turn on / off taxonomy terms from being displayed or accessed via your API, nor can you stage and approve terms like you can with nodes.

Also, Drupal sites come stock with default term pages that display the term along with all the nodes tagged with said term. In a decoupled site, you do not use this built in page (it's a view), and pulling nodes tagged with a term is accomplished through your API, and is not returned if you fetch a term's data.

Also, separate entity types are not abled to share things like fields, or common configurations, which can make fetching related data more complicated from your API. Yes, having all of your content entities be nodes can be visually unappealing in your Drupal backend, but the benefits of keeping all your content in nodes far outweighs this. This includes "sub entities" such as Paragraphs. Stick to nodes, trust me.

## Re-use fields wherever possible

There's been some debate (at least within the front-end community) whether fields should be ubiquitously named, or prefixed by the entity. For example `field_iamge` vs `field_blog_image` / `field_project_image`, etc. Unless the field serves a very specific responsibility, you should try to re-use fields as much as possible. This will reduce cognitive overhead when you access data through your API, making data easier to fetch and create relationships to other nodes.

## Don't be afraid of patches

Before the rollout of Drupal 8.8.x, core needed a handful of patches to operate in an optimal manner for a decoupled instance. From caching, to moderation, to everything inbetween, decoupled sites have unique demands that are often slow to roll into an official release. This applies to contributed modules, as well. If you're following my first piece of advice, patching core or a module is as easy as adding to to the `extra/patches` property in your `composer.json` file.

## When in doubt, KISS - Keep it simple, stupid!

Don't try to get fancy - many contributed modules are designed to make a site builder's life easier. However, all of your site building is now done in a separate system. You don't need Design Suite, or Pages, or Panels, or Fences, or any of the fancy UI tools that are very common. In fact, you really don't need much more than what core already offers you - nodes and JSON API. When you run into an issue or a unique use case for your API there are a good amount of available resources that can help guide you in the right direction. While not perfect, I've found Drupal 8 a very robust and powerful system to build a backend for my applications.
