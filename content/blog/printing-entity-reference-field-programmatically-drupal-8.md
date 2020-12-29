---
title: Printing an Entity Reference field programmatically in Drupal 8
description: Learn how to output the entity view of an Entity Reference field in Drupal 8.
date: 2016-01-14T11:33:00.000Z
comments: true
canonical_url: https://www.chapterthree.com/blog/printing-entity-reference-field-programmatically-drupal-8
image: /uploads/amador-loureiro-bvynlchwqzs-unsplash.jpg
---

**This post is outdated. Please see the Drupal documentation for updated reference.**

\---

I often want to print the output of an Entity Reference field somewhere - a page template, a complicated node template, or in a custom module that is organizing data. In Drupal 7, you could do this a few ways and I usually used `field_get_items` and `field_view_field`. With Drupal 8 it's a bit different, there's now a view method that accepts view mode arguments. Let's dive into some code

### Printing the value of a field

Drupal 7:

```php
$node = node_load(12); // random NID
$field_items = field_get_items('node', $node, 'field_entity_reference');
$field_output = field_view_value('node', $node, 'field_entity_reference', $field_items[0], array('type' => 'default'));
```

or

```php
$node = node_load(12); // random NID
$field_output = field_view_field('node', $node, 'field_entity_reference', array('type' => 'default'));
```

Drupal 8:

```php
$node = \Drupal::entityManager()->getStorage('node')->load(12); // random NID
$field_output = entity_view($node->get('field_entity_reference')->entity, 'default');
```

As you can see, it's similar. Grabbing the node is much more concise in Drupal 7, but constructing the field output is much more straight forward in Drupal 8. We're taking advantage of the entity_view function which wraps the view() method that is part of entities and fields. Granted, we're not testing for the existence of the field, or the data. A more complete example would be:

Drupal 8:

```php
$node = \Drupal::entityManager()->getStorage('node')->load(12); // random NID
// Test if this node has our field
if ($node->hasField('field_entity_reference')) {
  $entity_ref = $node->get('field_entity_reference');
  // if our field has data
  if ($entity_ref->count() > 0) {
    $output = entity_view($entity_ref->entity, 'default');
  }
}
```

Now we're able to output our referenced entities wherever they need to be output!
