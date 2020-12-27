---
title: The easy way to add syntax highlighting to your NextJS blog using
  markdown-it and PrismJS
description: I show you the easiest way to add syntax
  highlighting to your NextJS blog using the `markdown-it` plugin and `PrismJS`.
image: /uploads/joshua-aragon-eab4ml7c7fe-unsplash.jpg
date: 2020-12-24T17:59:01.708Z
comments: true
---

Yet another feature that is standard in technical blogs is nicely styled code snippets. Being able to cleanly read code can go along way in illustrating a technical point to your audience. It is also another one of the things that NextJS does not handle out of the box for you (not that it should). I also was not happy with the present examples and solutions, which all ran `PrismJS` in the client. What I wanted was to parse my markdown on the server, and then send the Prism-ready markup to the client. This not only would play nicer with React, because we're not doing manual DOM replacing outside of the framework, but it would remove the need for us to load PrismJS in the client.

So I set out, as we all do, to see if someone else had solved the problem. Alas, none to my liking within the first page of results. I wanted server rendered Prism-ready markup. I then went down a rabbit hole of trying to pass the html string returned from `frontmatter-markdown-loader` to the PrismJS internal methods. I also tried `highlight.js`. Frustratingly, I almost stumbled upon the right answer when I attempting to manually use `markdown-it` to parse the already parsed markdown from my loader. Finally, embarrassingly, I realized that `frontmatter-markdown-loader` is built _on top of_ `markdown-it`. After that my dream was in reach.

**Note:** This technique assumes you are reading from local markdown files to create your NextJS pages.

The [NextJS example NetlifyCMS](https://github.com/vercel/next.js/blob/canary/examples/with-netlify-cms/next.config.js) starter uses the `frontmatter-markdown-loader` webpack loader to parse markdown files. This loader uses `markdown-it` under the hood. `markdown-it` has a prism plugin!

Ta-da, and like magic

```shell
npm i -D markdown-it markdown-it-prism
```

And in your `next.config.js` Webpack configuration

```javascript
// edit your webpack configuration in next.config.js
const markdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');

module.exports = {
  webpack: configuration => {
    configuration.module.rules.push({
    test: /\.md$/,
    loader: 'frontmatter-markdown-loader',
    options: {
      markdownIt: markdownIt({ html: true }).use(markdownItPrism),
    });
    return configuration;
  },
});
```

My HTML string from my loader has my code snippets parsed and ready to be styled. No need for PrismJS, no manual parsing, happy Drew.

The last step is to add a theme or create a custom one. I decided to go with Okaidia theme for simplicity.

```javascript
// [slug].js that generates my blog post pages
import 'prismjs/themes/prism-okaidia.css';
```

Mission accomplished. My client is nice and light, my DOM is completely maintained by React and not mutated by another library, and my code is prepared for PrismJS on the server for me with minimal effort.

This page was rendered using this technique! Check out the source code on [GitHub](https://www.github.com/drewbolles/website).
