---
title: 'A no-javascript toggle content feature'
description: 'A way to show and hide content without using javascript.'
date: '2013-12-28T12:00:00Z'
comments: true
redirect_from:
  - /tutorials/2013/12/28/no-javascript-toggle-content-feature/
---

I wanted to post a quick tutorial about a method I use to create quick toggle links to areas of content without using javascript. It's pretty neat, what we do is, we use a 'checkbox' form element, its label, and a piece of content, and we stack them all on top of each other.

Your html will look like this

```markup
<input type="checkbox" value="selected" id="toggle-input" class="toggle-input">
<label for="toggle-input">toggle</label>

<div class="toggle-content">
  the content you want to show / hide
</div>
```

Once you have this structure, you'll be able to use this CSS to create the toggle effect.

```css
.toggle-input {
  display: none;
}
.toggle-content {
  max-height: 0;
  overflow: hidden;
  transition: 0.3s ease max-height;
}
.toggle-input:checked ~ .toggle-content {
  max-height: 1000px; // this number needs to be bigger than its content
}
```

What this CSS does is hide the actual checkbox element, leaving just the label. Clicking the label checks the box, and our sibling selector of '~' tells our .toggle-content div that when the input is checked, expand it's max height.

**note** -- the max height css is a trick. You can't animate the 'height' attribute from 0 to auto, so to get around this, we set the max-height to 0, and the overflow to hidden. Then, we can animate the max-height attribute, giving us the desired 'slide' effect.

You can also style the label specifically if the input is checked like so:

```css
.toggle-input:checked + label {
  // checked label styles
}
```

I still need to do some cross browser testing, but sibling CSS selectors work in IE8 and above. I created an object from this solution and use it quite often as I develop user interfaces. You can see a working example from my [codepen](http://codepen.io/bollskis "Drew Bolles' codepen") below.

<p data-height="400" data-theme-id="0" data-slug-hash="aqykc" data-user="bollskis" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/bollskis/pen/aqykc'>No Javascript Toggle</a> by Drew Bolles (<a href='http://codepen.io/bollskis'>@bollskis</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
